# Smallest Window Containing 0, 1 and 2

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given a string `s` consisting only of characters `'0'`, `'1'`, and `'2'`, find the length of the smallest substring that contains all three characters at least once.

If such a substring does not exist, return `-1`.

---

## Constraints

* 1 ≤ s.size() ≤ 10^5

---

## Intuition

I thought about checking all substrings, but that would be too slow (O(n²)).

So I needed an optimized way. Since I am dealing with substrings and minimum window, I immediately thought about using the **sliding window technique**.

The idea is simple:

* Expand the window until it contains `'0'`, `'1'`, and `'2'`
* Then shrink it to find the smallest valid window

---

## Approach

1. Use two pointers: `left` and `right`
2. Maintain a frequency array of size 3
3. Expand `right` pointer and update counts
4. When all characters are present:

   * Update minimum length
   * Move `left` pointer to shrink window
5. Continue until full string is processed

---

## Data Structures Used

* Array of size 3 (to store count of '0', '1', '2')
* Two pointers (left and right)

---

## Operations & Behavior Summary

* Expand window → include characters
* Validate window → check if all 3 exist
* Shrink window → remove unnecessary characters
* Track minimum length

---

## Complexity

* Time Complexity: O(n)

  * Each character is visited at most twice
* Space Complexity: O(1)

  * Only fixed size array used

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int smallestSubstring(string s) {
        int n = s.size();
        int count[3] = {0, 0, 0};
        int left = 0;
        int ans = INT_MAX;

        for (int right = 0; right < n; right++) {
            count[s[right] - '0']++;

            while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
                ans = min(ans, right - left + 1);
                count[s[left] - '0']--;
                left++;
            }
        }

        return ans == INT_MAX ? -1 : ans;
    }
};
```

### Java

```java
class Solution {
    public int smallestSubstring(String s) {
        int[] count = new int[3];
        int left = 0;
        int ans = Integer.MAX_VALUE;

        for (int right = 0; right < s.length(); right++) {
            count[s.charAt(right) - '0']++;

            while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
                ans = Math.min(ans, right - left + 1);
                count[s.charAt(left) - '0']--;
                left++;
            }
        }

        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    smallestSubstring(s) {
        let count = [0, 0, 0];
        let left = 0;
        let ans = Infinity;

        for (let right = 0; right < s.length; right++) {
            count[s[right] - '0']++;

            while (count[0] > 0 && count[1] > 0 && count[2] > 0) {
                ans = Math.min(ans, right - left + 1);
                count[s[left] - '0']--;
                left++;
            }
        }

        return ans === Infinity ? -1 : ans;
    }
}
```

### Python3

```python
class Solution:
    def smallestSubstring(self, s):
        count = [0, 0, 0]
        left = 0
        ans = float('inf')

        for right in range(len(s)):
            count[ord(s[right]) - ord('0')] += 1

            while count[0] > 0 and count[1] > 0 and count[2] > 0:
                ans = min(ans, right - left + 1)
                count[ord(s[left]) - ord('0')] -= 1
                left += 1

        return -1 if ans == float('inf') else ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Initialize frequency array to track counts of '0', '1', '2'
2. Start with `left = 0`
3. Move `right` pointer across string
4. Add character to count array
5. Check if all three characters exist
6. If yes:

   * Calculate window length
   * Update minimum answer
   * Remove left character
   * Move left forward
7. Continue until full string is processed
8. Return result or -1 if not found

---

## Examples

Input: s = "10212"
Output: 3
Explanation: "102" contains all characters

Input: s = "12121"
Output: -1
Explanation: '0' is missing

---

## How to use / Run locally

### C++

* Compile: `g++ file.cpp`
* Run: `./a.out`

### Java

* Compile: `javac Solution.java`
* Run: `java Solution`

### JavaScript

* Run: `node file.js`

### Python

* Run: `python file.py`

---

## Notes & Optimizations

* Sliding window avoids brute force O(n²)
* Always shrink window after finding valid substring
* Use fixed-size array instead of hashmap for better performance

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
