class Solution:
    def rowWithMax1s(self, arr):
        n = len(arr)
        m = len(arr[0])
        
        max_ones = 0
        answer = -1
        
        for i in range(n):
            low, high = 0, m - 1
            first_one = -1
            
            # Binary search for first 1
            while low <= high:
                mid = (low + high) // 2
                
                if arr[i][mid] == 1:
                    first_one = mid
                    high = mid - 1
                else:
                    low = mid + 1
            
            if first_one != -1:
                ones_count = m - first_one
                
                if ones_count > max_ones:
                    max_ones = ones_count
                    answer = i
        
        return answer
