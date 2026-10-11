class Solution {
    public void mergeTwoParts(int[] arr) {
        int n = arr.length;
        int breakPoint = -1;
        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                breakPoint = i;
                break;
            }
        }
        if (breakPoint == -1) return;
        int[] temp = new int[n];
        int i = 0, j = breakPoint + 1, k = 0;
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
        for (int p = 0; p < n; p++) {
            arr[p] = temp[p];
        }
    }
}