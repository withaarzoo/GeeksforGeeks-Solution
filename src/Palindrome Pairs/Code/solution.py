class Solution:
    
    # Function to check palindrome
    def isPalindrome(self, s, left, right):
        
        # Compare both ends
        while left < right:
            
            # Mismatch means not palindrome
            if s[left] != s[right]:
                return False
            
            left += 1
            right -= 1
        
        return True
    
    def palindromePair(self, arr):
        
        # Store all strings with index
        mp = {}
        
        for i, word in enumerate(arr):
            mp[word] = i
        
        # Traverse every word
        for i, word in enumerate(arr):
            
            n = len(word)
            
            # Try every split position
            for j in range(n + 1):
                
                # Left and right parts
                left = word[:j]
                right = word[j:]
                
                # CASE 1
                # If left part is palindrome
                if self.isPalindrome(word, 0, j - 1):
                    
                    # Reverse right part
                    revRight = right[::-1]
                    
                    # Check if it exists
                    if revRight in mp and mp[revRight] != i:
                        return True
                
                # CASE 2
                # Avoid duplicate checking
                if j != n and self.isPalindrome(word, j, n - 1):
                    
                    # Reverse left part
                    revLeft = left[::-1]
                    
                    # Check if it exists
                    if revLeft in mp and mp[revLeft] != i:
                        return True
        
        return False