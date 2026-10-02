/**
 * @param {string} s
 * @return {string}
 */

class Solution {
    lexiString(s) {
        let doubled = s + s;
        let n = doubled.length;
        let f = new Array(n).fill(-1);
        let k = 0;
        for (let j = 1; j < n; j++) {
            let sj = doubled[j];
            let i = f[j - k - 1];
            while (i !== -1 && sj !== doubled[k + i + 1]) {
                if (sj < doubled[k + i + 1]) {
                    k = j - i - 1;
                }
                i = f[i];
            }
            if (sj !== doubled[k + i + 1]) {
                if (sj < doubled[k]) {
                    k = j;
                }
                f[j - k] = -1;
            } else {
                f[j - k] = i + 1;
            }
        }
        return doubled.substring(k, k + s.length);
    }
}