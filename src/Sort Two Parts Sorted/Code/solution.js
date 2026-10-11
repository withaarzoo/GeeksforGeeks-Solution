class Solution {
    mergeTwoParts(arr) {
        let n = arr.length;
        let breakPoint = -1;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                breakPoint = i;
                break;
            }
        }
        if (breakPoint === -1) return;
        let temp = new Array(n);
        let i = 0, j = breakPoint + 1, k = 0;
        while (i <= breakPoint && j < n) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= breakPoint) {
            temp[k++] = arr[i++];
        }
        while (j < n) {
            temp[k++] = arr[j++];
        }
        for (let p = 0; p < n; p++) {
            arr[p] = temp[p];
        }
    }
}