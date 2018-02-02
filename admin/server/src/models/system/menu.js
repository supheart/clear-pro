const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    link: {
        type: String,
        default: '#'
    },
    type: {
        type: Number,
        default: 0
    },
    style: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 1
    },
    createTime: {
        type: Date,
        default: Date.now()
    },
    updateTime: {
        type: Date,
        default: Date.now()
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

menuSchema.pre('save', async function(next) {
    try{
        return next();
    }catch(e) {
        return next(e);
    }
});

menuSchema.path('createTime').get(function (v) {
    return v + ' is my name';
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
