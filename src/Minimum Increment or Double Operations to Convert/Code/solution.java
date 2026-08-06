class Solution {
    public int countMinOperations(int arr[]) {

        // Stores total increment operations
        int increments = 0;

        // Stores the maximum element
        int maxValue = 0;

        // Traverse the array
        for (int num : arr) {

            // Count set bits using Java's built-in function
            increments += Integer.bitCount(num);

            // Update maximum value
            maxValue = Math.max(maxValue, num);
        }

        // Counts doubling operations
        int doubles = 0;

        // Divide until the largest number becomes 1
        while (maxValue > 1) {
            maxValue /= 2;
            doubles++;
        }

        // Return total operations
        return increments + doubles;
    }
}