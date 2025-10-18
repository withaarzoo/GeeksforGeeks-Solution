'''
class Node:

    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    def countNodes(self, root):
        # Morris inorder count
        count = 0
        curr = root
        while curr:
            if curr.left is None:
                count += 1   # visit
                curr = curr.right
            else:
                pred = curr.left
                while pred.right and pred.right is not curr:
                    pred = pred.right
                if pred.right is None:
                    pred.right = curr  # make thread
                    curr = curr.left
                else:
                    pred.right = None  # remove thread
                    count += 1         # visit
                    curr = curr.right
        return count

    def getKth(self, root, k):
        # Morris inorder find k-th visited node's value
        cnt = 0
        curr = root
        while curr:
            if curr.left is None:
                cnt += 1
                if cnt == k:
                    return curr.data
                curr = curr.right
            else:
                pred = curr.left
                while pred.right and pred.right is not curr:
                    pred = pred.right
                if pred.right is None:
                    pred.right = curr
                    curr = curr.left
                else:
                    pred.right = None
                    cnt += 1
                    if cnt == k:
                        return curr.data
                    curr = curr.right
        return 0

    def findMedian(self, root):
        if root is None:
            return 0
        n = self.countNodes(root)
        k = (n + 1) // 2 if n % 2 == 1 else n // 2
        return self.getKth(root, k)
