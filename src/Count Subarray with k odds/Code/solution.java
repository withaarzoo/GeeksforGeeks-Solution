class Solution {

    // Helper function to count subarrays with at most k odd numbers
    private int atMost(int[] arr, int k) {
        int left = 0, oddCount = 0, result = 0;

        for (int right = 0; right < arr.length; right++) {
            if (arr[right] % 2 == 1)
                oddCount++;

            while (oddCount > k) {
                if (arr[left] % 2 == 1)
                    oddCount--;
                left++;
            }

            result += (right - left + 1);
        }

        return result;
    }

    public int countSubarrays(int[] arr, int k) {
        return atMost(arr, k) - atMost(arr, k - 1);
    }
}
