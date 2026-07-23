class Solution {
    canRepresentBST(arr) {

        // Stack stores ancestor nodes
        let stack = [];

        // Lowest value allowed for upcoming nodes
        let lowerBound = -Infinity;

        // Traverse every preorder value
        for (let value of arr) {

            // BST property is violated
            if (value < lowerBound)
                return false;

            // We entered the right subtree
            while (stack.length && value > stack[stack.length - 1]) {

                // Update the lower limit
                lowerBound = stack.pop();
            }

            // Store current node
            stack.push(value);
        }

        // Preorder is valid
        return true;
    }
}