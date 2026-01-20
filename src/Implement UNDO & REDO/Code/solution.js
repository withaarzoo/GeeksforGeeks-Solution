class Solution {
  constructor() {
    this.doc = [];
    this.redoStack = [];
  }

  append(x) {
    this.doc.push(x);
    this.redoStack = []; // Clear redo history
  }

  undo() {
    if (this.doc.length > 0) {
      this.redoStack.push(this.doc.pop());
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      this.doc.push(this.redoStack.pop());
    }
  }

  read() {
    return this.doc.join("");
  }
}
