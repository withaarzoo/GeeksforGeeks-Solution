/* Structure of a Linked List node
class Node {
  public:
    int data;
    Node* next;

    Node(int x) {
        data = x;
        next = nullptr;
    }
};
*/
class Solution
{
public:
    // Reverse the linked list and return new head
    Node *reverseList(Node *head)
    {
        Node *prev = nullptr;
        Node *curr = head;

        while (curr)
        {
            Node *nextNode = curr->next; // store next node
            curr->next = prev;           // reverse current link
            prev = curr;                 // move prev forward
            curr = nextNode;             // move curr forward
        }

        return prev; // new head
    }

    Node *compute(Node *head)
    {

        // Reverse list so that right-side nodes become left-side nodes
        head = reverseList(head);

        int maxSoFar = head->data;
        Node *curr = head;

        while (curr && curr->next)
        {

            // Remove node if it is smaller than max seen so far
            if (curr->next->data < maxSoFar)
            {
                curr->next = curr->next->next;
            }
            else
            {
                curr = curr->next;
                maxSoFar = curr->data;
            }
        }

        // Restore original order
        return reverseList(head);
    }
};