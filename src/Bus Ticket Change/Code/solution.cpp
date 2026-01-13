class Solution
{
public:
    bool canServe(vector<int> &arr)
    {
        int five = 0, ten = 0; // count of 5 and 10 coins

        for (int bill : arr)
        {
            if (bill == 5)
            {
                // No change needed
                five++;
            }
            else if (bill == 10)
            {
                // Need to give back 5
                if (five == 0)
                    return false;
                five--;
                ten++;
            }
            else
            { // bill == 20
                // Need to give back 15
                if (ten > 0 && five > 0)
                {
                    ten--;
                    five--;
                }
                else if (five >= 3)
                {
                    five -= 3;
                }
                else
                {
                    return false;
                }
            }
        }
        return true;
    }
};
