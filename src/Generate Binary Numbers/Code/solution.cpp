#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    // Generate binary representations of numbers from 1 to n (as strings).
    vector<string> generateBinary(int n) {
        vector<string> result;
        if (n <= 0) return result;

        queue<string> q;
        q.push("1"); // starting binary

        for (int i = 0; i < n; ++i) {
            string s = q.front();
            q.pop();

            result.push_back(s);    // store current binary string
            q.push(s + "0");        // next binary by appending 0
            q.push(s + "1");        // next binary by appending 1
        }
        return result;
    }
};
