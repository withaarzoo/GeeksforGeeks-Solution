class Solution:
    def shortestDist(self, mat):
        n = len(mat)
        # Prepare the answer grid with zeros
        ans = [[0] * n for _ in range(n)]
        
        # Define a nested helper function for clean recursion
        def solve(i, j):
            # Check if we are at the destination
            if i == n - 1 and j == n - 1:
                ans[i][j] = 1
                return True
            
            # Check if coordinates are bad or cell is a dead end
            if i >= n or j >= n or mat[i][j] == 0:
                return False
                
            # Temporarily flag this cell as part of the successful path
            ans[i][j] = 1
            jumps = mat[i][j]
            
            # Loop through jump lengths starting from 1 to prioritize short jumps
            for k in range(1, jumps + 1):
                # Always test moving to the right before moving down
                if solve(i, j + k):
                    return True
                if solve(i + k, j):
                    return True
                    
            # The current cell led to dead ends, so we clean up
            ans[i][j] = 0
            # Mutate the input matrix to block future paths from wasting time here
            mat[i][j] = 0
            
            return False
            
        # Kick off the search at the origin
        if solve(0, 0):
            return ans
            
        # Return a matrix with a single -1 if we fail completely
        return [[-1]]