class Solution {
    String removeSpaces(String s) {
        // StringBuilder is efficient for modifying strings
        StringBuilder result = new StringBuilder();
        
        // Traverse every character of the string
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            
            // If current character is not a space
            if (ch != ' ') {
                result.append(ch);
            }
        }
        
        // Convert StringBuilder to String and return
        return result.toString();
    }
}