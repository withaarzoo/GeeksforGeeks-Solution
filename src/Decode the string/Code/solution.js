/**
 * @param {string} s
 * @return {string}
 */
class Solution {
  decodedString(s) {
    let countStack = [];
    let stringStack = [];
    let currStr = "";
    let currNum = 0;

    for (let char of s) {
      if (!isNaN(char)) {
        currNum = currNum * 10 + parseInt(char);
      } else if (char === "[") {
        countStack.push(currNum);
        stringStack.push(currStr);
        currNum = 0;
        currStr = "";
      } else if (char === "]") {
        let repeatTimes = countStack.pop();
        let prevStr = stringStack.pop();
        currStr = prevStr + currStr.repeat(repeatTimes);
      } else {
        currStr += char;
      }
    }

    return currStr;
  }
}
