class Solution {
  public:
    int firstElementKTime(vector<int>& arr, int k) {
        unordered_map<int, int> freq;
        for (int num : arr) {
            freq[num]++;
            if (freq[num] == k) {
                return num;
            }
        }
        return -1;
    }
};