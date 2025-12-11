class Solution {
    constructArr(arr) {
        const m = arr.length;
        if (m === 0) return [];

        const disc = 1 + 8 * m;
        const s = Math.floor(Math.sqrt(disc));
        const n = Math.floor((1 + s) / 2);

        if (n === 2) {
            return [0, arr[0]];
        }

        const s01 = arr[0];
        const s02 = arr[1];
        const s12 = arr[n - 1];

        const r0 = Math.floor((s01 + s02 - s12) / 2);

        const res = new Array(n).fill(0);
        res[0] = r0;
        for (let i = 1; i < n; ++i) {
            res[i] = arr[i - 1] - r0;
        }
        return res;
    }
}
