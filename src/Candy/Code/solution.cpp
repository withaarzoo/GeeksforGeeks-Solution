class Solution {
public:
    int minCandy(vector<int>& arr) {
        int n = arr.size();
        if (n == 0) return 0;

        long long total = 1;   // first child gets 1 candy
        int up = 0, down = 0, peak = 0;

        for (int i = 1; i < n; i++) {
            // Increasing slope
            if (arr[i] > arr[i - 1]) {
                up++;
                peak = up;
                down = 0;
                total += 1 + up;
            }
            // Equal ratings
            else if (arr[i] == arr[i - 1]) {
                up = down = peak = 0;
                total += 1;
            }
            // Decreasing slope
            else {
                down++;
                up = 0;
                total += 1 + down;
                if (down <= peak) {
                    total--; // adjust peak
                }
            }
        }

        return total;
    }
};
