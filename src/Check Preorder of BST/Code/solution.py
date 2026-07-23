class Solution:
    def canRepresentBST(self, arr):

        # Stack stores ancestor nodes
        stack = []

        # Smallest allowed value for future nodes
        lower_bound = float("-inf")

        # Traverse every preorder value
        for value in arr:

            # BST property is violated
            if value < lower_bound:
                return False

            # Moving to the right subtree
            while stack and value > stack[-1]:

                # Update the lower limit
                lower_bound = stack.pop()

            # Store current node
            stack.append(value)

        # Entire preorder is valid
        return True