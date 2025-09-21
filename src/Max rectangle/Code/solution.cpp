#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int maxArea(vector<vector<int>> &mat) {
        if (mat.empty() || mat[0].empty()) return 0;
        int n = mat.size();
        int m = mat[0].size();
        vector<int> heights(m, 0);
        int maxArea = 0;

        // process each row as histogram base
        for (int i = 0; i < n; ++i) {
            // update heights: consecutive ones up to this row
            for (int j = 0; j < m; ++j) {
                heights[j] = (mat[i][j] == 1) ? heights[j] + 1 : 0;
            }

            // compute largest rectangle in histogram heights
            stack<int> st;
            for (int j = 0; j <= m; ++j) {
                int cur = (j == m ? 0 : heights[j]); // sentinel zero at end
                while (!st.empty() && heights[st.top()] > cur) {
                    int h = heights[st.top()];
                    st.pop();
                    int width = st.empty() ? j : (j - st.top() - 1);
                    maxArea = max(maxArea, h * width);
                }
                st.push(j);
            }
        }
        return maxArea;
    }
};
