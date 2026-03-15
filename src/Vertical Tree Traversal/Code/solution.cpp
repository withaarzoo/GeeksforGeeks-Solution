/*
class Node {
  public:
    int data;
    Node* left;
    Node* right;

    Node(int val) {
        data = val;
        left = NULL;
        right = NULL;
    }
};
*/

class Solution
{
public:
    vector<vector<int>> verticalOrder(Node *root)
    {

        vector<vector<int>> result;
        if (!root)
            return result;

        // Map to store nodes grouped by horizontal distance
        map<int, vector<int>> mp;

        // Queue for BFS traversal
        queue<pair<Node *, int>> q;

        // Start with root at horizontal distance 0
        q.push({root, 0});

        while (!q.empty())
        {

            auto front = q.front();
            q.pop();

            Node *node = front.first;
            int hd = front.second;

            // Store node value in map
            mp[hd].push_back(node->data);

            // Push left child with hd - 1
            if (node->left)
                q.push({node->left, hd - 1});

            // Push right child with hd + 1
            if (node->right)
                q.push({node->right, hd + 1});
        }

        // Build final result from map
        for (auto &it : mp)
        {
            result.push_back(it.second);
        }

        return result;
    }
};