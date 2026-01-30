class Solution:
    def rearrangeQueue(self, q):
        n = len(q)
        first_half = []
        
        # Move first half to list
        for _ in range(n // 2):
            first_half.append(q.pop(0))
        
        # Interleave both halves
        for i in range(n // 2):
            q.append(first_half[i])
            q.append(q.pop(0))
