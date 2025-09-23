#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    void reverseQueue(queue<int> &q) {
        // If queue is empty or has one element, nothing to do
        if (q.empty() || q.size() == 1) return;

        stack<int> st;
        // Move all elements from queue to stack
        while (!q.empty()) {
            st.push(q.front());
            q.pop();
        }
        // Move all elements back from stack to queue (reversed order)
        while (!st.empty()) {
            q.push(st.top());
            st.pop();
        }
    }
};
