class Solution {
    findPattern(s) {
        let n = s.length;
        let i = 0;
        while (i < n) {
            let x = 0;
            while (i < n && s[i] === 'x') {
                x++;
                i++;
            }
            let y = 0;
            while (i < n && s[i] === 'y') {
                y++;
                i++;
            }
            if (x === 0 || x !== y) return false;
        }
        return true;
    }
}