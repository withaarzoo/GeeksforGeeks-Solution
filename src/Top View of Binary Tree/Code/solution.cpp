/*
class Node {
  public:
    int data;
    Node* left;
    Node* right;

    Node(int val) {
        data = val;
        left = nullptr;
        right = nullptr;
    }
};
*/

class Solution
{
public:
    vector<int> topView(Node *root)
    {

        vector<int> result;
        if (root == NULL)
            return result;

        // Map to store first node for each horizontal distance
        map<int, int> mp;

        // Queue for BFS: (node, horizontal distance)
        queue<pair<Node *, int>> q;
        q.push({root, 0});

        while (!q.empty())
        {

            auto it = q.front();
            q.pop();

            Node *node = it.first;
            int hd = it.second;

            // If this HD is seen first time, store it
            if (mp.find(hd) == mp.end())
                mp[hd] = node->data;

            if (node->left)
                q.push({node->left, hd - 1});

            if (node->right)
                q.push({node->right, hd + 1});
        }

        // Extract result from map
        for (auto it : mp)
            result.push_back(it.second);

        return result;
    }
};