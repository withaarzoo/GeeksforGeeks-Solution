class Solution
{
public:
    vector<vector<int>> searchWord(vector<vector<char>> &mat, string &word)
    {
        int n = mat.size();    // Store the number of rows in the matrix.
        int m = mat[0].size(); // Store the number of columns in the matrix.
        int k = word.size();   // Store the length of the word.

        vector<vector<int>> ans; // Store all valid starting coordinates.

        // These 8 pairs represent the 8 possible straight-line directions.
        int dr[] = {-1, -1, -1, 0, 0, 1, 1, 1};
        int dc[] = {-1, 0, 1, -1, 1, -1, 0, 1};

        // Visit every cell from top-left to bottom-right.
        // This also keeps the final coordinates lexicographically sorted.
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {

                // Only a cell containing the first character can start the word.
                if (mat[i][j] != word[0])
                {
                    continue; // Skip this cell when the first character does not match.
                }

                // Try all 8 possible directions from this starting cell.
                for (int d = 0; d < 8; d++)
                {
                    bool found = true; // Assume the word matches in this direction.

                    // Check every remaining character along the same direction.
                    for (int p = 1; p < k; p++)
                    {
                        int nr = i + p * dr[d]; // Calculate the row of the current character.
                        int nc = j + p * dc[d]; // Calculate the column of the current character.

                        // The position must be inside the matrix and its character must match.
                        if (nr < 0 || nr >= n || nc < 0 || nc >= m ||
                            mat[nr][nc] != word[p])
                        {
                            found = false; // This direction cannot form the word.
                            break;         // Stop checking this direction immediately.
                        }
                    }

                    // If all characters matched, this is a valid starting position.
                    if (found)
                    {
                        ans.push_back({i, j}); // Add the starting coordinate to the answer.
                        break;                 // No need to check other directions for this starting cell.
                    }
                }
            }
        }

        return ans; // Return all valid starting coordinates.
    }
};