class Solution {
  public:
    string removeSpaces(string& s) {
        // String to store final answer
        string result = "";
        
        // Traverse every character of the string
        for(char ch : s) {
            
            // If current character is not a space
            if(ch != ' ') {
                result += ch;
            }
        }
        
        // Return the string without spaces
        return result;
    }
};