class Solution {
    socialNetwork(arr) {
        let n = arr.length + 1;
        let parent = new Array(n + 1).fill(-1);
        for (let i = 2; i <= n; i++) {
            parent[i] = arr[i - 2];
        }
        let res = [];
        for (let i = 2; i <= n; i++) {
            let reaches = [];
            let curr = i;
            let dist = 0;
            while (parent[curr] !== -1) {
                curr = parent[curr];
                dist++;
                reaches.push([curr, dist]);
            }
            reaches.sort((a, b) => a[0] - b[0]);
            for (let p of reaches) {
                res.push([i, p[0], p[1]]);
            }
        }
        return res;
    }
}