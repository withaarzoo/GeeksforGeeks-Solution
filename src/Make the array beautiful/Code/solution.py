class Solution:
    def makeBeautiful(self, arr: list[int]) -> list[int]:
        
        # List used like a stack
        st = []
        
        # Traverse every element
        for num in arr:
            
            # Check if stack is not empty
            # and signs are opposite
            if st and (
                (st[-1] >= 0 and num < 0) or
                (st[-1] < 0 and num >= 0)
            ):
                
                # Remove previous element
                st.pop()
            else:
                
                # Keep current element
                st.append(num)
        
        # Final beautiful array
        return st