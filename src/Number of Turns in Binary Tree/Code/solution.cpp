/* Structure of Binary Tree Node
class Node {
  public:
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = right = nullptr;
    }
}; */

class Solution
{
    // This DFS finds a target and stores the L/R path from root to that target.
    bool findPath(Node *root, int target, vector<char> &path)
    {
        // If this subtree is empty, the target cannot be found here.
        if (root == nullptr)
            return false;

        // If I reached the target, the current path is the required path.
        if (root->data == target)
            return true;

        // Record a left move before searching the left subtree.
        path.push_back('L');

        // Keep the move only if the target exists in the left subtree.
        if (findPath(root->left, target, path))
            return true;

        // Remove the failed left move before trying another direction.
        path.pop_back();

        // Record a right move before searching the right subtree.
        path.push_back('R');

        // Keep the move only if the target exists in the right subtree.
        if (findPath(root->right, target, path))
            return true;

        // Remove the failed right move because this subtree also did not contain the target.
        path.pop_back();

        // Tell the parent call that the target was not found here.
        return false;
    }

public:
    int numberOfTurns(Node *root, int p, int q)
    {
        // Store the directions from root to p and root to q.
        vector<char> pathP, pathQ;

        // Build both root-to-node paths.
        findPath(root, p, pathP);
        findPath(root, q, pathQ);

        // Find the length of the common prefix, which represents the path to the LCA.
        int i = 0;
        while (i < pathP.size() && i < pathQ.size() &&
               pathP[i] == pathQ[i])
        {
            i++;
        }

        // Store the exact sequence of edge directions while travelling from p to q.
        vector<char> path;

        // Travel upward from p to the LCA, so reverse p's remaining directions.
        for (int j = (int)pathP.size() - 1; j >= i; j--)
        {
            path.push_back(pathP[j]);
        }

        // Then travel downward from the LCA to q using q's remaining directions.
        for (int j = i; j < pathQ.size(); j++)
        {
            path.push_back(pathQ[j]);
        }

        // A path with fewer than two edges cannot contain a turn.
        if (path.size() < 2)
            return -1;

        // Count every change between consecutive L and R directions.
        int turns = 0;
        for (int j = 1; j < path.size(); j++)
        {
            if (path[j] != path[j - 1])
            {
                turns++;
            }
        }

        // Return -1 when the complete path continues in only one direction.
        return turns == 0 ? -1 : turns;
    }
};