class Solution {
    public int findSmallest(int[] arr) {

        // Sort the array first
        Arrays.sort(arr);

        // Smallest value that cannot be formed
        long smallestMissing = 1;

        // Traverse all numbers
        for (int num : arr) {

            // Gap found
            if (num > smallestMissing) {
                break;
            }

            // Extend reachable range
            smallestMissing += num;
        }

        // Return answer
        return (int) smallestMissing;
    }
}