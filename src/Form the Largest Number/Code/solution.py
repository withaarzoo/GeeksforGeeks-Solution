class Solution:

    def findLargest(self, arr):
        
        # Convert integers to strings
        nums = list(map(str, arr))
        
        # Sort using custom comparator
        nums.sort(key=lambda x: x*10, reverse=True)
        
        # Edge case: if largest number is "0"
        if nums[0] == "0":
            return "0"
        
        # Join all numbers
        return "".join(nums)