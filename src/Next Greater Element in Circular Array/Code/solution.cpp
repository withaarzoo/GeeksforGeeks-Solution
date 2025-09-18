#include <iostream>
#include <vector>
#include <stack>

class Solution {
public:
    std::vector<int> nextGreater(std::vector<int> &arr) {
        int n = arr.size();
        std::vector<int> result(n, -1);  // Initialize result array with -1
        std::stack<int> st;  // Stack to store indices
        
        // Traverse the array twice to handle circular nature
        for (int i = 0; i < 2 * n; i++) {
            int currentIndex = i % n;  // Get actual array index
            int currentElement = arr[currentIndex];
            
            // Pop elements from stack while current element is greater
            while (!st.empty() && arr[st.top()] < currentElement) {
                int index = st.top();
                st.pop();
                result[index] = currentElement;  // Found next greater element
            }
            
            // Only push during first pass to avoid duplicates
            if (i < n) {
                st.push(currentIndex);
            }
        }
        
        return result;
    }
};