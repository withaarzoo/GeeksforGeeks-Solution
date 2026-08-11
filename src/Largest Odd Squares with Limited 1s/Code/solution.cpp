class Solution
{
public:
    vector<int> largestSquare(vector<vector<int>> &mat, vector<vector<int>> &queries,
                              int k)
    {
        int n = mat.size();    // Store the number of rows.
        int m = mat[0].size(); // Store the number of columns.

        // prefix[i][j] stores the number of 1s in the first
        // i rows and first j columns of the matrix.
        // The extra row and column make boundary calculations easier.
        vector<vector<int>> prefix(n + 1, vector<int>(m + 1, 0));

        // Build the 2D prefix sum.
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                // Add the current cell and the upper and left areas,
                // then subtract the overlapping area counted twice.
                prefix[i][j] = mat[i - 1][j - 1] + prefix[i - 1][j] + prefix[i][j - 1] - prefix[i - 1][j - 1];
            }
        }

        // Return the number of 1s inside the rectangle
        // from (r1, c1) to (r2, c2), inclusive.
        auto getSum = [&](int r1, int c1, int r2, int c2)
        {
            // Shift matrix coordinates by one because
            // prefix has an extra row and column.
            r1++;
            c1++;
            r2++;
            c2++;

            // Use inclusion-exclusion to calculate the rectangle sum.
            return prefix[r2][c2] - prefix[r1 - 1][c2] - prefix[r2][c1 - 1] + prefix[r1 - 1][c1 - 1];
        };

        vector<int> answer;             // Store the answer for every query.
        answer.reserve(queries.size()); // Avoid unnecessary reallocations.

        // Process every query independently.
        for (auto &query : queries)
        {
            int i = query[0]; // Row of the center.
            int j = query[1]; // Column of the center.

            // Find the largest radius that keeps the square
            // completely inside the matrix.
            int maxRadius = min({i, j, n - 1 - i, m - 1 - j});

            int low = 0;          // Smallest possible radius.
            int high = maxRadius; // Largest possible radius.
            int best = -1;        // -1 means no valid square exists yet.

            // Binary search for the largest valid radius.
            while (low <= high)
            {
                int mid = low + (high - low) / 2;

                // Calculate the four boundaries of the square
                // centered at (i, j) with radius mid.
                int r1 = i - mid;
                int c1 = j - mid;
                int r2 = i + mid;
                int c2 = j + mid;

                // Count the number of 1s in this square in O(1).
                int ones = getSum(r1, c1, r2, c2);

                if (ones <= k)
                {
                    // This square is valid, so save this radius
                    // and try to find an even larger valid square.
                    best = mid;
                    low = mid + 1;
                }
                else
                {
                    // This square contains too many 1s,
                    // so every larger radius is also invalid.
                    high = mid - 1;
                }
            }

            // Convert the radius into the odd side length.
            // If best is -1, this correctly produces -1.
            answer.push_back(2 * best + 1);
        }

        return answer; // Return all query answers.
    }
};