class Solution
{
public:
    vector<Node *> findPreSuc(Node *root, int key)
    {
        Node *pre = NULL;
        Node *suc = NULL;

        while (root)
        {
            if (root->data < key)
            {
                // Possible predecessor
                pre = root;
                root = root->right;
            }
            else if (root->data > key)
            {
                // Possible successor
                suc = root;
                root = root->left;
            }
            else
            {
                // Found the key

                // Find predecessor (max in left subtree)
                Node *temp = root->left;
                while (temp)
                {
                    pre = temp;
                    temp = temp->right;
                }

                // Find successor (min in right subtree)
                temp = root->right;
                while (temp)
                {
                    suc = temp;
                    temp = temp->left;
                }
                break;
            }
        }

        return {pre, suc};
    }
};