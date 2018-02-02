module.exports = class BaseComponent {
	constructor(){
        this.errorMap = {
            200: '正确执行',
            401: '{name}已存在'
        }
        this.getErrorResult = this.getErrorResult.bind(this);
    }
    
    
    getErrorResult(code, params = {name: this.classText}) {
        let msg = this.errorMap[code];
        for(let i in params) {
            let keyRep = '{' + i + '}';
            msg = msg.replace(keyRep, params[i]);
        }
        return {
            code: code,
            message: msg
        };
    }

    getCodeResult(code, data, params = {}) {
        let msg = this.errorMap[code];
        for(let i in params) {
            let keyRep = '{' + i + '}';
            msg = msg.replace(keyRep, params[i]);
        }
        return {
            code: code,
            data: data,
            message: msg
        };
    }
}