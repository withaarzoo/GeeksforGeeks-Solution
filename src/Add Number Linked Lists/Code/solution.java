class Solution {

    private Node reverse(Node head) {
        Node prev = null;
        while (head != null) {
            Node nextNode = head.next;
            head.next = prev;
            prev = head;
            head = nextNode;
        }
        return prev;
    }

    public Node addTwoLists(Node head1, Node head2) {
        head1 = reverse(head1);
        head2 = reverse(head2);

        Node dummy = new Node(0);
        Node curr = dummy;
        int carry = 0;

        while (head1 != null || head2 != null || carry != 0) {
            int sum = carry;

            if (head1 != null) {
                sum += head1.data;
                head1 = head1.next;
            }

            if (head2 != null) {
                sum += head2.data;
                head2 = head2.next;
            }

            carry = sum / 10;
            curr.next = new Node(sum % 10);
            curr = curr.next;
        }

        Node result = reverse(dummy.next);

        while (result != null && result.data == 0 && result.next != null) {
            result = result.next;
        }

        return result;
    }
}
