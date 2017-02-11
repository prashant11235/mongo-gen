export default function hasUnicode(str) {

  let returnValue = false;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127) {
      returnValue = true;
    }
  }
  return returnValue;
}
