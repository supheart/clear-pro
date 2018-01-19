/**
 * 是否是数字
 */
function isNumber(str) {
	var reg = /^\d+$/;
	return reg.test(str);
}

/**
 * 判断是否是汉字、字母、数字组成
 * 
 * @param str
 * @returns {Boolean}
 */
function isChinaOrNumbOrLett(str) {
	var regu = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/;
	return regu.test(str);
}

/**
 * 判断是否是数字或字母 (6-14位)
 * 
 * @param str
 * @returns {Boolean}
 */
function isNumberOrLetter(str) {
	var regu = /^[0-9a-zA-Z]$/;
	return regu.test(str);
}

/**
 * 验证手机号
 * 
 * @param str
 * @returns {Boolean}
 */
function isMobileNum(str) {
	var regu = /^0?[1][0-9][0-9]{9}$/;
	return regu.test(str);
}

/**
 * email格式验证
 * 
 * @param str
 * @returns {Boolean}
 */
function isEmail(str) {
	var regu = /^([a-zA-Z0-9_\.\-])+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
	return regu.test(str);
	return true;
}

/**
 * 汉字验证2到30位
 * 
 * @param str
 * @returns {Boolean}
 */
function isChinese(str){
	var regu=/^[\u2E80-\u9FFF]{2,30}$/;
	return regu.test(str);
}
/**
 * 日期验证
 * 
 * @param str
 * @returns {Boolean}
 */
function isDate(str){
if (str=="") return true; 
	return /^(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/.test(str);
}
 
/**
 * 验证是否为空
 * 
 * @param id
 */
function isNull(id) {
	var value = $("#" + id).val();
	value = $.trim(value);
	if (value == "") {
		return true;
	} else {
		return false;
	}
}
/**
 * 验证是否为金额
 * 
 * @param id
 */
function isMoney(str) {
	var regu = /^[0-9]*(\.[0-9]+)?$/;
	return regu.test(str);
}

/**
 * 匹配时间，正确格式：hh:mm
 * @param str
 * @returns
 */
function isTime(str){
    var regu = /^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$/;
    return regu.test(str);
}

/**
 * 匹配日期时间，正确格式：yyyy-MM-dd hh:mm
 * PS:日期的连接符号可以是“-”或者“/”
 * @param str
 * @returns
 */
function isDateTime(str){
    if(str == null || str == ""){
        return false;
    }
    var dateTimeArr = str.split(" ");
    if(dateTimeArr.length < 2){
        return false;
    }
    var dateReg = /^\d{4}(-|\/)((1[0-2])|(0[1-9]))(-|\/)((0[1-9])|([1-2][0-9])|(3[0-1]))$/;
    if(!dateReg.test(dateTimeArr[0])){
        return false;
    }
    return isTime(dateTimeArr[1]);
}
