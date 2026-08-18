class Solution {
    public String compress(String s) {
        int n = s.length(); // Store the length so we can work with indices easily.

        int[] pi = new int[n]; // pi[i] stores the longest prefix-suffix length for s[0..i].

        // Build the KMP prefix-function array in O(n).
        for (int i = 1; i < n; i++) {
            int j = pi[i - 1]; // Start from the previous longest matching prefix.

            // Fall back through KMP links while the characters do not match.
            while (j > 0 && s.charAt(i) != s.charAt(j)) {
                j = pi[j - 1]; // Try the next smaller possible prefix.
            }

            // Extend the matching prefix when the characters are equal.
            if (s.charAt(i) == s.charAt(j)) {
                j++;
            }

            pi[i] = j; // Store the longest prefix-suffix length.
        }

        StringBuilder ans = new StringBuilder(n); // Store the answer efficiently.

        int i = n - 1; // Start processing from the last character.

        // Scan the string from right to left.
        while (i >= 0) {
            int len = i + 1; // Length of the current prefix.

            // A repeated prefix must have an even length.
            if (len % 2 == 0) {
                int period = len - pi[i]; // Smallest repeating period from KMP.

                // Check whether the prefix can be replaced by one '*'.
                if (pi[i] >= len / 2 &&
                        len % (2 * period) == 0) {

                    ans.append('*'); // Store the compression symbol.

                    // Only the first half needs to be considered now.
                    i = len / 2;
                    i--; // Move to the last index of that half.

                    continue; // Continue with the smaller prefix.
                }
            }

            ans.append(s.charAt(i)); // Keep the character when compression is impossible.
            i--; // Move one character to the left.
        }

        return ans.reverse().toString(); // Reverse because the answer was built backwards.
    }
}