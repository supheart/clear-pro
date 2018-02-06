const mongoose = require('mongoose');
const moment = require('moment');

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
    return moment(v).format('YYYY-MM-DD HH:mm:ss');
});
menuSchema.path('updateTime').get(function (v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss');
});
menuSchema.set('toJSON', { getters: true, virtuals: false });
menuSchema.set('toObject', { getters: true });

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
