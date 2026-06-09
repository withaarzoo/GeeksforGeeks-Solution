class Solution
{
public:
    bool canSeatAllPeople(int k, vector<int> &seats)
    {
        int n = seats.size();

        // No people need to be seated
        if (k == 0)
            return true;

        // Check every seat once
        for (int i = 0; i < n; i++)
        {

            // Skip if already occupied
            if (seats[i] == 1)
                continue;

            // Check left neighbor
            bool leftEmpty = (i == 0 || seats[i - 1] == 0);

            // Check right neighbor
            bool rightEmpty = (i == n - 1 || seats[i + 1] == 0);

            // If both sides are safe, seat a person here
            if (leftEmpty && rightEmpty)
            {
                seats[i] = 1; // Mark seat as occupied
                k--;          // One person seated

                // If everyone is seated, return true
                if (k == 0)
                    return true;
            }
        }

        // Not enough valid seats found
        return false;
    }
};