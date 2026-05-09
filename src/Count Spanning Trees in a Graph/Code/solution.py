class Solution:
    
    # Function to calculate determinant using Gaussian Elimination
    def determinant(self, mat, size):
        
        det = 1
        
        for i in range(size):
            
            pivot = i
            
            # Find row having non-zero pivot
            for j in range(i, size):
                if abs(mat[j][i]) > 1e-9:
                    pivot = j
                    break
            
            # Determinant becomes 0
            if abs(mat[pivot][i]) < 1e-9:
                return 0
            
            # Swap rows if needed
            if pivot != i:
                mat[pivot], mat[i] = mat[i], mat[pivot]
                det *= -1
            
            # Multiply diagonal element
            det *= mat[i][i]
            
            # Eliminate rows below
            for j in range(i + 1, size):
                
                factor = mat[j][i] / mat[i][i]
                
                for k in range(i, size):
                    mat[j][k] -= factor * mat[i][k]
        
        return round(det)
    
    def countSpanTree(self, n, edges):
        
        # Single node graph
        if n == 1:
            return 1
        
        # Create Laplacian matrix
        lap = [[0] * n for _ in range(n)]
        
        # Build matrix
        for u, v in edges:
            
            # Increase degree
            lap[u][u] += 1
            lap[v][v] += 1
            
            # Mark edge connection
            lap[u][v] -= 1
            lap[v][u] -= 1
        
        # Create cofactor matrix
        cof = [[0] * (n - 1) for _ in range(n - 1)]
        
        for i in range(n - 1):
            for j in range(n - 1):
                cof[i][j] = lap[i][j]
        
        # Determinant gives total spanning trees
        return self.determinant(cof, n - 1)