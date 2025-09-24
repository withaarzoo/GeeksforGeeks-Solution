/* C++ implementation */
#include <bits/stdc++.h>
using namespace std;

class SpecialQueue {
public:
    queue<int> q;         // main queue for FIFO
    deque<int> minD;      // monotonic increasing deque for minima
    deque<int> maxD;      // monotonic decreasing deque for maxima

    SpecialQueue() {}

    // Insert element x at rear
    void enqueue(int x) {
        q.push(x);
        // maintain min deque (increasing)
        while (!minD.empty() && minD.back() > x) minD.pop_back();
        minD.push_back(x);
        // maintain max deque (decreasing)
        while (!maxD.empty() && maxD.back() < x) maxD.pop_back();
        maxD.push_back(x);
    }

    // Remove element from front
    void dequeue() {
        if (q.empty()) return;            // nothing to do if empty
        int v = q.front(); q.pop();
        if (!minD.empty() && minD.front() == v) minD.pop_front();
        if (!maxD.empty() && maxD.front() == v) maxD.pop_front();
    }

    // Get front element
    int getFront() {
        if (q.empty()) return -1;         // or throw
        return q.front();
    }

    // Get minimum element
    int getMin() {
        if (minD.empty()) return -1;
        return minD.front();
    }

    // Get maximum element
    int getMax() {
        if (maxD.empty()) return -1;
        return maxD.front();
    }
};
