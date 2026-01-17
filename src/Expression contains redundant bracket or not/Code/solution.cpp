class Solution
{
public:
    bool checkRedundancy(string &s)
    {
        stack<char> st;

        for (char ch : s)
        {
            // Push everything except closing bracket
            if (ch != ')')
            {
                st.push(ch);
            }
            else
            {
                // Found ')', now check inside brackets
                bool hasOperator = false;

                while (!st.empty() && st.top() != '(')
                {
                    char top = st.top();
                    st.pop();

                    // Check for operator
                    if (top == '+' || top == '-' || top == '*' || top == '/')
                    {
                        hasOperator = true;
                    }
                }

                // Remove '('
                if (!st.empty())
                    st.pop();

                // If no operator found, brackets are redundant
                if (!hasOperator)
                    return true;
            }
        }
        return false;
    }
};
