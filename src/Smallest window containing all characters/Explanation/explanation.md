# Smallest Window Containing All Characters

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

Given two strings **s** and **p**, the task is to find the **smallest substring of s that contains all characters of p**, including duplicates.

If multiple substrings of the same smallest length exist, return the substring with the **least starting index**.

If no such substring exists, return an empty string.

---

## Constraints

* 1 ≤ s.length, p.length ≤ 10^6
* s and p consist of lowercase English letters

---

## Intuition

When I first looked at the problem, the straightforward idea was to check every possible substring of `s` and verify whether it contains all characters of `p`. But this approach would take too much time because the string size can be up to one million.

So I needed a faster way.

Since the substring must be continuous, I realized this is a good case for the **Sliding Window technique**. Instead of generating all substrings, I maintain a window using two pointers.

One pointer expands the window and the other shrinks it. The goal is to keep a window that always contains all characters of `p` and make it as small as possible.

---

## Approach

1. Count the frequency of each character in string `p`.
2. Maintain another frequency array for the current window in `s`.
3. Use two pointers `left` and `right` to represent the window.
4. Expand the window by moving `right`.
5. Update the character frequency of the window.
6. If the window satisfies all required characters, try shrinking it from the left.
7. Keep updating the smallest window length.
8. Continue expanding and shrinking until the end of the string.
9. Return the smallest substring found.

---

## Data Structures Used

* Frequency array of size 256 to store character counts.
* Sliding window with two pointers.

These structures allow constant time character updates and efficient window management.

---

## Operations & Behavior Summary

| Operation          | Description                                      |
| ------------------ | ------------------------------------------------ |
| Expand Window      | Move the right pointer to include new characters |
| Update Frequency   | Increase frequency count in the window           |
| Check Valid Window | Verify if all characters from p are included     |
| Shrink Window      | Move left pointer to minimize the window         |
| Update Result      | Store smallest valid window                      |

---

## Complexity

**Time Complexity:** O(n + m)

* n = length of string s
* m = length of string p

Each character is processed at most twice.

**Space Complexity:** O(1)

We use fixed size arrays for ASCII characters.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    string minWindow(string &s, string &p) {
        vector<int> freqP(256,0), window(256,0);

        for(char c : p)
            freqP[c]++;

        int left = 0;
        int right = 0;
        int count = 0;

        int minLen = INT_MAX;
        int start = 0;

        while(right < s.size()){

            char c = s[right];
            window[c]++;

            if(freqP[c] != 0 && window[c] <= freqP[c])
                count++;

            while(count == p.size()){

                if(right - left + 1 < minLen){
                    minLen = right - left + 1;
                    start = left;
                }

                char leftChar = s[left];
                window[leftChar]--;

                if(freqP[leftChar] != 0 && window[leftChar] < freqP[leftChar])
                    count--;

                left++;
            }

            right++;
        }

        if(minLen == INT_MAX)
            return "";

        return s.substr(start,minLen);
    }
};
```

### Java

```java
class Solution {

    public static String minWindow(String s, String p) {

        int[] freqP = new int[256];
        int[] window = new int[256];

        for(char c : p.toCharArray())
            freqP[c]++;

        int left = 0;
        int right = 0;
        int count = 0;

        int minLen = Integer.MAX_VALUE;
        int start = 0;

        while(right < s.length()){

            char c = s.charAt(right);
            window[c]++;

            if(freqP[c] != 0 && window[c] <= freqP[c])
                count++;

            while(count == p.length()){

                if(right - left + 1 < minLen){
                    minLen = right - left + 1;
                    start = left;
                }

                char leftChar = s.charAt(left);
                window[leftChar]--;

                if(freqP[leftChar] != 0 && window[leftChar] < freqP[leftChar])
                    count--;

                left++;
            }

            right++;
        }

        if(minLen == Integer.MAX_VALUE)
            return "";

        return s.substring(start,start+minLen);
    }
}
```

### JavaScript

```javascript
class Solution {
    minWindow(s,p){

        let freqP = new Array(256).fill(0);
        let window = new Array(256).fill(0);

        for(let c of p)
            freqP[c.charCodeAt(0)]++;

        let left = 0;
        let right = 0;
        let count = 0;

        let minLen = Infinity;
        let start = 0;

        while(right < s.length){

            let c = s.charCodeAt(right);
            window[c]++;

            if(freqP[c] !== 0 && window[c] <= freqP[c])
                count++;

            while(count === p.length){

                if(right-left+1 < minLen){
                    minLen = right-left+1;
                    start = left;
                }

                let leftChar = s.charCodeAt(left);
                window[leftChar]--;

                if(freqP[leftChar] !== 0 && window[leftChar] < freqP[leftChar])
                    count--;

                left++;
            }

            right++;
        }

        if(minLen === Infinity)
            return "";

        return s.substring(start,start+minLen);
    }
}
```

### Python3

```python
class Solution:

    def minWindow(self, s, p):

        freqP = [0]*256
        window = [0]*256

        for c in p:
            freqP[ord(c)] += 1

        left = 0
        right = 0
        count = 0

        minLen = float('inf')
        start = 0

        while right < len(s):

            c = ord(s[right])
            window[c] += 1

            if freqP[c] != 0 and window[c] <= freqP[c]:
                count += 1

            while count == len(p):

                if right-left+1 < minLen:
                    minLen = right-left+1
                    start = left

                leftChar = ord(s[left])
                window[leftChar] -= 1

                if freqP[leftChar] != 0 and window[leftChar] < freqP[leftChar]:
                    count -= 1

                left += 1

            right += 1

        if minLen == float('inf'):
            return ""

        return s[start:start+minLen]
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

1. Create a frequency map for characters of `p`.
2. Create another frequency map for the current window.
3. Start the window using two pointers `left` and `right`.
4. Expand the window by moving `right` pointer.
5. Update frequency of the current character.
6. If the character contributes to matching `p`, increase match count.
7. When all characters are matched, attempt to shrink the window.
8. Update minimum window length whenever a smaller valid window appears.
9. Continue until the entire string is processed.

---

## Examples

Input

s = "timetopractice"
p = "toc"

Output

"toprac"

Explanation

This is the smallest substring containing characters t, o, and c.

---

Input

s = "zoomlazapzo"
p = "oza"

Output

"apzo"

---

## How to use / Run locally

Clone the repository

```bash
git clone https://github.com/your-username/repository-name.git
```

Compile and run

C++

```bash
g++ solution.cpp
./a.out
```

Java

```bash
javac Solution.java
java Solution
```

Python

```bash
python solution.py
```

JavaScript

```bash
node solution.js
```

---

## Notes & Optimizations

* Sliding window avoids generating all substrings.
* Frequency arrays provide constant time lookups.
* Each character is visited at most twice.
* Works efficiently even for very large strings.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
