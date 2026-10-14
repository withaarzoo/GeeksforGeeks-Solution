/**
 * @params {string} s
 * @params {number[]} roll
 * @return {string}
 */
class Solution {
    findRollOut(s, roll) {
        let n = s.length;
        let freq = new Array(n + 1).fill(0);
        for (let x of roll) freq[x]++;
        for (let i = n - 1; i >= 1; i--) freq[i] += freq[i + 1];
        let arr = s.split('');
        for (let i = 0; i < n; i++) {
            let shift = freq[i + 1] % 26;
            arr[i] = String.fromCharCode(((arr[i].charCodeAt(0) - 97 + shift) % 26) + 97);
        }
        return arr.join('');
    }
}