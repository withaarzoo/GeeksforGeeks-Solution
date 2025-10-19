'''
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    def init_pred(self, root, target, st):
        # Push nodes <= target: go right to find larger but still <= target
        while root:
            if root.data <= target:
                st.append(root)
                root = root.right
            else:
                root = root.left

    def init_succ(self, root, target, st):
        # Push nodes > target: go left to find smaller but still > target
        while root:
            if root.data > target:
                st.append(root)
                root = root.left
            else:
                root = root.right

    def get_next_pred(self, st):
        node = st.pop()
        val = node.data
        node = node.left
        while node:
            st.append(node)
            node = node.right
        return val

    def get_next_succ(self, st):
        node = st.pop()
        val = node.data
        node = node.right
        while node:
            st.append(node)
            node = node.left
        return val

    def getKClosest(self, root, target, k):
        res = []
        if not root or k <= 0:
            return res

        pred, succ = [], []
        self.init_pred(root, target, pred)
        self.init_succ(root, target, succ)

        while k > 0:
            if not pred and not succ:
                break
            elif not pred:
                res.append(self.get_next_succ(succ))
            elif not succ:
                res.append(self.get_next_pred(pred))
            else:
                pval = pred[-1].data
                sval = succ[-1].data
                pdiff = abs(pval - target)
                sdiff = abs(sval - target)
                # tie => choose smaller value (predecessor)
                if pdiff <= sdiff:
                    res.append(self.get_next_pred(pred))
                else:
                    res.append(self.get_next_succ(succ))
            k -= 1
        return res
