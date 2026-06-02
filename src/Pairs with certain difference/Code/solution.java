class Solution {
    public int sumDiffPairs(int[] arr, int k) {

        // Sort the array
        Arrays.sort(arr);

        int ans = 0;
        int i = arr.length - 1;

        // Traverse from largest element
        while (i > 0) {

            // Check whether adjacent elements form a valid pair
            if (arr[i] - arr[i - 1] < k) {

                // Add both elements to the result
                ans += arr[i] + arr[i - 1];

                // Skip both used elements
                i -= 2;
            } else {

                // Ignore current element
                i--;
            }
        }

        return ans;
    }
}