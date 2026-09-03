class Solution {
    public int maxDiffSum(int[] arr) {
        // keep stores the best sum when the previous element is kept unchanged.
        long keep = 0;

        // replace stores the best sum when the previous element is replaced by 1.
        long replace = 0;

        // Start from the second element because the first element has no previous
        // neighbor.
        for (int i = 1; i < arr.length; i++) {
            // Calculate the best sum if the current element is kept unchanged.
            // The previous element can either be kept or replaced by 1.
            long newKeep = Math.max(
                    keep + Math.abs((long) arr[i] - arr[i - 1]),
                    replace + Math.abs((long) arr[i] - 1));

            // Calculate the best sum if the current element is replaced by 1.
            // Keeping the previous element gives |1 - arr[i-1]|.
            // Replacing both elements gives |1 - 1| = 0.
            long newReplace = Math.max(
                    keep + Math.abs(1L - arr[i - 1]),
                    replace);

            // Update the states so they represent the current element.
            keep = newKeep;
            replace = newReplace;
        }

        // The last element can be in either state, so return the better result.
        return (int) Math.max(keep, replace);
    }
}