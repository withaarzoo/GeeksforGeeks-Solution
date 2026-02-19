#include <vector>
#include <unordered_set>
using namespace std;

class Solution
{
public:
    vector<int> missinRange(vector<int> &arr, int low, int high)
    {
        vector<int> result;
        unordered_set<int> present;
        present.reserve(arr.size());

        // Add only numbers that lie inside [low, high] to the set
        for (int x : arr)
        {
            if (x >= low && x <= high)
                present.insert(x);
        }

        // Iterate through the full range and collect missing numbers
        for (int v = low; v <= high; ++v)
        {
            if (present.find(v) == present.end())
                result.push_back(v);
        }
        return result;
    }
};
