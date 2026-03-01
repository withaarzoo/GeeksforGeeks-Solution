class Solution {
    void pushZerosToEnd(int[] arr) {
        int n = arr.length;
        int index = 0; // position to place next non-zero element

        // First pass: Move all non-zero elements forward
        for (int i = 0; i < n; i++) {
            if (arr[i] != 0) {
                arr[index] = arr[i];
                index++;
            }
        }

        // Second pass: Fill remaining positions with 0
        while (index < n) {
            arr[index] = 0;
            index++;
        }
    }
}