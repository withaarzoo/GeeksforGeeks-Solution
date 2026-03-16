class Solution:
    
    def dfs(self, node, curr_sum, k, prefix):
        if not node:
            return 0
        
        curr_sum += node.data
        count = 0
        
        if curr_sum == k:
            count += 1
        
        count += prefix.get(curr_sum - k, 0)
        
        prefix[curr_sum] = prefix.get(curr_sum, 0) + 1
        
        count += self.dfs(node.left, curr_sum, k, prefix)
        count += self.dfs(node.right, curr_sum, k, prefix)
        
        prefix[curr_sum] -= 1
        
        return count
    
    def countAllPaths(self, root, k):
        prefix = {}
        return self.dfs(root, 0, k, prefix)