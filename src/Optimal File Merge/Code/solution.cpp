class Solution {
  public:
    int minComputation(vector<int> &files) {
        priority_queue<int, vector<int>, greater<int>> pq;
        for (int f : files) pq.push(f);
        long long cost = 0;
        while (pq.size() > 1) {
            int a = pq.top(); pq.pop();
            int b = pq.top(); pq.pop();
            int sum = a + b;
            cost += sum;
            pq.push(sum);
        }
        return (int)cost;
    }
};