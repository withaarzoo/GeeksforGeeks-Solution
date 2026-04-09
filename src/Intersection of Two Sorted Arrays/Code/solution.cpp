class Solution
{
public:
    vector<int> intersection(vector<int> &a, vector<int> &b)
    {
        vector<int> ans;

        int i = 0, j = 0;
        int n = a.size(), m = b.size();

        while (i < n && j < m)
        {

            // If current element in a is smaller, move i
            if (a[i] < b[j])
            {
                i++;
            }

            // If current element in b is smaller, move j
            else if (a[i] > b[j])
            {
                j++;
            }

            // If both elements are equal
            else
            {
                ans.push_back(a[i]);

                int current = a[i];

                // Skip duplicates in array a
                while (i < n && a[i] == current)
                {
                    i++;
                }

                // Skip duplicates in array b
                while (j < m && b[j] == current)
                {
                    j++;
                }
            }
        }

        return ans;
    }
};