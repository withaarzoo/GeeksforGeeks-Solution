#include <vector>
#include <deque>
using namespace std;

class Solution {
public:
    vector<int> maxOfMins(vector<int>& arr) {
        int n = arr.size();
        if (n == 0) return {};

        vector<int> left(n), right(n);
        deque<int> st;

        // previous smaller element (strictly smaller)
        for (int i = 0; i < n; ++i) {
            while (!st.empty() && arr[st.back()] >= arr[i]) st.pop_back();
            left[i] = st.empty() ? -1 : st.back();
            st.push_back(i);
        }

        st.clear();

        // next smaller element (strictly smaller)
        for (int i = n - 1; i >= 0; --i) {
            while (!st.empty() && arr[st.back()] >= arr[i]) st.pop_back();
            right[i] = st.empty() ? n : st.back();
            st.push_back(i);
        }

        // answer[len] will hold max of minima for window size = len
        vector<int> answer(n + 1, 0); // safe to use 0 because arr[i] >= 1 in constraints
        for (int i = 0; i < n; ++i) {
            int len = right[i] - left[i] - 1;
            if (arr[i] > answer[len]) answer[len] = arr[i];
        }

        // Fill gaps by taking max from larger window sizes
        for (int len = n - 1; len >= 1; --len) {
            if (answer[len + 1] > answer[len]) answer[len] = answer[len + 1];
        }

        // build result for sizes 1..n
        vector<int> res(n);
        for (int i = 1; i <= n; ++i) res[i - 1] = answer[i];
        return res;
    }
};
