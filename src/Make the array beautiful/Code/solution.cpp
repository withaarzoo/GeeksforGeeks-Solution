class Solution
{
public:
    vector<int> makeBeautiful(vector<int> arr)
    {

        // This vector will work like a stack
        vector<int> st;

        // Traverse every element of the array
        for (int num : arr)
        {

            // Check if stack is not empty
            // and current number has opposite sign
            // compared to the top element
            if (!st.empty() &&
                ((st.back() >= 0 && num < 0) ||
                 (st.back() < 0 && num >= 0)))
            {

                // Remove the previous element
                // because both cancel each other
                st.pop_back();
            }
            else
            {

                // Otherwise keep the current element
                st.push_back(num);
            }
        }

        // Final beautiful array
        return st;
    }
};