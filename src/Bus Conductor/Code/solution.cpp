class Solution
{
public:
    int findMoves(vector<int> &chairs, vector<int> &passengers)
    {
        // Step 1: Sort both arrays
        sort(chairs.begin(), chairs.end());
        sort(passengers.begin(), passengers.end());

        long long moves = 0;

        // Step 2: Match each passenger with a chair
        for (int i = 0; i < chairs.size(); i++)
        {
            moves += abs(chairs[i] - passengers[i]);
        }

        return moves;
    }
};
