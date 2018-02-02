const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const config = require('../../configs');

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
    role: {
        type: String,
        default: 'custom'
    },
    avatar: {
        type: String,
        default: 'avatar.jpg',
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
        if(!user.isModified('password')) return next();
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(this.password, salt);
        user.password = hash;
        return next();
    }catch(e){
        return next(e);
    }
});

UserSchema.methods.comparePassword = function(password){
    const isMatch = bcrypt.compareSync(password, this.password);
    return isMatch;
}

UserSchema.statics.checkToken = async function(token){
    console.log(token);
    const secret = GetHmac();
    const user = await this.findOneAndUpdate({ _id: token.id }, { appSecret: secret });
    if(token.secret == user.appSecret) {
        user.appSecret = secret;
        return user;
    }else{
        return null;
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