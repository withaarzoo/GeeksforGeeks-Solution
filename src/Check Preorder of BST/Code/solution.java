class Solution {
    public boolean canRepresentBST(List<Integer> arr) {

        // Stack stores ancestor nodes
        Stack<Integer> stack = new Stack<>();

        // Every future value must be greater than this
        int lowerBound = Integer.MIN_VALUE;

        // Traverse every preorder value
        for (int value : arr) {

            // Invalid preorder sequence
            if (value < lowerBound)
                return false;

            // Moving towards the right subtree
            while (!stack.isEmpty() && value > stack.peek()) {

                // Update lower limit
                lowerBound = stack.pop();
            }

            // Save current node
            stack.push(value);
        }

        // Valid preorder
        return true;
    }
}