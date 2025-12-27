class Solution:
    def kthSmallest(self, mat, k):
        n = len(mat)
        
        low = mat[0][0]
        high = mat[n - 1][n - 1]
        
        while low < high:
            mid = (low + high) // 2
            count = 0
            
            col = n - 1
            for row in range(n):
                while col >= 0 and mat[row][col] > mid:
                    col -= 1
                count += (col + 1)
            
            if count < k:
                low = mid + 1
            else:
                high = mid
        
        return low
