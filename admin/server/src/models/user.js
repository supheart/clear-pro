const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const config = require('../../configs');
const saltRounds = 10

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    appSecret: {
        type: String,
        default: GetHmac()
    },
    createTime: {
        type: Date,
        default: Date.now()
    },
    updateTime: {
        type: Date,
        default: Date.now()
    }
});

function GetHmac(){
    const hmac = crypto.createHmac('sha256', config.hmacSecretKey);
    hmac.update(Date.now().toString());
    return hmac.digest('hex');
}

UserSchema.pre('save', async function(next){
    try{
        const user = this;
        console.log(222, user);
        if(!user.isModified('password')) return next();
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        user.password = hash;
        return next();
    }catch(e){
        return next(e);
    }
})

UserSchema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

UserSchema.statics.checkToken = async function(token){
    console.log(token);
    const secret = GetHmac();
    //console.log('secret', secret)
    const user = await this.findOneAndUpdate({ _id: token.id }, { appSecret: secret });
    if(token.secret == user.appSecret) {
        user.appSecret = secret;
        //console.log('user user: ', user)
        return user;
    }else{
        throw new Error('token验证未通过！');
    }
}

UserSchema.statics.findByName = async function(username){
    const user = await this.findOne({
        username: username
    });
    return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;