class Solution {
  public:
    int maximumSubarray(vector<int>& arr) {
        int n = arr.size();
        int noSq = arr[0];
        int withSq = arr[0] * arr[0];
        int ans = max(noSq, withSq);
        for (int i = 1; i < n; i++) {
            int cur = arr[i];
            int sq = cur * cur;
            int newNo = max(cur, noSq + cur);
            int newWith = max(sq, max(noSq + sq, withSq + cur));
            noSq = newNo;
            withSq = newWith;
            ans = max(ans, max(noSq, withSq));
        }
        return ans;
    }
};