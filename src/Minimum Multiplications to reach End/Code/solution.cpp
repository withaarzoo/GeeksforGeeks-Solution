class Solution
{
public:
    int minSteps(vector<int> &arr, int start, int end)
    {

        // If start is already equal to end
        if (start == end)
            return 0;

        // Distance array to store minimum steps
        vector<int> dist(1000, 1e9);

        // Queue for BFS
        queue<int> q;

        // Starting point needs 0 steps
        dist[start] = 0;
        q.push(start);

        // BFS traversal
        while (!q.empty())
        {

            // Get current number
            int current = q.front();
            q.pop();

            // Try multiplying with every element
            for (int num : arr)
            {

                // Generate next state
                int next = (current * num) % 1000;

                // If found shorter path
                if (dist[current] + 1 < dist[next])
                {

                    // Update distance
                    dist[next] = dist[current] + 1;

                    // If end reached, return answer
                    if (next == end)
                        return dist[next];

                    // Push new state into queue
                    q.push(next);
                }
            }
        }

        // End cannot be reached
        return -1;
    }
};