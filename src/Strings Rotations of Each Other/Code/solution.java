class Solution {
    public boolean areRotations(String s1, String s2) {
        // Step 1: Length check
        if (s1.length() != s2.length())
            return false;

        // Step 2: Concatenate s1 with itself
        String temp = s1 + s1;

        // Step 3: Check substring
        return temp.contains(s2);
    }
}
