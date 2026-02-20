import java.util.*;

class Solution {
    public String findLargest(int[] arr) {
        int n = arr.length;

        // Convert int array to String array
        String[] nums = new String[n];
        for (int i = 0; i < n; i++) {
            nums[i] = String.valueOf(arr[i]);
        }

        // Sort with custom comparator
        Arrays.sort(nums, (a, b) -> (b + a).compareTo(a + b));

        // Edge case: if highest element is "0"
        if (nums[0].equals("0"))
            return "0";

        // Build final result
        StringBuilder sb = new StringBuilder();
        for (String s : nums) {
            sb.append(s);
        }

        return sb.toString();
    }
}