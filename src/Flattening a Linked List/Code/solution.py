class Solution:
    def merge(self, a, b):
        if not a:
            return b
        if not b:
            return a

        if a.data < b.data:
            result = a
            result.bottom = self.merge(a.bottom, b)
        else:
            result = b
            result.bottom = self.merge(a, b.bottom)

        result.next = None
        return result

    def flatten(self, root):
        if not root or not root.next:
            return root

        root.next = self.flatten(root.next)
        root = self.merge(root, root.next)

        return root
