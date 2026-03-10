import java.util.*;

class Solution {
    public int countSubarrays(int[] arr) {
        int n = arr.length;
        Stack<Integer> stack = new Stack<>();
        long ans = 0;

        for (int i = n - 1; i >= 0; i--) {

            // Maintain increasing stack
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
                stack.pop();
            }

            if (stack.isEmpty()) {
                ans += (n - i);
            } else {
                ans += (stack.peek() - i);
            }

            stack.push(i);
        }

        return (int) ans;
    }
}