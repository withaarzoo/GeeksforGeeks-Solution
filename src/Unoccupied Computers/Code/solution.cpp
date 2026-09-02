class Solution
{
public:
    int solve(int n, string s)
    {
        // state[i] stores the status of customer with letter 'A' + i:
        // 0 = not seen yet, 1 = got a computer, 2 = was rejected.
        int state[26] = {0};

        // Initially, all n computers are free.
        int available = n;

        // This counts customers who arrived when no computer was free.
        int rejected = 0;

        // Process every customer event in chronological order.
        for (char ch : s)
        {
            // Convert the uppercase letter into an index from 0 to 25.
            int id = ch - 'A';

            // state 0 means this is the customer's first occurrence,
            // so this character represents an arrival.
            if (state[id] == 0)
            {
                // A free computer exists, so I assign it to this customer.
                if (available > 0)
                {
                    available--;   // One computer becomes occupied.
                    state[id] = 1; // Mark the customer as using a computer.
                }
                else
                {
                    // No computer is available, so this customer is rejected.
                    rejected++;

                    // Mark them as rejected so their second occurrence
                    // does not incorrectly free a computer.
                    state[id] = 2;
                }
            }
            else
            {
                // This is the customer's second occurrence, so they are leaving.
                // Only customers who actually got a computer can free one.
                if (state[id] == 1)
                {
                    available++; // Their computer becomes free.
                }
            }
        }

        // Return the total number of customers who were rejected.
        return rejected;
    }
};