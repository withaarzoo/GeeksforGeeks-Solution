class Solution
{
public:
    int n, m;
    vector<vector<int>> dir = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

    bool dfs(int i, int j, int idx, vector<vector<char>> &mat, string &word)
    {
        // If entire word is matched
        if (idx == word.size())
            return true;

        // Boundary check and character match check
        if (i < 0 || j < 0 || i >= n || j >= m || mat[i][j] != word[idx])
            return false;

        // Mark cell as visited
        char temp = mat[i][j];
        mat[i][j] = '#';

        // Explore all 4 directions
        for (auto &d : dir)
        {
            if (dfs(i + d[0], j + d[1], idx + 1, mat, word))
                return true;
        }

        // Backtrack
        mat[i][j] = temp;
        return false;
    }

    bool isWordExist(vector<vector<char>> &mat, string &word)
    {
        n = mat.size();
        m = mat[0].size();

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                if (dfs(i, j, 0, mat, word))
                    return true;
            }
        }
        return false;
    }
};
