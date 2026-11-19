class Solution {
  public:
    void sortIt(vector<int>& arr) {
        sort(arr.begin(), arr.end(), [](int a, int b) {
            bool aOdd = a % 2 != 0;
            bool bOdd = b % 2 != 0;
            if (aOdd && bOdd) return a > b;
            if (!aOdd && !bOdd) return a < b;
            return aOdd;
        });
    }
};