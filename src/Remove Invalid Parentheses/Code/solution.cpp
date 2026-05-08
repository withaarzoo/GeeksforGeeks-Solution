class Solution
{
public:
    // I use this to check if the parentheses are balanced
    bool isValid(string s)
    {
        int count = 0;
        for (char ch : s)
        {
            if (ch == '(')
            {
                count++;
            }
            else if (ch == ')')
            {
                count--;
                // If count is negative, we have a closing bracket without an opening one
                if (count < 0)
                    return false;
            }
        }
        return count == 0;
    }

    vector<string> validParenthesis(string s)
    {
        vector<string> ans;
        unordered_set<string> visited;
        queue<string> q;

        // Start with the original string
        q.push(s);
        visited.insert(s);

        bool found = false;

        while (!q.empty())
        {
            int size = q.size();

            for (int z = 0; z < size; z++)
            {
                string curr = q.front();
                q.pop();

                // If current string is valid, it's a candidate for the result
                if (isValid(curr))
                {
                    ans.push_back(curr);
                    found = true;
                }

                // If we found a valid string at this depth, we don't look deeper
                if (found)
                    continue;

                // Generate next level by removing one bracket at a time
                for (int i = 0; i < curr.size(); i++)
                {
                    if (curr[i] != '(' && curr[i] != ')')
                        continue;

                    string next = curr.substr(0, i) + curr.substr(i + 1);

                    if (visited.find(next) == visited.end())
                    {
                        visited.insert(next);
                        q.push(next);
                    }
                }
            }

            // Once the level is finished, if we found valid strings, we stop
            if (found)
                break;
        }

        return ans;
    }
};