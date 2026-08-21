class Solution {
    int transform(String s1, String s2) {
        // Store the common string length after checking both strings.
        int n = s1.length();

        // Moving a character does not change string length,
        // so different lengths can never be transformed into each other.
        if (n != s2.length()) {
            return -1;
        }

        // Use a fixed-size array to compare character frequencies.
        // Its size is constant, so the auxiliary space remains O(1).
        int[] freq = new int[256];

        // Add frequencies from s1 and subtract frequencies from s2.
        // Equal character counts will make every final frequency zero.
        for (int i = 0; i < n; i++) {
            freq[s1.charAt(i)]++;
            freq[s2.charAt(i)]--;
        }

        // Check whether both strings contain exactly the same characters.
        for (int i = 0; i < 256; i++) {
            if (freq[i] != 0) {
                return -1;
            }
        }

        // Start from the end because unchanged characters keep their order
        // and form the suffix of the final string.
        int i = n - 1;
        int j = n - 1;
        int operations = 0;

        // Match characters of s2 from right to left.
        while (i >= 0 && j >= 0) {
            // A matching character does not need to be moved.
            if (s1.charAt(i) == s2.charAt(j)) {
                i--;
                j--;
            } else {
                // A mismatching character from s1 must be moved to the front.
                operations++;
                i--;
            }
        }

        // Return the minimum number of required moves.
        return operations;
    }
}