class Solution
{
public:
    vector<int> findUnion(vector<int> &a, vector<int> &b)
    {
        // Using unordered_set to store unique elements
        unordered_set<int> st;

        // Insert all elements of array a into the set
        for (int i = 0; i < a.size(); i++)
        {
            st.insert(a[i]);
        }

        // Insert all elements of array b into the same set
        for (int i = 0; i < b.size(); i++)
        {
            st.insert(b[i]);
        }

        // Convert set to vector
        vector<int> result(st.begin(), st.end());

        return result;
    }
};