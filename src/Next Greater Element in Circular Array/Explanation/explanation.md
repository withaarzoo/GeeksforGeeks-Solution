# Problem Statement

Given a **circular integer array** `arr[]`, find the **Next Greater Element (NGE)** for each element in the array.

The **Next Greater Element** of an element `arr[i]` is the first element that is greater than `arr[i]` when traversing the array in a circular manner. If no such element exists, return `-1` for that position.

## Key Points

- The array is **circular** (after the last element, we continue from the first element)
- We need to find the **first greater element** in circular order
- If no greater element exists, return `-1`

---

## 🧩 Examples

### Example 1

```md
Input:  arr[] = [1, 3, 2, 4]
Output: [3, 4, 4, -1]

Explanation:
- Next greater element for 1 → 3
- Next greater element for 3 → 4  
- Next greater element for 2 → 4
- Next greater element for 4 → -1 (no greater element exists)
```

### Example 2

```md
Input:  arr[] = [0, 2, 3, 1, 1]
Output: [2, 3, -1, 2, 2]

Explanation:
- Next greater element for 0 → 2
- Next greater element for 2 → 3
- Next greater element for 3 → -1 (no greater element)
- Next greater element for 1 (index 3) → 2 (circular: goes to index 1)
- Next greater element for 1 (index 4) → 2 (circular: goes to index 1)
```

---

## 💡 My Approach

### Intuition

When I first encountered this problem, I realized this is a classic **stack-based problem** with a twist - the circular nature of the array. My key insights were:

1. **Use a Monotonic Stack**: Keep track of elements that haven't found their next greater element yet
2. **Simulate Circular Traversal**: Loop through the array twice (2×n iterations) to handle the circular property
3. **Store Indices**: Store array indices in the stack rather than values for efficient result mapping

### Strategy

I decided to use a **decreasing monotonic stack** approach:

- Traverse the array twice to simulate circular behavior
- Use a stack to maintain indices of elements in decreasing order of their values
- When I find a greater element, pop from stack and update results
- Only push indices during the first pass to avoid duplicates

---

## ⚡ Complexity Analysis

| Metric | Complexity | Explanation |
|--------|------------|-------------|
| **Time Complexity** | `O(n)` | Each element is pushed and popped from stack at most once |
| **Space Complexity** | `O(n)` | Stack can hold up to n elements + result array space |

**Why O(n) time?**
Even though we loop 2n times, each element is processed (pushed/popped) only once, making the amortized time complexity O(n).

---

## 🔍 Step-by-Step Algorithm

Let me walk through the algorithm with **Example**: `arr = [1, 3, 2, 4]`

### Initial Setup

```md
result = [-1, -1, -1, -1]  // Default: no greater element found
stack = []                 // Stores indices of elements
```

### Iteration Details

| i | currentIndex | currentElement | Stack Operations | Result | Stack State |
|---|--------------|----------------|------------------|--------|-------------|
| 0 | 0 | 1 | Push 0 | `[-1, -1, -1, -1]` | `[0]` |
| 1 | 1 | 3 | Pop 0, set result[0]=3, Push 1 | `[3, -1, -1, -1]` | `[1]` |
| 2 | 2 | 2 | No pop (3>2), Push 2 | `[3, -1, -1, -1]` | `[1, 2]` |
| 3 | 3 | 4 | Pop 2, set result[2]=4, Pop 1, set result[1]=4, Push 3 | `[3, 4, 4, -1]` | `[3]` |
| 4-7 | 0-3 | 1,3,2,4 | No operations (no greater than 4) | `[3, 4, 4, -1]` | `[3]` |

### Key Steps Explained

1. **Double Loop**: `for i in range(2 * n)` simulates circular array
2. **Index Mapping**: `currentIndex = i % n` gets actual array position  
3. **Stack Logic**:
   - While stack not empty AND `arr[stack.top()] < currentElement`
   - Pop index and set `result[index] = currentElement`
4. **Avoid Duplicates**: Only push indices when `i < n` (first pass only)

---

## 💻 Solutions

### 🔥 C++

```cpp
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
```

### ☕ Java

```java
import java.util.*;

class Solution {
    public ArrayList<Integer> nextGreater(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> result = new ArrayList<>();
        
        // Initialize result with -1
        for (int i = 0; i < n; i++) {
            result.add(-1);
        }
        
        Stack<Integer> stack = new Stack<>();
        
        // Traverse array twice for circular property
        for (int i = 0; i < 2 * n; i++) {
            int currentIndex = i % n;
            int currentElement = arr[currentIndex];
            
            // Pop all smaller elements and update their NGE
            while (!stack.isEmpty() && arr[stack.peek()] < currentElement) {
                result.set(stack.pop(), currentElement);
            }
            
            // Only push during first pass
            if (i < n) {
                stack.push(currentIndex);
            }
        }
        
        return result;
    }
}
```

### 🟨 JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {number[]}
 */
class Solution {
    nextGreater(arr) {
        const n = arr.length;
        const result = new Array(n).fill(-1);
        const stack = [];
        
        // Traverse array twice for circular property
        for (let i = 0; i < 2 * n; i++) {
            const currentIndex = i % n;
            const currentElement = arr[currentIndex];
            
            // Pop all smaller elements and update their NGE
            while (stack.length > 0 && arr[stack[stack.length - 1]] < currentElement) {
                result[stack.pop()] = currentElement;
            }
            
            // Only push during first pass
            if (i < n) {
                stack.push(currentIndex);
            }
        }
        
        return result;
    }
}
```

### 🐍 Python3

```python
class Solution:
    def nextGreater(self, arr):
        n = len(arr)
        result = [-1] * n  # Initialize with -1
        stack = []         # Stack to store indices
        
        # Traverse array twice for circular property
        for i in range(2 * n):
            current_index = i % n
            current_element = arr[current_index]
            
            # Pop all smaller elements and update their NGE
            while stack and arr[stack[-1]] < current_element:
                result[stack.pop()] = current_element
            
            # Only push during first pass
            if i < n:
                stack.append(current_index)
        
        return result
```

---

## 🎯 Key Insights & Tips

### 💡 **Why This Approach Works:**

1. **Monotonic Stack**: Maintains elements in decreasing order
2. **Circular Simulation**: Two passes handle wrap-around cases  
3. **Efficient Updates**: Each element processed only once
4. **Index Storage**: Enables direct result array updates

### 🚀 **Optimization Techniques:**

- Store **indices** instead of values in stack
- Use **modulo operation** for circular indexing
- **Single pass** for pushing, **double pass** for processing
- **Early termination** when stack becomes empty

### 🎨 **Pattern Recognition:**

This problem follows the **"Next Greater Element"** pattern:

- Use stack for pending elements
- Process in single direction
- Handle special cases (circular, duplicates, etc.)

---

## 📊 Performance Comparison

| Approach | Time Complexity | Space Complexity | Pros | Cons |
|----------|----------------|------------------|------|------|
| **Brute Force** | O(n²) | O(1) | Simple logic | Too slow for large inputs |
| **Stack (Our Solution)** | O(n) | O(n) | Optimal time | Extra space for stack |

---

## 🧪 Test Cases

```python
# Test Case 1: Basic example
arr1 = [1, 3, 2, 4]
expected1 = [3, 4, 4, -1]

# Test Case 2: Circular dependency  
arr2 = [0, 2, 3, 1, 1]
expected2 = [2, 3, -1, 2, 2]

# Test Case 3: All decreasing
arr3 = [5, 4, 3, 2, 1]
expected3 = [-1, -1, -1, -1, -1]

# Test Case 4: All same elements
arr4 = [2, 2, 2, 2]
expected4 = [-1, -1, -1, -1]

# Test Case 5: Single element
arr5 = [1]
expected5 = [-1]
```

---

## 🔗 Related Problems

- [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)
- [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/)
- [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
- [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

---

## 📚 Resources & References

- [GeeksforGeeks - Next Greater Element](https://www.geeksforgeeks.org/next-greater-element/)
- [Monotonic Stack Pattern](https://medium.com/@vishnuvardhan623/monotonic-stack-e9dcc4fa8c3e)
- [Stack Data Structure](https://www.geeksforgeeks.org/stack-data-structure/)

---

## 🤝 Contributing

Feel free to contribute by:

- Adding more test cases
- Optimizing the existing solution  
- Implementing in other languages
- Improving documentation

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**⭐ If you found this helpful, please give it a star!**

---

*Happy Coding!*
