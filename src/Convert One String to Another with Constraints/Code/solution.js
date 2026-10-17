/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
class Solution {
    isItPossible(s1, s2) {
        if (s1.length !== s2.length) return false;
        let n = s1.length;
        let i = 0, j = 0;
        while (i < n && j < n) {
            while (i < n && s1[i] === '#') i++;
            while (j < n && s2[j] === '#') j++;
            if (i === n || j === n) break;
            if (s1[i] !== s2[j]) return false;
            if (s1[i] === 'A' && i < j) return false;
            if (s1[i] === 'B' && i > j) return false;
            i++;
            j++;
        }
        while (i < n && s1[i] === '#') i++;
        while (j < n && s2[j] === '#') j++;
        return i === n && j === n;
    }
}