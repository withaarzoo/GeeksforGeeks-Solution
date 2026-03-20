class Solution:
    def findPreSuc(self, root, key):
        pre = None
        suc = None

        while root:
            if root.data < key:
                pre = root
                root = root.right
            elif root.data > key:
                suc = root
                root = root.left
            else:
                # Predecessor
                temp = root.left
                while temp:
                    pre = temp
                    temp = temp.right

                # Successor
                temp = root.right
                while temp:
                    suc = temp
                    temp = temp.left
                break

        return [pre, suc]