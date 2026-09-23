class Solution {
    formPyramid(arr) {
        let n = arr.length;
        let total = 0;
        for (let x of arr) total += x;
        if (n <= 2) return total - 1;
        let left = new Array(n);
        let right = new Array(n);
        left[0] = 1;
        for (let i = 1; i < n; i++)
            left[i] = Math.min(left[i - 1] + 1, arr[i]);
        right[n - 1] = 1;
        for (let i = n - 2; i >= 0; i--)
            right[i] = Math.min(right[i + 1] + 1, arr[i]);
        let maxX = 0;
        for (let i = 0; i < n; i++)
            maxX = Math.max(maxX, Math.min(left[i], right[i]));
        return total - maxX * maxX;
    }
}