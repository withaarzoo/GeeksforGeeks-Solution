class Solution
{
public:
    string minWindow(string &s, string &p)
    {
        vector<int> freqP(256, 0), window(256, 0);

        for (char c : p)
            freqP[c]++;

        int left = 0, right = 0;
        int count = 0;
        int minLen = INT_MAX;
        int start = 0;

        while (right < s.size())
        {
            char c = s[right];
            window[c]++;

            if (freqP[c] != 0 && window[c] <= freqP[c])
                count++;

            while (count == p.size())
            {
                if (right - left + 1 < minLen)
                {
                    minLen = right - left + 1;
                    start = left;
                }

                char leftChar = s[left];
                window[leftChar]--;

                if (freqP[leftChar] != 0 && window[leftChar] < freqP[leftChar])
                    count--;

                left++;
            }

            right++;
        }

        if (minLen == INT_MAX)
            return "";
        return s.substr(start, minLen);
    }
};