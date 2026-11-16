class Solution {
    findKthSmall(arr, k) {
        arr.sort((a, b) => a - b);
        let prev = 0;
        for (let num of arr) {
            let missing = num - prev - 1;
            if (k <= missing) {
                return prev + k;
            }
            k -= missing;
            prev = num;
        }
        return prev + k;
    }
}