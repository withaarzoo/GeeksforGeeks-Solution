class Solution:
    def URLify(self, s): 
        # List is faster than repeatedly joining strings
        result = []
        
        # Traverse every character
        for ch in s:
            
            # Replace space with %20
            if ch == ' ':
                result.append("%20")
            else:
                result.append(ch)
        
        # Join all parts into final string
        return "".join(result)