class Solution:
    def cntWays(self, arr):
        n = len(arr)
        
        total_even = 0
        total_odd = 0
        
        # Calculate total even and odd index sums
        for i in range(n):
            if i % 2 == 0:
                total_even += arr[i]
            else:
                total_odd += arr[i]
        
        left_even = 0
        left_odd = 0
        count = 0
        
        # Try removing each index
        for i in range(n):
            if i % 2 == 0:
                total_even -= arr[i]
            else:
                total_odd -= arr[i]
            
            new_even_sum = left_even + total_odd
            new_odd_sum = left_odd + total_even
            
            if new_even_sum == new_odd_sum:
                count += 1
            
            if i % 2 == 0:
                left_even += arr[i]
            else:
                left_odd += arr[i]
        
        return count
