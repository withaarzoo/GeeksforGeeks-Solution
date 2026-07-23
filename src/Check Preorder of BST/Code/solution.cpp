class Solution {
  public:
    bool canRepresentBST(vector<int> &arr) {
        // Stack stores ancestors whose right subtree is not processed yet
        stack<int> st;

        // Every upcoming node must be greater than this value
        int lowerBound = INT_MIN;

        // Traverse every node in preorder
        for (int value : arr) {

            // If current value violates the BST property,
            // preorder cannot represent any BST
            if (value < lowerBound)
                return false;

            // If current value is greater than stack top,
            // we are moving to the right subtree
            while (!st.empty() && value > st.top()) {

                // Update the latest ancestor that becomes
                // the new lower limit
                lowerBound = st.top();

                // Remove it because its right subtree starts now
                st.pop();
            }

            // Store current node for future comparisons
            st.push(value);
        }

        // Entire preorder is valid
        return true;
    }
};