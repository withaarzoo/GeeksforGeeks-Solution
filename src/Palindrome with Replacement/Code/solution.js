/**
 * @param {string} s
 * @returns {number}
 */
class Solution {
    minimumSum(s) {
        let a = s.split('');
        let n = a.length;
        for (let i = 0; i < Math.floor(n / 2); i++) {
            if (a[i] !== '?' && a[n - 1 - i] !== '?' && a[i] !== a[n - 1 - i])
                return -1;
            if (a[i] === '?' && a[n - 1 - i] !== '?')
                a[i] = a[n - 1 - i];
            else if (a[i] !== '?' && a[n - 1 - i] === '?')
                a[n - 1 - i] = a[i];
        }
        let i = 0;
        while (i < n && a[i] === '?') i++;
        if (i === n) return 0;
        let prev = a[i];
        let ans = 0;
        for (let j = i + 1; j < n; j++) {
            if (a[j] === '?') a[j] = prev;
            ans += Math.abs(a[j].charCodeAt(0) - prev.charCodeAt(0));
            prev = a[j];
        }
        return ans;
    }
}