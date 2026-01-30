class Solution
{
public:
    void rearrangeQueue(queue<int> &q)
    {
        int n = q.size();

        // Queue to store first half elements
        queue<int> firstHalf;

        // Step 1: Move first n/2 elements to firstHalf
        for (int i = 0; i < n / 2; i++)
        {
            firstHalf.push(q.front());
            q.pop();
        }

        // Step 2: Interleave first half and second half
        while (!firstHalf.empty())
        {
            q.push(firstHalf.front());
            firstHalf.pop();

            q.push(q.front());
            q.pop();
        }
    }
};
