/* Structure of binary tree node
class Node{
public:
    int data;
    Node* left, right;
    Node(int item)
    {
        data = item;
        left = nullptr;
        right = nullptr;
    }
}
*/
class Solution
{
public:
    // DFS function to traverse the tree
    void dfs(Node *root, int col, map<int, int> &mp)
    {

        // If node is null, simply return
        if (root == nullptr)
            return;

        // Add current node value into its vertical column sum
        mp[col] += root->data;

        // Move left with column -1
        dfs(root->left, col - 1, mp);

        // Move right with column +1
        dfs(root->right, col + 1, mp);
    }

    vector<int> verticalSum(Node *root)
    {

        // Map stores:
        // key   -> vertical column
        // value -> sum of nodes in that column
        map<int, int> mp;

        // Start DFS from root at column 0
        dfs(root, 0, mp);

        vector<int> ans;

        // Map automatically keeps keys sorted
        // So values come from left-most to right-most
        for (auto it : mp)
        {
            ans.push_back(it.second);
        }

        return ans;
    }
};