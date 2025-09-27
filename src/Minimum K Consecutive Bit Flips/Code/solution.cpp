#include <vector>
using namespace std;

class Solution {
  public:
    int kBitFlips(vector<int>& arr, int k) {
        int n = arr.size();
        int flips = 0;   // current parity of active flips (0 or 1)
        int ans = 0;     // number of flips performed

        for (int i = 0; i < n; ++i) {
            // If a flip started at i-k, its effect ends now.
            if (i >= k && arr[i - k] > 1) {
                // We added +2 to arr[i-k] when we started a flip there.
                // Removing its effect toggles flips parity.
                flips ^= 1;
                // Optionally we could subtract 2 to restore original value,
                // but not necessary for correctness here.
            }

            // effective bit after flips affecting i
            int bit = (arr[i] & 1) ^ flips;
            if (bit == 0) { // need to flip starting at i
                if (i + k > n) return -1; // can't flip, window would overflow
                ++ans;
                flips ^= 1;       // new flip now affects subsequent indices
                arr[i] += 2;      // mark that we started a flip here
            }
        }
        return ans;
    }
};
