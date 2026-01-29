# Stream First Non-Repeating

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

Given a string `s` consisting of only lowercase English letters, for every index `i` (0 ≤ i < n), we need to find the **first non-repeating character** in the prefix `s[0...i]`.

If no such character exists at any point, we return `#` for that index.

The final output is a string where each character represents the answer for each prefix of the input stream.

---

## Constraints

* 1 ≤ s.length ≤ 10^5
* String contains only lowercase alphabets (a–z)

---

## Intuition

When I first looked at the problem, I noticed that the string behaves like a **stream**.

That means:

* Characters arrive one by one
* After every character, I must immediately tell which character is the first one that has appeared only once so far

So I asked myself two questions:

1. How do I track how many times a character appears?
2. How do I maintain the order of characters as they arrive?

This clearly tells me that I need:

* A way to count frequency fast
* A way to preserve insertion order

---

## Approach

I solved the problem using a **frequency array + queue** approach.

Step by step:

1. Create a frequency array of size 26 for lowercase letters
2. Create a queue to store characters in the order they appear
3. Traverse the string character by character
4. For each character:

   * Increase its frequency
   * Push it into the queue
5. While the front of the queue has frequency more than 1, remove it
6. If the queue becomes empty, append `#` to the answer
7. Otherwise, append the front of the queue

Repeat this for all characters in the string.

---

## Data Structures Used

* **Array (size 26)** → To store frequency of characters
* **Queue** → To maintain the order of non-repeating characters
* **String / StringBuilder** → To build the final answer

---

## Operations & Behavior Summary

* Each character is added to the queue once
* Each character is removed from the queue at most once
* Frequency check is O(1)
* Queue front always represents the current first non-repeating character

---

## Complexity

* **Time Complexity:** O(n)

  * `n` is the length of the string
  * Every character is pushed and popped at most once

* **Space Complexity:** O(1)

  * Frequency array is fixed size (26)
  * Queue size is bounded by number of unique lowercase letters

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    string firstNonRepeating(string &s) {
        vector<int> freq(26, 0);
        queue<char> q;
        string result = "";

        for (char ch : s) {
            freq[ch - 'a']++;
            q.push(ch);

            while (!q.empty() && freq[q.front() - 'a'] > 1) {
                q.pop();
            }

            if (q.empty()) result += '#';
            else result += q.front();
        }
        return result;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public String firstNonRepeating(String s) {
        int[] freq = new int[26];
        Queue<Character> q = new LinkedList<>();
        StringBuilder ans = new StringBuilder();

        for (char ch : s.toCharArray()) {
            freq[ch - 'a']++;
            q.offer(ch);

            while (!q.isEmpty() && freq[q.peek() - 'a'] > 1) {
                q.poll();
            }

            if (q.isEmpty()) ans.append('#');
            else ans.append(q.peek());
        }
        return ans.toString();
    }
}
```

### JavaScript

```javascript
class Solution {
    firstNonRepeating(s) {
        let freq = new Array(26).fill(0);
        let queue = [];
        let result = "";

        for (let ch of s) {
            freq[ch.charCodeAt(0) - 97]++;
            queue.push(ch);

            while (queue.length && freq[queue[0].charCodeAt(0) - 97] > 1) {
                queue.shift();
            }

            result += queue.length ? queue[0] : '#';
        }
        return result;
    }
}
```

### Python3

```python
from collections import deque

class Solution:
    def firstNonRepeating(self, s):
        freq = [0] * 26
        q = deque()
        ans = ""

        for ch in s:
            freq[ord(ch) - ord('a')] += 1
            q.append(ch)

            while q and freq[ord(q[0]) - ord('a')] > 1:
                q.popleft()

            ans += q[0] if q else '#'

        return ans
```

---

## Step-by-step Detailed Explanation

* Frequency array keeps track of how many times a character has appeared
* Queue stores characters in arrival order
* Repeating characters are removed from the front of the queue
* The queue front always gives the first non-repeating character
* If queue becomes empty, `#` is added

This logic is identical across all languages.

---

## Examples

Input:

```
aabc
```

Output:

```
a#bb
```

Explanation:

* a → a
* aa → #
* aab → b
* aabc → b

---

## How to use / Run locally

### C++

```bash
g++ solution.cpp && ./a.out
```

### Java

```bash
javac Solution.java && java Solution
```

### JavaScript

```bash
node solution.js
```

### Python

```bash
python3 solution.py
```

---

## Notes & Optimizations

* This is the most optimal solution for this problem
* No sorting or nested loops are used
* Works efficiently even for large inputs
* Very common interview question based on queue + hashing

---

## Author

* **Md Aarzoo Islam**
  [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
