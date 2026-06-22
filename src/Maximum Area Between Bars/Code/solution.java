class Solution {
    public int maxArea(List<Integer> height) {
        int n = height.size(); // I store how many bars are present.
        if (n < 2)
            return 0; // I need two bars to form any rectangle at all.

        int left = 0; // I begin with the leftmost bar.
        int right = n - 1; // I begin with the rightmost bar.
        long best = 0; // I use long to safely hold the area while I compute.

        while (left + 1 < right) { // I stop when there is no bar left between the two pointers.
            long width = right - left - 1; // I count the bars strictly between the two selected bars.
            long current = (long) Math.min(height.get(left), height.get(right)) * width; // I use the shorter bar as the
                                                                                         // height limit.
            if (current > best)
                best = current; // I keep the best area seen so far.

            if (height.get(left) <= height.get(right)) {
                left++; // I move the shorter side inward to look for a taller bar.
            } else {
                right--; // I move the right side inward when it is the shorter one.
            }
        }

        return (int) best; // I convert back to int because the final answer fits in the given constraints.
    }
}