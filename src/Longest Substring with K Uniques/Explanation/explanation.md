# Longest Substring with K Uniques

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

Given a string `s` consisting of lowercase English letters and an integer `k`, the task is to find the length of the longest substring that contains exactly `k` distinct characters.

If no such substring exists, return `-1`.

This is a classic sliding window problem that appears frequently in coding interviews and competitive programming.

---

## Constraints

* 1 <= s.length <= 100000
* 1 <= k <= 26
* String contains only lowercase English letters

---

## Intuition

When I first looked at the problem, my initial thought was to check every substring and count the number of unique characters. But that would take O(n^2) time, which is too slow for strings up to 100000 characters.

So I started thinking about a better approach.

Since the problem asks about **substrings** and we are expanding and shrinking ranges inside the string, the **Sliding Window technique** fits perfectly here.

The idea is simple:

I maintain a window of characters using two pointers. As I move the right pointer, the window expands. If the number of distinct characters becomes greater than `k`, I move the left pointer to shrink the window.

Whenever the window contains exactly `k` unique characters, I update the maximum length.

---

## Approach

1. Use two pointers `left` and `right` to represent a sliding window.
2. Use a frequency map to store the count of characters in the current window.
3. Expand the window by moving `right`.
4. Update the character frequency.
5. If the number of unique characters becomes greater than `k`, shrink the window from the left.
6. Continue shrinking until the number of unique characters becomes `k` or less.
7. If the number of unique characters equals `k`, update the maximum substring length.
8. Continue this process until the entire string is processed.

---

## Data Structures Used

Frequency Map

Used to track how many times each character appears inside the sliding window.

Possible implementations:

* HashMap
* Unordered Map
* JavaScript Map
* Python Dictionary

Since the string only contains lowercase letters, the map size will never exceed 26.

---

## Operations & Behavior Summary

Window Expansion

* Move the `right` pointer forward
* Add the new character to the frequency map

Window Shrinking

* If unique characters exceed `k`
* Move the `left` pointer
* Reduce frequency
* Remove character if frequency becomes zero

Updating Answer

* If number of unique characters equals `k`
* Update the maximum length

---

## Complexity

Time Complexity: O(n)

Each character enters and leaves the sliding window at most once.

Space Complexity: O(1)

Only a frequency map of at most 26 characters is maintained.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    int longestKSubstr(string &s, int k) {
        unordered_map<char,int> freq;

        int left = 0;
        int maxLen = -1;

        for(int right = 0; right < s.size(); right++){
            freq[s[right]]++;

            while(freq.size() > k){
                freq[s[left]]--;

                if(freq[s[left]] == 0){
                    freq.erase(s[left]);
                }

                left++;
            }

            if(freq.size() == k){
                maxLen = max(maxLen, right - left + 1);
            }
        }

        return maxLen;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public int longestKSubstr(String s, int k) {

        Map<Character,Integer> map = new HashMap<>();

        int left = 0;
        int maxLen = -1;

        for(int right = 0; right < s.length(); right++){

            char c = s.charAt(right);
            map.put(c, map.getOrDefault(c,0) + 1);

            while(map.size() > k){

                char leftChar = s.charAt(left);
                map.put(leftChar, map.get(leftChar) - 1);

                if(map.get(leftChar) == 0){
                    map.remove(leftChar);
                }

                left++;
            }

            if(map.size() == k){
                maxLen = Math.max(maxLen, right - left + 1);
            }
        }

        return maxLen;
    }
}
```

### JavaScript

```javascript
class Solution {

    longestKSubstr(s, k) {

        let map = new Map();

        let left = 0;
        let maxLen = -1;

        for(let right = 0; right < s.length; right++){

            let ch = s[right];
            map.set(ch, (map.get(ch) || 0) + 1);

            while(map.size > k){

                let leftChar = s[left];
                map.set(leftChar, map.get(leftChar) - 1);

                if(map.get(leftChar) === 0){
                    map.delete(leftChar);
                }

                left++;
            }

            if(map.size === k){
                maxLen = Math.max(maxLen, right - left + 1);
            }
        }

        return maxLen;
    }
}
```

### Python3

```python
class Solution:

    def longestKSubstr(self, s, k):

        freq = {}

        left = 0
        max_len = -1

        for right in range(len(s)):

            freq[s[right]] = freq.get(s[right],0) + 1

            while len(freq) > k:

                freq[s[left]] -= 1

                if freq[s[left]] == 0:
                    del freq[s[left]]

                left += 1

            if len(freq) == k:
                max_len = max(max_len, right - left + 1)

        return max_len
```

---

## Step-by-step Detailed Explanation

The sliding window technique is used here.

Step 1

Initialize two pointers `left` and `right` which represent the current substring window.

Step 2

Create a frequency map to track the number of occurrences of each character inside the window.

Step 3

Move the `right` pointer across the string and insert each character into the frequency map.

Step 4

If the number of unique characters becomes greater than `k`, the window becomes invalid.

Step 5

Shrink the window by moving the `left` pointer forward.

Decrease the frequency of the character at `left`. If the frequency becomes zero, remove the character from the map.

Step 6

Once the window again contains at most `k` unique characters, continue expanding.

Step 7

Whenever the window contains exactly `k` distinct characters, update the maximum substring length.

Step 8

Continue this process until the entire string has been processed.

---

## Examples

Example 1

Input

s = "aabacbebebe"
k = 3

Output

7

Explanation

The longest substring with exactly 3 unique characters is

"cbebebe"

Length = 7

Example 2

Input

s = "aaaa"
k = 2

Output

-1

Explanation

There is no substring with exactly two unique characters.

---

## How to use / Run locally

Example using C++

1. Create a file named solution.cpp
2. Paste the C++ solution code
3. Compile

```bash
g++ solution.cpp
```

1. Run

```bash
./a.out
```

---

## Notes & Optimizations

Key Optimization

Instead of checking every substring, the sliding window approach ensures each character is processed at most twice.

Why this works efficiently

* Right pointer expands the window
* Left pointer shrinks the window
* Each pointer moves at most `n` times

This guarantees linear time complexity.

---

## Author

* Md Aarzoo Islam
* [https://bento.me/withaarzoo](https://bento.me/withaarzoo)
