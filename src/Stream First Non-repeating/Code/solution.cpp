class Solution {
  public:
    string firstNonRepeating(string &s) {
        vector<int> freq(26, 0);     // frequency of characters
        queue<char> q;               // queue to maintain order
        string result = "";

        for (char ch : s) {
            freq[ch - 'a']++;        // increase frequency
            q.push(ch);              // push current character

            // remove repeating characters from front
            while (!q.empty() && freq[q.front() - 'a'] > 1) {
                q.pop();
            }

            // decide result character
            if (q.empty())
                result += '#';
            else
                result += q.front();
        }
        return result;
    }
};
