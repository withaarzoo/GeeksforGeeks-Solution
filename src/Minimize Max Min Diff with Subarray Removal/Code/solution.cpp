class Solution {
  public:
    int minDiff(int k, vector<int> &arr) {
        int n = arr.size();
        vector<int> preMax(n), preMin(n), sufMax(n), sufMin(n);
        preMax[0] = preMin[0] = arr[0];
        for (int i = 1; i < n; i++) {
            preMax[i] = max(preMax[i - 1], arr[i]);
            preMin[i] = min(preMin[i - 1], arr[i]);
        }
        sufMax[n - 1] = sufMin[n - 1] = arr[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            sufMax[i] = max(sufMax[i + 1], arr[i]);
            sufMin[i] = min(sufMin[i + 1], arr[i]);
        }
        int m = n - k;
        int ans = INT_MAX;
        for (int left = 0; left <= m; left++) {
            int right = left + k;
            int curMax, curMin;
            if (left == 0) {
                curMax = sufMax[right];
                curMin = sufMin[right];
            } else if (right == n) {
                curMax = preMax[left - 1];
                curMin = preMin[left - 1];
            } else {
                curMax = max(preMax[left - 1], sufMax[right]);
                curMin = min(preMin[left - 1], sufMin[right]);
            }
            ans = min(ans, curMax - curMin);
        }
        return ans;
    }
};