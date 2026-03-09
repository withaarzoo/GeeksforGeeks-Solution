class Solution:
    def largestSwap(self, s):
        arr = list(s)
        n = len(arr)
        
        # Store last occurrence of digits
        last = [-1] * 10
        
        for i in range(n):
            last[int(arr[i])] = i
        
        for i in range(n):
            current = int(arr[i])
            
            # Check for larger digits
            for d in range(9, current, -1):
                if last[d] > i:
                    arr[i], arr[last[d]] = arr[last[d]], arr[i]
                    return "".join(arr)
        
        return s