class Solution
{
public:
    int minThrows(int n, vector<int> &lad, vector<int> &sn)
    {
        int total = n * n; // The last cell of the board is n*n.

        vector<int> jump(total + 1, 0); // Stores the destination of every snake or ladder.

        // Store all ladders as direct jumps from their starting cell.
        for (int i = 0; i < (int)lad.size(); i += 2)
        {
            jump[lad[i]] = lad[i + 1]; // From the ladder start, immediately move to its end.
        }

        // Store all snakes as direct jumps from their starting cell.
        for (int i = 0; i < (int)sn.size(); i += 2)
        {
            jump[sn[i]] = sn[i + 1]; // From the snake start, immediately move to its end.
        }

        vector<bool> visited(total + 1, false); // Prevents processing the same cell multiple times.
        queue<pair<int, int>> q;                // Stores {cell, number of throws used} for BFS.

        q.push({1, 0});    // Start from cell 1 with zero dice throws.
        visited[1] = true; // Mark the starting cell as already visited.

        while (!q.empty())
        {
            auto [cell, throws] = q.front(); // Get the current cell and its distance.
            q.pop();                         // Remove the current state from the queue.

            if (cell == total)
            {
                return throws; // Reaching the final cell gives the minimum number of throws.
            }

            // Try every possible dice result from 1 to 6.
            for (int dice = 1; dice <= 6; ++dice)
            {
                int next = cell + dice; // Move forward according to the chosen dice value.

                if (next > total)
                {
                    continue; // We cannot move beyond the final cell.
                }

                if (jump[next] != 0)
                {
                    next = jump[next]; // Immediately take the snake or ladder after landing.
                }

                if (!visited[next])
                {
                    visited[next] = true;       // Mark the cell before adding it to avoid duplicates.
                    q.push({next, throws + 1}); // One more dice throw is needed to reach this cell.
                }
            }
        }

        return -1; // The final cell cannot be reached.
    }
};