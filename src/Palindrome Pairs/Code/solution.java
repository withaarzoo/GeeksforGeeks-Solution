class Solution {
    
    // Function to check palindrome
    private boolean isPalindrome(String s, int left, int right) {
        
        // Compare both ends
        while(left < right) {
            
            // Mismatch means not palindrome
            if(s.charAt(left) != s.charAt(right)) {
                return false;
            }
            
            left++;
            right--;
        }
        
        return true;
    }
    
    public boolean palindromePair(String[] arr) {
        
        // Store strings with index
        HashMap<String, Integer> map = new HashMap<>();
        
        for(int i = 0; i < arr.length; i++) {
            map.put(arr[i], i);
        }
        
        // Traverse all words
        for(int i = 0; i < arr.length; i++) {
            
            String word = arr[i];
            int n = word.length();
            
            // Try every split position
            for(int j = 0; j <= n; j++) {
                
                String left = word.substring(0, j);
                String right = word.substring(j);
                
                // CASE 1
                if(isPalindrome(word, 0, j - 1)) {
                    
                    // Reverse right part
                    String revRight = new StringBuilder(right).reverse().toString();
                    
                    // Check existence
                    if(map.containsKey(revRight) && map.get(revRight) != i) {
                        return true;
                    }
                }
                
                // CASE 2
                if(j != n && isPalindrome(word, j, n - 1)) {
                    
                    // Reverse left part
                    String revLeft = new StringBuilder(left).reverse().toString();
                    
                    // Check existence
                    if(map.containsKey(revLeft) && map.get(revLeft) != i) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
}