import java.util.Stack;

class Solution {
    private StringBuilder doc = new StringBuilder();
    private Stack<Character> redoStack = new Stack<>();

    public void append(char x) {
        doc.append(x);
        redoStack.clear(); // Clear redo history
    }

    public void undo() {
        if (doc.length() > 0) {
            redoStack.push(doc.charAt(doc.length() - 1));
            doc.deleteCharAt(doc.length() - 1);
        }
    }

    public void redo() {
        if (!redoStack.isEmpty()) {
            doc.append(redoStack.pop());
        }
    }

    public String read() {
        return doc.toString();
    }
}
