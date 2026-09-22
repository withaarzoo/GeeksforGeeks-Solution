class Solution {
    findLongestWord(s, d) {
        let pos = Array.from({length: 26}, () => []);
        for (let i = 0; i < s.length; i++) {
            pos[s.charCodeAt(i) - 97].push(i);
        }
        let ans = "";
        for (let w of d) {
            let last = -1;
            let ok = true;
            for (let i = 0; i < w.length; i++) {
                let c = w.charCodeAt(i) - 97;
                let p = pos[c];
                let lo = 0, hi = p.length;
                while (lo < hi) {
                    let mid = (lo + hi) >> 1;
                    if (p[mid] <= last) lo = mid + 1;
                    else hi = mid;
                }
                if (lo === p.length) {
                    ok = false;
                    break;
                }
                last = p[lo];
            }
            if (ok) {
                if (w.length > ans.length || (w.length === ans.length && w < ans)) {
                    ans = w;
                }
            }
        }
        return ans;
    }
}