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

  * [C++](#c)
  * [Java](#java)
  * [JavaScript](#javascript)
  * [Python3](#python3)
  * [Go](#go)
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3-go)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given a string `s` consisting of uppercase English letters and an integer `k`, I can perform at most `k` operations. In one operation, I may replace any character with any other uppercase English letter.

My task is to find the length of the longest substring that can be converted into a string with all identical characters using at most `k` replacements.

## Constraints

* `1 <= n, k <= 10^5`
* `s` contains only uppercase English letters.

## Intuition

I thought about this problem as a sliding window problem.

For any substring, if I want to make all characters the same, then I should keep the character that appears most often and replace all other characters.

So for a window of size `window_length`:

* `most_frequent_char_count` = count of the most common character in the window
* `changes_needed = window_length - most_frequent_char_count`

If `changes_needed <= k`, then the window is valid.

That means I only need to keep expanding the window while it stays valid, and shrink it when it becomes invalid.

## Approach

1. Use two pointers, `left` and `right`, to represent a sliding window.
2. Keep a frequency array of size `26` because the string contains only uppercase English letters.
3. As I move `right`, I include the current character in the window and update its frequency.
4. I track `maxFreq`, which is the highest frequency of any character in the current window.
5. If `window_size - maxFreq > k`, then the window needs more than `k` changes, so I move `left` forward and shrink the window.
6. After every valid window update, I store the maximum window length.

This works efficiently because every character enters and leaves the window at most once.

## Data Structures Used

* **Array of size 26**: To store frequencies of uppercase letters.
* **Two pointers**: To maintain the sliding window.
* **Integer variables**: To store `left`, `maxFreq`, and the best answer.

## Operations & Behavior Summary

* Add one character to the window by moving `right`.
* Update its frequency.
* Recompute the current best repeating character count.
* Check whether the window needs more than `k` replacements.
* If yes, remove characters from the left until the window becomes valid again.
* Record the maximum valid window size.

## Complexity

* **Time Complexity:** `O(n)` where `n` is the length of the string. I process each character with the sliding window at most a constant number of times.
* **Space Complexity:** `O(1)` because I only use a fixed-size frequency array of 26 elements.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int longestSubstr(string& s, int k) {
        vector<int> freq(26, 0);
        int left = 0;
        int maxFreq = 0;
        int ans = 0;

        for (int right = 0; right < (int)s.size(); right++) {
            freq[s[right] - 'A']++;
            maxFreq = max(maxFreq, freq[s[right] - 'A']);

            while ((right - left + 1) - maxFreq > k) {
                freq[s[left] - 'A']--;
                left++;
            }

            ans = max(ans, right - left + 1);
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    public int longestSubstr(String s, int k) {
        int[] freq = new int[26];
        int left = 0;
        int maxFreq = 0;
        int ans = 0;

        for (int right = 0; right < s.length(); right++) {
            int idx = s.charAt(right) - 'A';
            freq[idx]++;
            maxFreq = Math.max(maxFreq, freq[idx]);

            while ((right - left + 1) - maxFreq > k) {
                freq[s.charAt(left) - 'A']--;
                left++;
            }

            ans = Math.max(ans, right - left + 1);
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    longestSubstr(s, k) {
        const freq = new Array(26).fill(0);
        let left = 0;
        let maxFreq = 0;
        let ans = 0;

        for (let right = 0; right < s.length; right++) {
            const idx = s.charCodeAt(right) - 65;
            freq[idx]++;
            maxFreq = Math.max(maxFreq, freq[idx]);

            while ((right - left + 1) - maxFreq > k) {
                freq[s.charCodeAt(left) - 65]--;
                left++;
            }

            ans = Math.max(ans, right - left + 1);
        }

        return ans;
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
        ans = 0

        for right in range(len(s)):
            idx = ord(s[right]) - ord('A')
            freq[idx] += 1
            maxFreq = max(maxFreq, freq[idx])

            while (right - left + 1) - maxFreq > k:
                freq[ord(s[left]) - ord('A')] -= 1
                left += 1

            ans = max(ans, right - left + 1)

        return ans
```

### Go

```go
package main

func longestSubstr(s string, k int) int {
    freq := make([]int, 26)
    left := 0
    maxFreq := 0
    ans := 0

    for right := 0; right < len(s); right++ {
        idx := int(s[right] - 'A')
        freq[idx]++
        if freq[idx] > maxFreq {
            maxFreq = freq[idx]
        }

        for (right-left+1)-maxFreq > k {
            freq[int(s[left]-'A')]--
            left++
        }

        if right-left+1 > ans {
            ans = right - left + 1
        }
    }

    return ans
}
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3, Go)

### 1. I create a frequency array

I use an array of size 26 because the string contains only uppercase letters from `A` to `Z`. This makes counting fast and simple.

### 2. I expand the window from the right

Every time I move `right`, I include one more character into the current substring.

### 3. I update the highest frequency

I keep track of the most repeated character inside the current window. This is important because the best strategy is to convert all other characters into that character.

### 4. I check whether the window is valid

I calculate:

`window_size - maxFreq`

This tells me how many changes are needed.

If this value is greater than `k`, then the window is not valid.

### 5. I shrink the window from the left

When the window becomes invalid, I remove the leftmost character and move `left` forward until the window becomes valid again.

### 6. I update the answer

At every valid step, I compare the current window size with my best answer and keep the larger one.

### 7. Why this works

This works because I never need to check all substrings manually. The sliding window naturally grows and shrinks while keeping track of the best possible valid substring.

## Examples

### Example 1

**Input:** `s = "ABBA", k = 2`

**Output:** `4`

**Explanation:**
I can replace both `A` characters with `B`, so the whole string becomes `BBBB`.

### Example 2

**Input:** `s = "ADBD", k = 1`

**Output:** `3`

**Explanation:**
I can replace `B` with `D`, so the string becomes `ADDD`. The longest repeating substring length is `3`.

## How to use / Run locally

### C++

```bash
g++ -std=c++17 -O2 -o main main.cpp
./main
```

### Java

```bash
javac Main.java
java Main
```

### JavaScript

```bash
node main.js
```

### Python3

```bash
python3 main.py
```

### Go

```bash
go run main.go
```

## Notes & Optimizations

* I use a fixed-size array of 26 elements instead of a map, which is faster.
* The sliding window ensures that each character is processed efficiently.
* The solution is already optimal for the given constraints.
* The variable `maxFreq` stores the best repeating character count in the current window, which helps avoid extra work.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
