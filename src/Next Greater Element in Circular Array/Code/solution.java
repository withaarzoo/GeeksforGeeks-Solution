import java.util.ArrayList;
import java.util.Stack;

class Solution {
    public ArrayList<Integer> nextGreater(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> result = new ArrayList<>();
        
        // Initialize result list with -1
        for (int i = 0; i < n; i++) {
            result.add(-1);
        }
        
        Stack<Integer> stack = new Stack<>();  // Stack to store indices
        
        // Traverse the array twice to handle circular nature
        for (int i = 0; i < 2 * n; i++) {
            int currentIndex = i % n;  // Get actual array index
            int currentElement = arr[currentIndex];
            
            // Pop elements from stack while current element is greater
            while (!stack.isEmpty() && arr[stack.peek()] < currentElement) {
                int index = stack.pop();
                result.set(index, currentElement);  // Found next greater element
            }
            
            // Only push during first pass to avoid duplicates
            if (i < n) {
                stack.push(currentIndex);
            }
        }
        
        return result;
    }
}