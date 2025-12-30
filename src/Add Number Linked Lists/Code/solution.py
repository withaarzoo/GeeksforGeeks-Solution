class Solution:
    def reverse(self, head):
        prev = None
        while head:
            next_node = head.next
            head.next = prev
            prev = head
            head = next_node
        return prev

    def addTwoLists(self, head1, head2):
        head1 = self.reverse(head1)
        head2 = self.reverse(head2)

        dummy = Node(0)
        curr = dummy
        carry = 0

        while head1 or head2 or carry:
            total = carry

            if head1:
                total += head1.data
                head1 = head1.next

            if head2:
                total += head2.data
                head2 = head2.next

            carry = total // 10
            curr.next = Node(total % 10)
            curr = curr.next

        result = self.reverse(dummy.next)

        while result.data == 0 and result.next:
            result = result.next

        return result
