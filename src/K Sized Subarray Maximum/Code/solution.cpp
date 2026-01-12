class Solution
{
public:
    vector<int> maxOfSubarrays(vector<int> &arr, int k)
    {
        deque<int> dq; // stores indexes
        vector<int> result;

        for (int i = 0; i < arr.size(); i++)
        {

            // Remove elements that are out of this window
            if (!dq.empty() && dq.front() == i - k)
            {
                dq.pop_front();
            }

            // Remove smaller elements from the back
            while (!dq.empty() && arr[dq.back()] <= arr[i])
            {
                dq.pop_back();
            }

            // Add current index
            dq.push_back(i);

            // Window becomes valid when i >= k - 1
            if (i >= k - 1)
            {
                result.push_back(arr[dq.front()]);
            }
        }
        return result;
    }
};
