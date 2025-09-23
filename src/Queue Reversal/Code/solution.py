# I assume q is a queue-like object that supports q.empty(), q.get(), q.put()
# (e.g., queue.Queue). If q is a collections.deque, you can adapt by using
# popleft() and append() instead.

class Solution:
    def reverseQueue(self, q):
        # If queue is None or has <=1 items, nothing to do.
        try:
            empty = q.empty()
        except Exception:
            # Fallback: if q is a deque/list, handle differently
            # If it's a deque:
            from collections import deque
            if isinstance(q, deque):
                if len(q) <= 1:
                    return
                st = []
                while q:
                    st.append(q.popleft())
                while st:
                    q.append(st.pop())
                return
            # If it's a plain list representing queue (front at index 0)
            if isinstance(q, list):
                if len(q) <= 1:
                    return
                st = []
                while q:
                    st.append(q.pop(0))
                while st:
                    q.append(st.pop())
                return
            # If unknown interface, just return
            return

        # If we reached here, q supports empty(), get(), put()
        if q.empty():
            return

        st = []
        # Dequeue all items into the stack
        while not q.empty():
            st.append(q.get())
        # Enqueue back from stack (reversed order)
        while st:
            q.put(st.pop())
