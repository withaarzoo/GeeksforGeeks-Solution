class Solution
{
public:
    // Helper function to merge two sorted bottom-linked lists
    Node *merge(Node *a, Node *b)
    {
        // Base cases
        if (!a)
            return b;
        if (!b)
            return a;

        Node *result;

        // Pick the smaller node and merge recursively
        if (a->data < b->data)
        {
            result = a;
            result->bottom = merge(a->bottom, b);
        }
        else
        {
            result = b;
            result->bottom = merge(a, b->bottom);
        }

        // We do not need next pointer anymore
        result->next = NULL;
        return result;
    }

    Node *flatten(Node *root)
    {
        // Base case
        if (!root || !root->next)
            return root;

        // Recursively flatten the right list
        root->next = flatten(root->next);

        // Merge current list with the flattened right list
        root = merge(root, root->next);

        return root;
    }
};
