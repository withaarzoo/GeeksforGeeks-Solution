class Solution
{
public:
    Node *intersectPoint(Node *head1, Node *head2)
    {
        Node *p1 = head1;
        Node *p2 = head2;

        // Traverse both lists
        while (p1 != p2)
        {
            // If p1 reaches end, switch to head2
            p1 = (p1 == NULL) ? head2 : p1->next;

            // If p2 reaches end, switch to head1
            p2 = (p2 == NULL) ? head1 : p2->next;
        }

        // p1 (or p2) is the intersection node
        return p1;
    }
};
