class Solution
{
public:
    bool isPalindrome(Node *head)
    {
        // Edge cases: empty list or single node
        if (head == NULL || head->next == NULL)
            return true;

        // Step 1: Find the middle using slow & fast pointers
        Node *slow = head;
        Node *fast = head;

        while (fast != NULL && fast->next != NULL)
        {
            slow = slow->next;
            fast = fast->next->next;
        }

        // Step 2: Reverse the second half
        Node *prev = NULL;
        Node *curr = slow;

        while (curr != NULL)
        {
            Node *nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }

        // Step 3: Compare both halves
        Node *first = head;
        Node *second = prev;

        while (second != NULL)
        {
            if (first->data != second->data)
                return false;

            first = first->next;
            second = second->next;
        }

        return true;
    }
};
