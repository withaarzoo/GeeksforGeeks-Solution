class Solution {
  public:
    int maxFrequency(vector<int>& arr, int k) {
        sort(arr.begin(), arr.end());
        long long sum = 0;
        int left = 0, ans = 1;
        for (int right = 0; right < arr.size(); right++) {
            sum += arr[right];
            while ((long long)arr[right] * (right - left + 1) - sum > k) {
                sum -= arr[left];
                left++;
            }
            ans = max(ans, right - left + 1);
        }
        return ans;
    }
};