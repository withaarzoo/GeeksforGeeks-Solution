class Solution {
    public String chooseSwap(String s) {

        int n = s.length();

        // Stores first occurrence of every character
        int[] first = new int[26];

        // Initialize with -1
        for (int i = 0; i < 26; i++) {
            first[i] = -1;
        }

        // Record first occurrence
        for (int i = 0; i < n; i++) {
            int idx = s.charAt(i) - 'a';

            if (first[idx] == -1) {
                first[idx] = i;
            }
        }

        char[] arr = s.toCharArray();

        // Find earliest beneficial swap
        for (int i = 0; i < n; i++) {

            for (int ch = 0; ch < arr[i] - 'a'; ch++) {

                // Smaller character exists later
                if (first[ch] > i) {

                    char c1 = arr[i];
                    char c2 = (char) ('a' + ch);

                    // Swap all occurrences globally
                    for (int j = 0; j < n; j++) {

                        if (arr[j] == c1)
                            arr[j] = c2;
                        else if (arr[j] == c2)
                            arr[j] = c1;
                    }

                    return new String(arr);
                }
            }
        }

        return s;
    }
}