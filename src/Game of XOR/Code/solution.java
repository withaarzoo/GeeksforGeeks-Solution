class Solution {
    public int subarrayXor(int[] arr) {
        int n = arr.length;

        // If array size is even, answer is 0
        if (n % 2 == 0)
            return 0;

        int ans = 0;
        // For odd n, XOR all elements at even indices
        for (int i = 0; i < n; i += 2) {
            ans ^= arr[i];
        }
        return ans;
    }
}
