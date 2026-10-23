''' BST Node Structure
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''
class Solution:
    def inorder(self, root, vals):
        if not root:
            return
        self.inorder(root.left, vals)
        vals.append(root.data)
        self.inorder(root.right, vals)
    
    def merge(self, arr, low, mid, high):
        temp = []
        i, j = low, mid + 1
        inv = 0
        while i <= mid and j <= high:
            if arr[i] <= arr[j]:
                temp.append(arr[i])
                i += 1
            else:
                inv += (mid - i + 1)
                temp.append(arr[j])
                j += 1
        while i <= mid:
            temp.append(arr[i])
            i += 1
        while j <= high:
            temp.append(arr[j])
            j += 1
        for k in range(low, high + 1):
            arr[k] = temp[k - low]
        return inv
    
    def mergeSort(self, arr, low, high):
        inv = 0
        if low < high:
            mid = low + (high - low) // 2
            inv += self.mergeSort(arr, low, mid)
            inv += self.mergeSort(arr, mid + 1, high)
            inv += self.merge(arr, low, mid, high)
        return inv
    
    def pairsViolatingBST(self, root):
        vals = []
        self.inorder(root, vals)
        return self.mergeSort(vals, 0, len(vals) - 1)