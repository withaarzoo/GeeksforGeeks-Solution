class Solution {
    public boolean isProduct(int[] arr, long target) {

        // HashSet to store visited numbers
        HashSet<Long> seen = new HashSet<>();

        // Traverse array
        for (long num : arr) {

            // Special case for zero
            if (num == 0) {

                // If target is zero and any previous number exists
                // then product can become zero
                if (target == 0 && !seen.isEmpty()) {
                    return true;
                }

                // Store zero and move ahead
                seen.add(num);
                continue;
            }

            // Skip if target is not divisible
            if (target % num != 0) {
                seen.add(num);
                continue;
            }

            // Required pair value
            long needed = target / num;

            // Check whether partner already exists
            if (seen.contains(needed)) {
                return true;
            }

            // Store current value
            seen.add(num);
        }

        // No pair found
        return false;
    }
};