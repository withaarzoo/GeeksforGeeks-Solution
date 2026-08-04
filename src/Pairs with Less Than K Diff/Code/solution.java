import java.util.Arrays;

class Solution {
    public static int countPairs(int arr[], int k) {

        // Sort the array so differences become easier to handle
        Arrays.sort(arr);

        int n = arr.length;
        int j = 1;
        int ans = 0;

        // Use every element as the first element of a pair
        for (int i = 0; i < n; i++) {

            // Keep j ahead of i
            if (j <= i)
                j = i + 1;

            // Extend the window while difference is less than k
            while (j < n && arr[j] - arr[i] < k)
                j++;

            // Count all valid pairs starting from i
            ans += (j - i - 1);
        }

        // Return the final answer
        return ans;
    }
}