class Solution:
    def maxOnes(self, arr):
        ones = 0
        
        # Count current number of 1s
        for num in arr:
            if num == 1:
                ones += 1
        
        current_gain = 0
        max_gain = 0
        
        # Apply Kadane's Algorithm
        for num in arr:
            # 0 gives +1 gain, 1 gives -1 loss
            value = 1 if num == 0 else -1
            
            current_gain = max(value, current_gain + value)
            max_gain = max(max_gain, current_gain)
        
        return ones + max_gain