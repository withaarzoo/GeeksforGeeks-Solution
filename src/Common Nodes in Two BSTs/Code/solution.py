''' 
Structure of a Binary Search Tree node
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None
'''

class Solution:
    def findCommon(self, r1: 'Node', r2: 'Node') -> list[int]:
        res = []
        s1 = []
        s2 = []
        
        while r1:
            s1.append(r1)
            r1 = r1.left
        while r2:
            s2.append(r2)
            r2 = r2.left
        
        while s1 and s2:
            a = s1[-1]
            b = s2[-1]
            
            if a.data == b.data:
                res.append(a.data)
                s1.pop()
                s2.pop()
                r1 = a.right
                r2 = b.right
                while r1:
                    s1.append(r1)
                    r1 = r1.left
                while r2:
                    s2.append(r2)
                    r2 = r2.left
            elif a.data < b.data:
                s1.pop()
                r1 = a.right
                while r1:
                    s1.append(r1)
                    r1 = r1.left
            else:
                s2.pop()
                r2 = b.right
                while r2:
                    s2.append(r2)
                    r2 = r2.left
        return res