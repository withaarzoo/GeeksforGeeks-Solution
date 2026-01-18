# Next Element with Greater Frequency

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given an array of integers.
For every element in the array, I need to find the **first element to its right** whose **frequency is strictly greater** than the current element’s frequency.

If no such element exists on the right side, I return `-1` for that position.

Important point:
This problem is **not about greater value**, it is about **greater frequency**.

---

## Constraints

* 1 ≤ array size ≤ 10⁵
* 1 ≤ arr[i] ≤ 10⁵

This means I must use an **efficient O(n)** solution.

---

## Intuition

When I first saw this problem, I realized one thing immediately.

Before comparing anything, I **must know the frequency of each element** in the array.

So my thinking was:

* First, count how many times every number appears.
* Then, for each index, look to the right and find the first element whose frequency is greater.

Doing this with nested loops would be slow.
This pattern is very similar to **Next Greater Element**, so I decided to use a **stack**.

---

## Approach

Here is exactly how I solved it:

1. Count the frequency of each element using a hashmap.
2. Create a result array initialized with `-1`.
3. Use a stack to store indices whose answer is not found yet.
4. Traverse the array from left to right.
5. While the stack is not empty and the current element’s frequency is greater than the frequency of the element at the stack top:

   * Pop the index from stack.
   * Set its answer to the current element.
6. Push the current index into the stack.
7. Any index left in the stack already has `-1` as answer.

This guarantees linear time complexity.

---

## Data Structures Used

* **Hash Map / Dictionary**
  Used to store frequency of each element.

* **Stack**
  Used to efficiently find the next element with greater frequency.

* **Array / List**
  Used to store the final result.

---

## Operations & Behavior Summary

* Frequency comparison is done using the hashmap.
* Stack ensures each index is pushed and popped only once.
* No extra nested loops.
* Works efficiently for large inputs.

---

## Complexity

**Time Complexity:**

* `O(n)`

  * Frequency counting takes `O(n)`
  * Stack traversal also takes `O(n)`

**Space Complexity:**

* `O(n)`

  * Hash map + stack + result array

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> nextFreqGreater(vector<int>& arr) {
        int n = arr.size();
        vector<int> result(n, -1);

        unordered_map<int, int> freq;
        for (int x : arr) freq[x]++;

        stack<int> st;

        for (int i = 0; i < n; i++) {
            while (!st.empty() && freq[arr[i]] > freq[arr[st.top()]]) {
                result[st.top()] = arr[i];
                st.pop();
            }
            st.push(i);
        }

        return result;
    }
};
```

---

### Java

```java
class Solution {
    public ArrayList<Integer> nextFreqGreater(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> result = new ArrayList<>();
        for (int i = 0; i < n; i++) result.add(-1);

        HashMap<Integer, Integer> freq = new HashMap<>();
        for (int x : arr)
            freq.put(x, freq.getOrDefault(x, 0) + 1);

        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && freq.get(arr[i]) > freq.get(arr[st.peek()])) {
                result.set(st.pop(), arr[i]);
            }
            st.push(i);
        }

        return result;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    nextFreqGreater(arr) {
        const n = arr.length;
        const result = Array(n).fill(-1);

        const freq = {};
        for (const x of arr) freq[x] = (freq[x] || 0) + 1;

        const stack = [];

        for (let i = 0; i < n; i++) {
            while (
                stack.length &&
                freq[arr[i]] > freq[arr[stack[stack.length - 1]]]
            ) {
                result[stack.pop()] = arr[i];
            }
            stack.push(i);
        }

        return result;
    }
}
```

---

### Python3

```python
class Solution:
    def nextFreqGreater(self, arr):
        n = len(arr)
        result = [-1] * n

        freq = {}
        for x in arr:
            freq[x] = freq.get(x, 0) + 1

        stack = []

        for i in range(n):
            while stack and freq[arr[i]] > freq[arr[stack[-1]]]:
                result[stack.pop()] = arr[i]
            stack.append(i)

        return result
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I first count how many times each element appears.
2. I keep a stack to track indices whose next greater frequency element is not found.
3. While traversing the array:

   * If current element has higher frequency than the element at stack top, I resolve that index.
4. I repeat this until stack condition fails.
5. Remaining indices in stack automatically have `-1`.

The logic is identical across all languages. Only syntax changes.

---

## Examples

**Input**

```bash
[2, 1, 1, 3, 2, 1]
```

**Frequency**

```bash
1 → 3 times
2 → 2 times
3 → 1 time
```

**Output**

```bash
[1, -1, -1, 2, 1, -1]
```

---

## How to use / Run locally

1. Copy the solution code in your preferred language.
2. Compile and run using your local compiler or IDE.
3. Pass the array as input to the function.
4. Print or return the resulting array.

---

## Notes & Optimizations

* This is an optimized `O(n)` solution.
* Stack-based approach avoids nested loops.
* Suitable for large input sizes.
* Can be easily adapted for similar “next greater” problems.

---

## Author

* **Md Aarzoo Islam**
  🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
