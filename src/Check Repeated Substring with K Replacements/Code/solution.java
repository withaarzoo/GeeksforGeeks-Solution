class Solution {
    public boolean kSubstr(String s, int k) {
        int n = s.length();

        // String must be divisible into blocks of size k
        if (n % k != 0)
            return false;

        // Stores frequency of every k-length block
        HashMap<String, Integer> freq = new HashMap<>();

        // Extract all blocks
        for (int i = 0; i < n; i += k) {
            String block = s.substring(i, i + k);
            freq.put(block, freq.getOrDefault(block, 0) + 1);
        }

        // Already a valid repetition
        if (freq.size() == 1)
            return true;

        // More than two unique blocks cannot be fixed
        if (freq.size() > 2)
            return false;

        // One block must occur exactly once
        for (int count : freq.values()) {
            if (count == 1)
                return true;
        }

        return false;
    }
}