class Solution {
    public int countSubstring(String s) {
        int n = s.length();

        // Prefix sums can range from -n to n.
        // The offset converts them into valid array indices.
        int offset = n;
        int[] freq = new int[2 * n + 1];

        // The empty prefix has sum 0 and appears once.
        freq[offset] = 1;

        int prefix = 0;

        // This stores the number of previous prefix sums
        // smaller than the current prefix sum.
        long smaller = 0;

        // I use long internally to safely store the total count.
        long answer = 0;

        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == '1') {
                // Moving from prefix to prefix + 1 means
                // old equal values now become smaller.
                smaller += freq[prefix + offset];

                // A '1' adds 1 to the prefix sum.
                prefix++;
            } else {
                // The new prefix will be prefix - 1.
                // Values equal to it must be removed from the smaller count.
                smaller -= freq[prefix - 1 + offset];

                // A '0' subtracts 1 from the prefix sum.
                prefix--;
            }

            // These are all valid substrings ending at this position.
            answer += smaller;

            // Save the current prefix sum for future positions.
            freq[prefix + offset]++;
        }

        return (int) answer;
    }
}