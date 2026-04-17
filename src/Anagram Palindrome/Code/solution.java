class Solution {
    boolean canFormPalindrome(String s) {
        // Frequency array for 26 lowercase letters
        int[] freq = new int[26];

        // Count frequency of each character
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
        }

        // Count characters with odd frequency
        int oddCount = 0;

        for (int i = 0; i < 26; i++) {
            if (freq[i] % 2 != 0) {
                oddCount++;
            }

            // If more than one odd frequency exists
            if (oddCount > 1) {
                return false;
            }
        }

        return true;
    }
}