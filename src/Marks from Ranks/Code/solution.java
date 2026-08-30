import java.util.*;

class Solution {
    public ArrayList<Integer> getMarks(int[] l, int[] r, int[] rank) {
        // Store the number of valid marks up to each interval.
        int n = l.length;
        long[] prefix = new long[n];

        // Build prefix sums of interval sizes.
        for (int i = 0; i < n; i++) {
            // Calculate how many consecutive marks this interval contains.
            long count = (long) r[i] - l[i] + 1;

            // Add the current interval size to all previous interval sizes.
            prefix[i] = count + (i > 0 ? prefix[i - 1] : 0);
        }

        // Store the mark corresponding to every requested rank.
        ArrayList<Integer> answer = new ArrayList<>();

        // Process every rank query independently.
        for (int currentRank : rank) {
            // Start binary search over the prefix sum array.
            int left = 0;
            int right = n - 1;

            // Find the first index whose prefix value is at least currentRank.
            while (left < right) {
                // Find the middle interval safely.
                int mid = left + (right - left) / 2;

                // The required rank is in this interval or an earlier one.
                if (prefix[mid] >= currentRank) {
                    right = mid;
                } else {
                    // The required rank must be in a later interval.
                    left = mid + 1;
                }
            }

            // left is now the interval containing currentRank.
            int index = left;

            // Count how many valid marks appear before the found interval.
            long marksBefore = index > 0 ? prefix[index - 1] : 0;

            // Calculate the zero-based position inside the current interval.
            long offset = currentRank - marksBefore - 1;

            // Move offset positions from the interval's starting mark.
            answer.add((int) (l[index] + offset));
        }

        // Return all marks in the same order as the input rank queries.
        return answer;
    }
}