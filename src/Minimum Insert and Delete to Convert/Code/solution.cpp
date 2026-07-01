class Solution
{
public:
    int minInsAndDel(vector<int> &a, vector<int> &b)
    {
        // Store the index of every value present in b
        unordered_map<int, int> pos;
        for (int i = 0; i < b.size(); i++)
        {
            pos[b[i]] = i;
        }

        // Store indices of elements from a that also exist in b
        vector<int> mapped;
        for (int x : a)
        {
            if (pos.count(x))
            {
                mapped.push_back(pos[x]);
            }
        }

        // Compute LIS on the mapped indices
        vector<int> lis;
        for (int idx : mapped)
        {
            // Find the first position where idx can be placed
            auto it = lower_bound(lis.begin(), lis.end(), idx);

            if (it == lis.end())
            {
                // Extend the LIS if idx is the largest so far
                lis.push_back(idx);
            }
            else
            {
                // Replace to keep future possibilities better
                *it = idx;
            }
        }

        // Elements not in LIS must be deleted or inserted
        return (a.size() - lis.size()) + (b.size() - lis.size());
    }
};