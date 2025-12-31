class Solution:
    def isPalindrome(self, head):
        if head is None or head.next is None:
            return True

        slow = head
        fast = head

        # Find middle
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        # Reverse second half
        prev = None
        curr = slow

        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node

        # Compare both halves
        first = head
        second = prev

        while second:
            if first.data != second.data:
                return False
            first = first.next
            second = second.next

        return True
