#include <unordered_map>
using namespace std;

/*
class Node {
  public:
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = right = NULL;
    }
};
*/

class Solution
{
public:
    int dfs(Node *node, long currSum, int k, unordered_map<long, int> &mp)
    {
        if (!node)
            return 0;

        currSum += node->data;
        int count = 0;

        // If current prefix sum itself equals k
        if (currSum == k)
            count++;

        // Check if (currSum - k) exists
        if (mp.count(currSum - k))
            count += mp[currSum - k];

        // Store current prefix sum
        mp[currSum]++;

        // Traverse children
        count += dfs(node->left, currSum, k, mp);
        count += dfs(node->right, currSum, k, mp);

        // Backtrack
        mp[currSum]--;

        return count;
    }

    int countAllPaths(Node *root, int k)
    {
        unordered_map<long, int> mp;
        return dfs(root, 0, k, mp);
    }
};