# Remove K Digits

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

I am given a **non-negative number as a string** and an integer **k**.
My task is to **remove exactly k digits** from the number so that the **final number is as small as possible**.

Important rules:

* I must **keep the order** of remaining digits.
* The final number should **not have leading zeros**.
* If all digits are removed, I should return `"0"`.

---

## Constraints

* `1 ≤ k ≤ length of string ≤ 10⁶`
* The number is provided as a **string**, not an integer.

---

## Intuition

When I thought about this problem, one thing became very clear.

If a **bigger digit comes before a smaller digit**, keeping the bigger digit makes the number larger.
So whenever I see a **smaller digit**, I should try to remove the **larger digits before it**, if I still have removals left.

This greedy thinking naturally led me to use a **stack-like approach** where:

* I remove digits only when it helps make the number smaller.
* I always process digits from left to right.

---

## Approach

1. I use a stack (or stack-like string).
2. I iterate through each digit in the string.
3. While:

   * stack is not empty
   * k > 0
   * top of stack > current digit
     I pop the stack.
4. I push the current digit into the stack.
5. After processing all digits, if `k` is still left, I remove digits from the **end**.
6. I remove **leading zeros** from the result.
7. If the result becomes empty, I return `"0"`.

---

## Data Structures Used

* Stack
  (implemented using string, array, or StringBuilder depending on language)

---

## Operations & Behavior Summary

* Remove digits greedily from the left when possible.
* Maintain digit order.
* Ensure smallest possible number.
* Handle large input efficiently.
* Handle leading zeros safely.

---

## Complexity

**Time Complexity:** `O(n)`

* `n` is the length of the string.
* Each digit is pushed and popped at most once.

**Space Complexity:** `O(n)`

* Extra space used for the stack.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    string removeKdig(string &s, int k) {
        string st;

        for (char ch : s) {
            while (!st.empty() && k > 0 && st.back() > ch) {
                st.pop_back();
                k--;
            }
            st.push_back(ch);
        }

        while (k > 0 && !st.empty()) {
            st.pop_back();
            k--;
        }

        int i = 0;
        while (i < st.size() && st[i] == '0') i++;

        string ans = st.substr(i);
        return ans.empty() ? "0" : ans;
    }
};
```

---

### Java

```java
class Solution {
    public String removeKdig(String s, int k) {
        StringBuilder st = new StringBuilder();

        for (char ch : s.toCharArray()) {
            while (st.length() > 0 && k > 0 && st.charAt(st.length() - 1) > ch) {
                st.deleteCharAt(st.length() - 1);
                k--;
            }
            st.append(ch);
        }

        while (k > 0 && st.length() > 0) {
            st.deleteCharAt(st.length() - 1);
            k--;
        }

        int i = 0;
        while (i < st.length() && st.charAt(i) == '0') i++;

        String ans = st.substring(i);
        return ans.length() == 0 ? "0" : ans;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    removeKdig(s, k) {
        let stack = [];

        for (let ch of s) {
            while (stack.length && k > 0 && stack[stack.length - 1] > ch) {
                stack.pop();
                k--;
            }
            stack.push(ch);
        }

        while (k > 0 && stack.length) {
            stack.pop();
            k--;
        }

        let result = stack.join("").replace(/^0+/, "");
        return result === "" ? "0" : result;
    }
}
```

---

### Python3

```python
class Solution:
    def removeKdig(self, s, k):
        stack = []

        for ch in s:
            while stack and k > 0 and stack[-1] > ch:
                stack.pop()
                k -= 1
            stack.append(ch)

        while k > 0 and stack:
            stack.pop()
            k -= 1

        result = ''.join(stack).lstrip('0')
        return result if result else "0"
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. I loop through each digit of the string.
2. I compare the current digit with the last digit in the stack.
3. If the stack digit is bigger and I still can remove digits, I pop it.
4. This ensures smaller digits stay on the left.
5. After the loop, if removals remain, I delete from the end.
6. I remove leading zeros because they are invalid.
7. If nothing remains, I return `"0"`.

---

## Examples

**Input:**
`s = "4325043", k = 3`

**Output:**
`2043`

---

**Input:**
`s = "765028321", k = 5`

**Output:**
`221`

---

## How to use / Run locally

1. Copy the solution code.
2. Paste it into the GeeksforGeeks editor or your local IDE.
3. Compile and run with test cases.
4. The function will return the smallest possible number.

---

## Notes & Optimizations

* This solution works efficiently even for very large inputs.
* Avoid converting string to integer to prevent overflow.
* Greedy + stack is the best approach for this problem.
* Removing leading zeros is mandatory.

---

## Author

**Md Aarzoo Islam**
🔗 [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
