class Solution
{
public:
    vector<int> reducePairs(vector<int> &arr)
    {
        vector<int> st; // acts as stack

        for (int x : arr)
        {
            bool alive = true;

            while (!st.empty() && alive && (st.back() * x < 0))
            {
                int top = st.back();

                if (abs(top) == abs(x))
                {
                    // both removed
                    st.pop_back();
                    alive = false;
                }
                else if (abs(top) > abs(x))
                {
                    // current gets destroyed
                    alive = false;
                }
                else
                {
                    // stack top gets destroyed
                    st.pop_back();
                }
            }

            if (alive)
                st.push_back(x);
        }

        return st;
    }
};