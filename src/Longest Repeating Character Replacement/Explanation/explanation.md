# Longest Repeating Character Replacement

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

In this problem, I am given a string `s` made up of uppercase English letters and an integer `k`.

I am allowed to perform at most `k` operations. In each operation, I can change any character in the string to any other uppercase character.

My goal is to find the **length of the longest substring** that can be converted into a string with all identical characters using at most `k` changes.

So basically, I need to find a substring where I can replace a few characters (up to `k`) and make the whole substring consist of the same character.

This is a classic **sliding window + frequency counting** problem.

---

## Constraints

* `1 ≤ n ≤ 10^5`
* `0 ≤ k ≤ 10^5`
* String `s` contains only uppercase English letters (`A–Z`)

---

## Intuition

When I first looked at this problem, I thought about brute force — checking every substring. But that would be too slow.

Then I noticed something important:

If I want all characters in a substring to be the same, I should try to convert everything into the **most frequent character** in that substring.

So the number of changes required becomes:

```
window size - frequency of most common character
```

If this value is less than or equal to `k`, then the substring is valid.

That gave me the idea to use a **sliding window**.

---

## Approach

Here’s how I solved it step by step:

1. I use two pointers: `left` and `right` to represent a window.
2. I maintain a frequency array to count characters inside the window.
3. I keep track of the **maximum frequency** of any character in the current window.
4. I expand the window by moving `right`.
5. At each step, I check:

   ```
   (window size - max frequency) > k
   ```

   If true, I shrink the window from the left.
6. I keep updating the maximum valid window size.

This ensures I always maintain the longest valid substring.

---

## Data Structures Used

* **Array (size 26)**
  Used to store frequency of each uppercase character.

* **Two pointers (left and right)**
  Used for implementing the sliding window.

* **Integer variables**
  Used to track max frequency and result.

---

## Operations & Behavior Summary

* Start with an empty window
* Expand window to the right
* Update character frequency
* Track the most frequent character
* If too many changes are needed, shrink the window
* Keep updating the maximum valid window length

This process continues until the entire string is processed.

---

## Complexity

| Type             | Complexity |
| ---------------- | ---------- |
| Time Complexity  | O(n)       |
| Space Complexity | O(1)       |

**Explanation:**

* I traverse the string only once using the sliding window.
* The frequency array size is fixed (26), so space is constant.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int longestSubstr(string& s, int k) {
        vector<int> freq(26, 0); // frequency of characters
        int left = 0, maxFreq = 0, maxLen = 0;

        for (int right = 0; right < s.size(); right++) {
            // Increase frequency of current character
            freq[s[right] - 'A']++;

            // Update max frequency in window
            maxFreq = max(maxFreq, freq[s[right] - 'A']);

            // If changes needed > k, shrink window
            while ((right - left + 1) - maxFreq > k) {
                freq[s[left] - 'A']--;
                left++;
            }

            // Update max length
            maxLen = max(maxLen, right - left + 1);
        }

        return maxLen;
    }
};
```

### Java

```java
class Solution {
    public int longestSubstr(String s, int k) {
        int[] freq = new int[26];
        int left = 0, maxFreq = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            freq[s.charAt(right) - 'A']++;

            maxFreq = Math.max(maxFreq, freq[s.charAt(right) - 'A']);

            while ((right - left + 1) - maxFreq > k) {
                freq[s.charAt(left) - 'A']--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

### JavaScript

```javascript
class Solution {
    longestSubstr(s, k) {
        let freq = new Array(26).fill(0);
        let left = 0, maxFreq = 0, maxLen = 0;

        for (let right = 0; right < s.length; right++) {
            freq[s.charCodeAt(right) - 65]++;

            maxFreq = Math.max(maxFreq, freq[s.charCodeAt(right) - 65]);

            while ((right - left + 1) - maxFreq > k) {
                freq[s.charCodeAt(left) - 65]--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

### Python3

```python
class Solution:
    def longestSubstr(self, s, k):
        freq = [0] * 26
        left = 0
        maxFreq = 0
        maxLen = 0

        for right in range(len(s)):
            freq[ord(s[right]) - ord('A')] += 1

            maxFreq = max(maxFreq, freq[ord(s[right]) - ord('A')])

            while (right - left + 1) - maxFreq > k:
                freq[ord(s[left]) - ord('A')] -= 1
                left += 1

            maxLen = max(maxLen, right - left + 1)

        return maxLen
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is the same across all languages, only syntax changes.

1. I start with two pointers:

   * `left = 0`
   * `right = 0`

2. I maintain a frequency array of size 26 to count characters.

3. Every time I move `right`, I:

   * Add the current character to the frequency array
   * Update the maximum frequency seen so far

4. Then I check if the window is valid:

   ```
   window size - max frequency <= k
   ```

5. If it becomes invalid:

   * I move `left` forward
   * Decrease frequency of the character being removed

6. I keep updating the result with the maximum window size found.

Important detail:

* I do not recompute max frequency when shrinking the window.
* This keeps the solution efficient.

---

## Examples

### Example 1

Input:

```
s = "ABBA", k = 2
```

Output:

```
4
```

Explanation:

* I can convert both 'A' into 'B'
* Final string becomes "BBBB"

---

### Example 2

Input:

```
s = "ADBD", k = 1
```

Output:

```
3
```

Explanation:

* Change one 'B' to 'D'
* Substring "DDD" of length 3 is possible

---

### Example 3

Input:

```
s = "AABABBA", k = 1
```

Output:

```
4
```

Explanation:

* Longest valid substring is "AABA" or "ABBA"

---

## How to Use / Run Locally

### C++

1. Save file as `solution.cpp`
2. Compile:

   ```
   g++ solution.cpp -o output
   ```

3. Run:

   ```
   ./output
   ```

---

### Java

1. Save file as `Solution.java`
2. Compile:

   ```
   javac Solution.java
   ```

3. Run:

   ```
   java Solution
   ```

---

### JavaScript

1. Save file as `solution.js`
2. Run:

   ```
   node solution.js
   ```

---

### Python3

1. Save file as `solution.py`
2. Run:

   ```
   python3 solution.py
   ```

---

## Notes & Optimizations

* This problem is a classic example of the **sliding window technique**.
* Always try to maximize the window instead of checking all substrings.
* Tracking the **maximum frequency** is the key optimization.
* Even if max frequency becomes slightly outdated, the algorithm still works correctly.
* This approach avoids nested loops and reduces time complexity to linear.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
