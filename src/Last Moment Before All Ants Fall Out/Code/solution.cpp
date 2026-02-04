class Solution
{
public:
    int getLastMoment(int n, vector<int> &left, vector<int> &right)
    {
        int ans = 0;

        // Ants moving to the left
        for (int pos : left)
        {
            ans = max(ans, pos);
        }

        // Ants moving to the right
        for (int pos : right)
        {
            ans = max(ans, n - pos);
        }

        return ans;
    }
};
