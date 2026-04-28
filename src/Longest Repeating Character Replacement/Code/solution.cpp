class Solution {
  public:
    int longestSubstr(string& s, int k) {
        vector<int> freq(26, 0); // frequency of characters
        int left = 0, maxFreq = 0, maxLen = 0;

        for (int right = 0; right < s.size(); right++) {
            // Increase frequency of current character
            freq[s[right] - 'A']++;

            // Update max frequency in window
            maxFreq = max(maxFreq, freq[s[right] - 'A']);

            // If changes needed > k, shrink window
            while ((right - left + 1) - maxFreq > k) {
                freq[s[left] - 'A']--;
                left++;
            }

            // Update max length
            maxLen = max(maxLen, right - left + 1);
        }

        return maxLen;
    }
};