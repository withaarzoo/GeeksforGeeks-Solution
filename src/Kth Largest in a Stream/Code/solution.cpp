class Solution
{
public:
    vector<int> kthLargest(vector<int> &arr, int k)
    {
        // min-heap to store the k largest elements seen so far
        priority_queue<int, vector<int>, greater<int>> minHeap;

        vector<int> result;

        for (int num : arr)
        {
            minHeap.push(num); // add current element to heap

            // if heap grows beyond k, remove the smallest element
            // because we only care about the top k largest
            if ((int)minHeap.size() > k)
            {
                minHeap.pop();
            }

            // if we have fewer than k elements, kth largest doesn't exist yet
            if ((int)minHeap.size() < k)
            {
                result.push_back(-1);
            }
            else
            {
                // top of min-heap is the kth largest element
                result.push_back(minHeap.top());
            }
        }

        return result;
    }
};