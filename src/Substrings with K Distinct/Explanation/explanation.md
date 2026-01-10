# Substrings with K Distinct Characters

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
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

I am given a string `s` containing only lowercase English letters and an integer `k`.
My task is to count **all possible substrings** that contain **exactly `k` distinct characters**.

A substring must be continuous and taken from the original string.

---

## Constraints

* 1 ≤ length of string ≤ 10⁶
* 1 ≤ k ≤ 26
* String contains only lowercase letters

---

## Intuition

When I started thinking about this problem, counting substrings with **exactly K distinct characters** felt difficult.

Then I remembered a very useful idea:

If I know
substrings with **at most K distinct characters**
and
substrings with **at most (K − 1) distinct characters**,

then their difference will give me
substrings with **exactly K distinct characters**.

So my main idea became:

**Exactly K = AtMost(K) − AtMost(K − 1)**

This simplifies the problem a lot.

---

## Approach

1. I created a helper function that counts substrings with **at most K distinct characters**.
2. I used the **sliding window** technique with two pointers.
3. I maintained a frequency array to track character counts.
4. I expanded the window from the right.
5. If distinct characters exceeded K, I shrank the window from the left.
6. For each valid window, I counted all substrings ending at the right pointer.
7. Finally, I returned
   AtMost(K) − AtMost(K − 1).

---

## Data Structures Used

* Fixed-size frequency array of size 26
* Two pointers for sliding window

---

## Operations & Behavior Summary

* Window expands when adding characters
* Window shrinks when distinct characters exceed K
* Each valid window contributes multiple substrings
* Linear traversal of the string

---

## Complexity

**Time Complexity:** O(n)

* `n` is the length of the string
* Each character is processed at most twice

**Space Complexity:** O(1)

* Only a fixed-size frequency array is used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int atMostK(string &s, int k) {
        if (k < 0) return 0;

        int freq[26] = {0};
        int left = 0, distinct = 0, count = 0;

        for (int right = 0; right < s.size(); right++) {
            if (freq[s[right] - 'a'] == 0)
                distinct++;
            freq[s[right] - 'a']++;

            while (distinct > k) {
                freq[s[left] - 'a']--;
                if (freq[s[left] - 'a'] == 0)
                    distinct--;
                left++;
            }

            count += (right - left + 1);
        }
        return count;
    }

    int countSubstr(string& s, int k) {
        return atMostK(s, k) - atMostK(s, k - 1);
    }
};
```

---

### Java

```java
class Solution {

    private int atMostK(String s, int k) {
        if (k < 0) return 0;

        int[] freq = new int[26];
        int left = 0, distinct = 0, count = 0;

        for (int right = 0; right < s.length(); right++) {
            if (freq[s.charAt(right) - 'a'] == 0)
                distinct++;
            freq[s.charAt(right) - 'a']++;

            while (distinct > k) {
                freq[s.charAt(left) - 'a']--;
                if (freq[s.charAt(left) - 'a'] == 0)
                    distinct--;
                left++;
            }

            count += (right - left + 1);
        }
        return count;
    }

    public int countSubstr(String s, int k) {
        return atMostK(s, k) - atMostK(s, k - 1);
    }
}
```

---

### JavaScript

```javascript
class Solution {
    atMostK(s, k) {
        if (k < 0) return 0;

        const freq = new Array(26).fill(0);
        let left = 0, distinct = 0, count = 0;

        for (let right = 0; right < s.length; right++) {
            const r = s.charCodeAt(right) - 97;
            if (freq[r] === 0) distinct++;
            freq[r]++;

            while (distinct > k) {
                const l = s.charCodeAt(left) - 97;
                freq[l]--;
                if (freq[l] === 0) distinct--;
                left++;
            }
            count += (right - left + 1);
        }
        return count;
    }

    countSubstr(s, k) {
        return this.atMostK(s, k) - this.atMostK(s, k - 1);
    }
}
```

---

### Python3

```python
class Solution:
    def atMostK(self, s, k):
        if k < 0:
            return 0

        freq = [0] * 26
        left = distinct = count = 0

        for right in range(len(s)):
            idx = ord(s[right]) - ord('a')
            if freq[idx] == 0:
                distinct += 1
            freq[idx] += 1

            while distinct > k:
                lidx = ord(s[left]) - ord('a')
                freq[lidx] -= 1
                if freq[lidx] == 0:
                    distinct -= 1
                left += 1

            count += (right - left + 1)
        return count

    def countSubstr(self, s, k):
        return self.atMostK(s, k) - self.atMostK(s, k - 1)
```

---

## Step-by-step Detailed Explanation

1. I move the right pointer and include characters in the window.
2. I update frequency and count distinct characters.
3. If distinct characters exceed K, I move the left pointer.
4. For each valid window, all substrings ending at `right` are counted.
5. I repeat this for the full string.
6. I subtract results to get exactly K distinct substrings.

---

## Examples

Input
s = "abc", k = 2

Output
2

Explanation
Valid substrings are "ab" and "bc"

---

## How to Use / Run Locally

1. Copy the solution for your preferred language.
2. Paste it into your compiler or IDE.
3. Call `countSubstr(s, k)` with input values.
4. Run the program.

---

## Notes & Optimizations

* Sliding window ensures linear time
* No nested loops
* Uses constant memory
* Works efficiently for very large strings

---

## Author

* **Md Aarzoo Islam**
  [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
