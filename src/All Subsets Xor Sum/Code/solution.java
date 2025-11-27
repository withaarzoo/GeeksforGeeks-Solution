class Solution {
    int subsetXORSum(int arr[]) {
        int n = arr.length;

        // Step 1: OR of all elements
        int allOr = 0;
        for (int x : arr) {
            allOr |= x; // add all bits that appear in the array
        }

        // Step 2: each present bit contributes in exactly 2^(n-1) subsets
        long multiplier = 1L << (n - 1);
        long ans = (long) allOr * multiplier;

        return (int) ans; // result fits in int
    }
}
