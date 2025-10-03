#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<string> possibleWords(vector<int> &arr) {
        vector<string> map = {
            "", "", "abc", "def", "ghi",
            "jkl", "mno", "pqrs", "tuv", "wxyz"
        };
        vector<string> res;
        string cur;
        function<void(int)> dfs = [&](int idx) {
            if (idx == arr.size()) {
                if (!cur.empty()) res.push_back(cur);
                return;
            }
            int d = arr[idx];
            if (d < 0 || d > 9) return;
            string letters = map[d];
            if (letters.empty()) {
                dfs(idx + 1); // skip digits 0 and 1
                return;
            }
            for (char c : letters) {
                cur.push_back(c);
                dfs(idx + 1);
                cur.pop_back();
            }
        };
        dfs(0);
        return res;
    }
};
