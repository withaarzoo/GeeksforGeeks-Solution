class Solution:
    def largestBst(self, root):

        def solve(node):
            if not node:
                return (0, float('inf'), float('-inf'), True)

            left = solve(node.left)
            right = solve(node.right)

            if (left[3] and right[3] and
                node.data > left[2] and
                node.data < right[1]):

                return (
                    left[0] + right[0] + 1,
                    min(node.data, left[1]),
                    max(node.data, right[2]),
                    True
                )

            return (
                max(left[0], right[0]),
                float('-inf'),
                float('inf'),
                False
            )

        return solve(root)[0]