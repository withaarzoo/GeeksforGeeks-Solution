class Solution
{
public:
    bool checkElements(int start, int end, vector<int> &arr)
    {

        // Store all array elements inside a set
        unordered_set<int> st;

        for (int num : arr)
        {
            st.insert(num);
        }

        // Check every number from start to end
        for (int i = start; i <= end; i++)
        {

            // If any number is missing, return false
            if (st.find(i) == st.end())
            {
                return false;
            }
        }

        // All numbers are present
        return true;
    }
};