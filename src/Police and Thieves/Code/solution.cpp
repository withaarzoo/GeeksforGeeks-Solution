class Solution
{
public:
    int catchThieves(vector<char> &arr, int k)
    {
        vector<int> police, thieves;

        // Store positions of police and thieves
        for (int i = 0; i < arr.size(); i++)
        {
            if (arr[i] == 'P')
                police.push_back(i);
            else
                thieves.push_back(i);
        }

        int i = 0, j = 0, count = 0;

        // Two pointer matching
        while (i < police.size() && j < thieves.size())
        {
            if (abs(police[i] - thieves[j]) <= k)
            {
                // Valid match
                count++;
                i++;
                j++;
            }
            else if (thieves[j] < police[i])
            {
                // Thief is too far left
                j++;
            }
            else
            {
                // Thief is too far right
                i++;
            }
        }

        return count;
    }
};
