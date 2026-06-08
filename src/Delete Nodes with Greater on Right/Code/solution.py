'''
Structure of linked list node
class Node:
    def __init__(self,x):
        self.data=x
        self.next=None

'''
class Solution:
    
    # Reverse linked list and return new head
    def reverseList(self, head):
        prev = None
        curr = head

        while curr:
            next_node = curr.next   # store next node
            curr.next = prev        # reverse link
            prev = curr             # move prev
            curr = next_node        # move curr

        return prev

    def compute(self, head):

        # Reverse the linked list
        head = self.reverseList(head)

        max_so_far = head.data
        curr = head

        while curr and curr.next:

            # Delete node if it is smaller than maximum seen so far
            if curr.next.data < max_so_far:
                curr.next = curr.next.next
            else:
                curr = curr.next
                max_so_far = curr.data

        # Reverse again to restore original order
        return self.reverseList(head)