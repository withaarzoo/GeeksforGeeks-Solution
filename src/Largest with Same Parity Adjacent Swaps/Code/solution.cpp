class Solution {
  public:
    vector<int> lexicographicallyLargest(vector<int> &arr) {
        int n = arr.size();
        int i = 0;
        while (i < n) {
            int j = i;
            while (j + 1 < n && (arr[j] % 2 == arr[j + 1] % 2)) {
                j++;
            }
            sort(arr.begin() + i, arr.begin() + j + 1, greater<int>());
            i = j + 1;
        }
        return arr;
    }
};