class Solution {

    // Count how many triplets have a sum <= target.
    private long countLessEqual(int[] arr, int target) {
        int n = arr.length; // Store the number of elements in the array.
        long count = 0; // Store the number of valid triplets.

        // Fix the first element of the triplet one by one.
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1; // Start the second element just after i.
            int right = n - 1; // Start the third element at the end.

            // Move the two pointers until they cross.
            while (left < right) {
                // Use long so the addition is safe for the allowed values.
                long sum = (long) arr[i] + arr[left] + arr[right];

                if (sum <= target) {
                    // Since the array is sorted, every index from left to right - 1
                    // forms a valid triplet with arr[i] and arr[right].
                    count += right - left;

                    // Move left forward to try a larger second element.
                    left++;
                } else {
                    // The sum is too large, so decrease the third element.
                    right--;
                }
            }
        }

        return count; // Return the number of triplets with sum <= target.
    }

    public int countTriplets(int[] arr, int l, int r) {
        // Sort the array so the two-pointer technique works correctly.
        Arrays.sort(arr);

        // Count sums <= r and subtract sums <= l - 1.
        long result = countLessEqual(arr, r) - countLessEqual(arr, l - 1);

        // For n <= 1000, the answer fits safely inside an int.
        return (int) result;
    }
}