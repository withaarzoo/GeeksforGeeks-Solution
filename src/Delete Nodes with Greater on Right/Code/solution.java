/* Structure of linked list node
class Node {

    int data;
    Node next;

    Node(int d) {
        data = d;
        next = null;
    }
}
*/
class Solution {

    // Reverse linked list
    Node reverseList(Node head) {
        Node prev = null;
        Node curr = head;

        while (curr != null) {
            Node nextNode = curr.next; // store next node
            curr.next = prev; // reverse link
            prev = curr; // move prev
            curr = nextNode; // move curr
        }

        return prev;
    }

    Node compute(Node head) {

        // Reverse list first
        head = reverseList(head);

        int maxSoFar = head.data;
        Node curr = head;

        while (curr != null && curr.next != null) {

            // Delete smaller node
            if (curr.next.data < maxSoFar) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
                maxSoFar = curr.data;
            }
        }

        // Reverse back to original order
        return reverseList(head);
    }
}