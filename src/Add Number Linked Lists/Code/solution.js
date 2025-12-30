class Solution {
  reverse(head) {
    let prev = null;
    while (head) {
      let nextNode = head.next;
      head.next = prev;
      prev = head;
      head = nextNode;
    }
    return prev;
  }

  addTwoLists(head1, head2) {
    head1 = this.reverse(head1);
    head2 = this.reverse(head2);

    let dummy = new Node(0);
    let curr = dummy;
    let carry = 0;

    while (head1 || head2 || carry) {
      let sum = carry;

      if (head1) {
        sum += head1.data;
        head1 = head1.next;
      }

      if (head2) {
        sum += head2.data;
        head2 = head2.next;
      }

      carry = Math.floor(sum / 10);
      curr.next = new Node(sum % 10);
      curr = curr.next;
    }

    let result = this.reverse(dummy.next);

    while (result.data === 0 && result.next) {
      result = result.next;
    }

    return result;
  }
}
