class Solution {
  isValid(s, start, len) {
    if (start + len > s.length) return false;

    if (len > 1 && s[start] === "0") return false;

    let num = Number(s.substring(start, start + len));

    return num <= 255;
  }

  backtrack(s, index, parts, current, result) {
    if (parts === 4 && index === s.length) {
      result.push(current.slice(0, -1));
      return;
    }

    if (parts >= 4) return;

    for (let len = 1; len <= 3; len++) {
      if (this.isValid(s, index, len)) {
        let segment = s.substring(index, index + len);

        this.backtrack(
          s,
          index + len,
          parts + 1,
          current + segment + ".",
          result,
        );
      }
    }
  }

  generateIp(s) {
    let result = [];

    this.backtrack(s, 0, 0, "", result);

    return result;
  }
}
