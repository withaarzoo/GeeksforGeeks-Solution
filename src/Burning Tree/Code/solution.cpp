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
    // Step 1: Create parent mapping + find target node
    Node *markParents(Node *root, unordered_map<Node *, Node *> &parent, int target)
    {
        queue<Node *> q;
        q.push(root);

        Node *targetNode = NULL;

        while (!q.empty())
        {
            Node *curr = q.front();
            q.pop();

            if (curr->data == target)
            {
                targetNode = curr;
            }

            if (curr->left)
            {
                parent[curr->left] = curr;
                q.push(curr->left);
            }

            if (curr->right)
            {
                parent[curr->right] = curr;
                q.push(curr->right);
            }
        }

        return targetNode;
    }

    int minTime(Node *root, int target)
    {

        unordered_map<Node *, Node *> parent;

        // get target node
        Node *targetNode = markParents(root, parent, target);

        // Step 2: BFS to burn tree
        unordered_map<Node *, bool> visited;
        queue<Node *> q;

        q.push(targetNode);
        visited[targetNode] = true;

        int time = 0;

        while (!q.empty())
        {
            int size = q.size();
            bool burned = false;

            for (int i = 0; i < size; i++)
            {
                Node *curr = q.front();
                q.pop();

                // left
                if (curr->left && !visited[curr->left])
                {
                    burned = true;
                    visited[curr->left] = true;
                    q.push(curr->left);
                }

                // right
                if (curr->right && !visited[curr->right])
                {
                    burned = true;
                    visited[curr->right] = true;
                    q.push(curr->right);
                }

                // parent
                if (parent[curr] && !visited[parent[curr]])
                {
                    burned = true;
                    visited[parent[curr]] = true;
                    q.push(parent[curr]);
                }
            }

            if (burned)
                time++;
        }

        return time;
    }
};