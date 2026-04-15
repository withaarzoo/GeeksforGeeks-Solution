class Solution {
    String URLify(String s) {
        // StringBuilder is efficient for string modifications
        StringBuilder result = new StringBuilder();

        // Traverse each character of the string
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);

            // Replace space with %20
            if (ch == ' ') {
                result.append("%20");
            } else {
                result.append(ch);
            }
        }

        // Convert StringBuilder to String and return
        return result.toString();
    }
}