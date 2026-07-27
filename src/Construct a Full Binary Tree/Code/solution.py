''' Structure of Binary Tree Node
class Node:
    def __init__(self, val):
        self.data = val
        self.right = None
        self.left = None
'''

class Solution:

    def constructBinaryTree(self, pre, preMirror):

        # Store index of every value in preorder
        pre_pos = {value: i for i, value in enumerate(pre)}

        # Store index of every value in mirror preorder
        mirror_pos = {value: i for i, value in enumerate(preMirror)}

        # Recursive function to build the tree
        def build(ps, pe, ms, me):

            # Empty range
            if ps > pe:
                return None

            # Create current root
            root = Node(pre[ps])

            # Leaf node
            if ps == pe:
                return root

            # Left child in preorder
            left_root = pre[ps + 1]

            # Right child in mirror preorder
            right_root = preMirror[ms + 1]

            # Position of right subtree root
            right_pos = pre_pos[right_root]

            # Size of left subtree
            left_size = right_pos - (ps + 1)

            # Build left subtree
            root.left = build(
                ps + 1,
                ps + left_size,
                mirror_pos[left_root],
                me
            )

            # Build right subtree
            root.right = build(
                ps + left_size + 1,
                pe,
                ms + 1,
                mirror_pos[right_root]
            )

            return root

        # Return the constructed tree
        return build(0, len(pre) - 1, 0, len(preMirror) - 1)