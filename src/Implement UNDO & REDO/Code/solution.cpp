class Solution {
private:
    string doc;              // Stores current document
    stack<char> redoStack;   // Stores undone characters

public:
    void append(char x) {
        doc.push_back(x);
        // New change invalidates redo history
        while (!redoStack.empty()) redoStack.pop();
    }

    void undo() {
        if (!doc.empty()) {
            redoStack.push(doc.back());
            doc.pop_back();
        }
    }

    void redo() {
        if (!redoStack.empty()) {
            doc.push_back(redoStack.top());
            redoStack.pop();
        }
    }

    string read() {
        return doc;
    }
};
