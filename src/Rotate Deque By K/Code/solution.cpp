#include <deque>
using namespace std;

class Solution {
  public:
    void rotateDeque(deque<int>& dq, int type, int k) {
        int n = dq.size();
        if (n == 0) return;          // nothing to do for empty deque
        int r = k % n;               // effective rotations
        if (r == 0) return;          // already in correct position

        if (type == 1) {             // Right rotation (move back -> front)
            for (int i = 0; i < r; ++i) {
                int val = dq.back(); // take last element
                dq.pop_back();       // remove it from back
                dq.push_front(val);  // insert it at front
            }
        } else if (type == 2) {      // Left rotation (move front -> back)
            for (int i = 0; i < r; ++i) {
                int val = dq.front(); // take first element
                dq.pop_front();       // remove it from front
                dq.push_back(val);    // insert it at back
            }
        }
    }
};
