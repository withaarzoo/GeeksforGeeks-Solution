class Solution
{
public:
    int maxArea(vector<vector<int>> &mat)
    {
        // I store the number of consecutive 1s ending at the current row
        // for every column, so the size is equal to the number of columns.
        int n = mat.size();
        int m = mat[0].size();
        vector<int> height(m, 0);

        // I keep this variable to store the largest rectangle area found.
        int answer = 0;

        // I process every row because each row can act as the bottom
        // boundary of a possible rectangle.
        for (int i = 0; i < n; i++)
        {

            // I create a frequency array where count[h] tells me how many
            // columns currently have consecutive height h.
            vector<int> count(n + 1, 0);

            // I update the consecutive height of every column.
            for (int j = 0; j < m; j++)
            {
                // A 1 continues the vertical sequence, while a 0 breaks it.
                if (mat[i][j] == 1)
                {
                    height[j]++;
                }
                else
                {
                    height[j] = 0;
                }

                // I count this height so I can process heights without sorting.
                count[height[j]]++;
            }

            // I store how many columns can be included after arranging
            // the column heights from largest to smallest.
            int width = 0;

            // I check larger heights first because columns can be swapped
            // to place all taller columns together.
            for (int h = n; h >= 1; h--)
            {
                // All columns with height h can extend the current width.
                width += count[h];

                // The shortest selected column has height h, so it limits
                // the rectangle height, while width is the rectangle width.
                answer = max(answer, h * width);
            }
        }

        // I return the largest area found across all possible bottom rows.
        return answer;
    }
};