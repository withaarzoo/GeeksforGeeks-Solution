class Solution {
  public:
    vector<string> binstr(int n) {
        // number of strings = 2^n
        unsigned long long total = 1ULL << n;
        vector<string> ans;
        ans.reserve((size_t)total); // avoid repeated reallocations

        for (unsigned long long mask = 0; mask < total; ++mask) {
            string s(n, '0');             // build an n-length string filled with '0'
            for (int j = 0; j < n; ++j) {
                // check j-th bit of mask (0 = LSB). Place it at s[n-1-j] (rightmost is LSB)
                if (((mask >> j) & 1ULL) != 0ULL) s[n - 1 - j] = '1';
            }
            ans.push_back(std::move(s));  // move s into vector to avoid copy
        }
        return ans;
    }
}; 
