class Solution {
  myAtoi(s) {
    let n = s.length;
    let i = 0;

    // Skip leading spaces
    while (i < n && s[i] === " ") {
      i++;
    }

    // Check sign
    let sign = 1;
    if (i < n && (s[i] === "+" || s[i] === "-")) {
      if (s[i] === "-") {
        sign = -1;
      }
      i++;
    }

    let num = 0;
    const INT_MAX_VAL = 2147483647;
    const INT_MIN_VAL = -2147483648;

    // Read digits
    while (i < n && s[i] >= "0" && s[i] <= "9") {
      let digit = s.charCodeAt(i) - "0".charCodeAt(0);

      // Check overflow before adding digit
      if (num > Math.floor((INT_MAX_VAL - digit) / 10)) {
        return sign === 1 ? INT_MAX_VAL : INT_MIN_VAL;
      }

      num = num * 10 + digit;
      i++;
    }

    return sign * num;
  }
}
