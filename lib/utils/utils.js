export function hasUnicode(str) {

  let returnValue = false;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127) {
      returnValue = true;
    }
  }
  return returnValue;
}

export function getAlphaNumericArray() {
  const alphaNumericArray = [];

  for (let index = 65; index <= 90; index++) {
    alphaNumericArray[alphaNumericArray.length] = String.fromCharCode(index);
  }

  for (let index = 97; index <= 122; index++) {
    alphaNumericArray[alphaNumericArray.length] = String.fromCharCode(index);
  }

  for (let index = 48; index <= 57; index++) {
    alphaNumericArray[alphaNumericArray.length] = String.fromCharCode(index);
  }

  return alphaNumericArray;
}

export function arrayBufferToString(buf) {
  return Reflect.apply(String.fromCharCode, null, new Uint16Array(buf));
}

export function stringToArrayBuffer(str) {

  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);

  for (let index = 0, strLen = str.length; index < strLen; index++) {
    bufView[index] = str.charCodeAt(index);
  }

  return buf;
}

export function isInteger(value) {
  return !isNaN(value) && !isNaN(parseInt(value, 10));
}
