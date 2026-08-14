class Solution {
    public boolean isPossible(int[] arr, int s, int x) {
        // Store the useful generated numbers so I can process
        // them later from largest to smallest.
        ArrayList<Long> nums = new ArrayList<>();

        // The first number on the paper is s.
        nums.add((long) s);

        // sum stores the sum of every number currently on the paper.
        long sum = s;

        // Generate the remaining numbers from arr.
        for (int a : arr) {
            // The next number is the current total plus arr[i].
            long next = sum + a;

            // If this number is already greater than x, all later
            // numbers will also be greater than x, so I can stop.
            if (next > x) {
                break;
            }

            // Keep this number because it can be used in the subset.
            nums.add(next);

            // Update the total for generating the next number.
            sum += next;
        }

        // This is the amount of x that is still left to form.
        long remaining = x;

        // Process the largest generated number first.
        for (int i = nums.size() - 1; i >= 0; i--) {
            // Because the sequence is superincreasing, taking a fitting
            // number is always the correct greedy choice.
            if (nums.get(i) <= remaining) {
                remaining -= nums.get(i);
            }

            // No value is left, so x has been formed.
            if (remaining == 0) {
                return true;
            }
        }

        // The required subset sum cannot be formed.
        return false;
    }
}