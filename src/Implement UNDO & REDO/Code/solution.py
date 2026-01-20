class Solution:
    def __init__(self):
        self.doc = []
        self.redo_stack = []

    def append(self, x):
        self.doc.append(x)
        # Clear redo history on new change
        self.redo_stack.clear()

    def undo(self):
        if self.doc:
            self.redo_stack.append(self.doc.pop())

    def redo(self):
        if self.redo_stack:
            self.doc.append(self.redo_stack.pop())

    def read(self):
        return "".join(self.doc)
