/**
 * Created by jiachenpan on 16/11/18.
 */

/* 手机号*/
export function validatPhone(str) {
  const reg = /^1[345678]\d{9}$/
  return reg.test(str)
}

/* 将/n切换为换行*/
export function replaceSeperator(a) {
  var i;
  var result = "";
  var c;
  for (i = 0; i < a.length; i++) {
    c = a.substr(i, 1);
    if (c == "\n")
      result = result + "<br/>";
    else if (c != "\r")
      result = result + c;
  }
  return result;
}

/* 验证是否在今天之后*/
export function validatAfterToday(time) {
  const a = (new Date(time)).getTime()
  const today = (new Date()).getTime();
  return a > today
}
