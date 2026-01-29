class Solution {
  firstNonRepeating(s) {
    let freq = new Array(26).fill(0);
    let queue = [];
    let result = "";

    for (let ch of s) {
      freq[ch.charCodeAt(0) - 97]++;
      queue.push(ch);

      while (queue.length > 0 && freq[queue[0].charCodeAt(0) - 97] > 1) {
        queue.shift();
      }

      if (queue.length === 0) result += "#";
      else result += queue[0];
    }
    return result;
  }
}
