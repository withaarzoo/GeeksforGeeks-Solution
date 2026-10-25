# Sum of Beauty of All Substrings - GeeksforGeeks Solution

## Table of Contents

- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary

You are given a string s made of lowercase English letters. Your task is to find the sum of the beauty of every possible substring of s.

The beauty of a substring is the difference between the highest frequency and the lowest frequency of the characters that actually appear in that substring. Characters that do not appear are ignored when finding the minimum frequency.

You need to consider every contiguous piece of the string, calculate its beauty, and add all those values together to get the final answer.

This is a classic string and frequency counting problem that appears on platforms like GeeksforGeeks and is useful for practicing substring enumeration and character frequency tracking.

## Constraints

- 1 ≤ s.size() ≤ 500
- s consists only of lowercase English alphabets

These limits make an O(n²) solution practical because the maximum number of substrings is around 125000, which is easy to handle.

## Intuition

When I first read the problem I noticed the length is only 500. That immediately told me I could afford to look at every possible substring without worrying about time limits.

The beauty definition only cares about the characters that are present. So for any window I just need the maximum count and the smallest non-zero count. Everything else can be ignored.

My first instinct was to fix the left end of the window and slowly expand the right end while maintaining a running frequency count. That way I never have to rebuild the frequency information from scratch for every substring.

## Approach

I start by fixing the left index of the substring. For every possible left index I create a fresh frequency array of size 26 (one slot for each lowercase letter).

Then I move the right index from the left index all the way to the end of the string. Every time the right index moves, I increase the count of the character that just entered the window.

After updating the count I scan the 26 frequencies once. I find the largest value and the smallest value that is greater than zero. Their difference is the beauty of the current window, so I add it to the answer.

When the right index finishes, I move the left index one step forward and start over with a clean frequency array. This guarantees every substring is examined exactly once.

The whole process stays simple and easy to implement in any language.

## Data Structures Used

- A fixed-size integer array of length 26.  
  This stores the frequency of each lowercase letter inside the current window. Because the alphabet size is constant, the array uses constant extra space and allows O(1) updates and a very fast scan to find max and min.

No other data structures are required. A simple array is the most efficient choice here.

## Operations & Behavior Summary

1. Initialize answer to zero.  
2. For every possible starting index i:  
   - Reset a frequency array of 26 zeros.  
   - For every ending index j from i to the end of the string:  
     - Increase the frequency of the character at position j.  
     - Scan the frequency array to find the highest count and the lowest non-zero count.  
     - Add (highest − lowest) to the answer.  
3. After both loops finish, return the accumulated answer.

This is essentially a plain-English walk-through of the algorithm before any code is written.

## Complexity

| Complexity Type   | Value   | Explanation |
|-------------------|---------|-------------|
| Time Complexity   | O(n²)   | There are O(n²) substrings. For each substring we spend a constant amount of work (scanning 26 frequencies). With n ≤ 500 this is fast enough. |
| Space Complexity  | O(1)    | Only a fixed array of 26 integers is used, independent of the length of the string. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int beautySum(string &s) {
        int n = s.size();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            int freq[26] = {0};
            for (int j = i; j < n; j++) {
                freq[s[j] - 'a']++;
                int mx = 0, mn = n + 1;
                for (int k = 0; k < 26; k++) {
                    if (freq[k] > 0) {
                        mx = max(mx, freq[k]);
                        mn = min(mn, freq[k]);
                    }
                }
                ans += mx - mn;
            }
        }
        return ans;
    }
};
```

### Java

```java
class Solution {
    public int beautySum(String s) {
        int n = s.length();
        int ans = 0;
        for (int i = 0; i < n; i++) {
            int[] freq = new int[26];
            for (int j = i; j < n; j++) {
                freq[s.charAt(j) - 'a']++;
                int mx = 0, mn = n + 1;
                for (int k = 0; k < 26; k++) {
                    if (freq[k] > 0) {
                        mx = Math.max(mx, freq[k]);
                        mn = Math.min(mn, freq[k]);
                    }
                }
                ans += mx - mn;
            }
        }
        return ans;
    }
}
```

### JavaScript

```javascript
/**
 * @param {string} s
 * @return {number}
 */
class Solution {
    beautySum(s) {
        let n = s.length;
        let ans = 0;
        for (let i = 0; i < n; i++) {
            let freq = new Array(26).fill(0);
            for (let j = i; j < n; j++) {
                freq[s.charCodeAt(j) - 97]++;
                let mx = 0, mn = n + 1;
                for (let k = 0; k < 26; k++) {
                    if (freq[k] > 0) {
                        mx = Math.max(mx, freq[k]);
                        mn = Math.min(mn, freq[k]);
                    }
                }
                ans += mx - mn;
            }
        }
        return ans;
    }
}
```

### Python3

```python
class Solution:
    def beautySum(self, s: str) -> int:
        n = len(s)
        ans = 0
        for i in range(n):
            freq = [0] * 26
            for j in range(i, n):
                freq[ord(s[j]) - ord('a')] += 1
                mx = 0
                mn = n + 1
                for k in range(26):
                    if freq[k] > 0:
                        mx = max(mx, freq[k])
                        mn = min(mn, freq[k])
                ans += mx - mn
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages. Only the syntax for arrays, character handling, and loops changes.

I begin by storing the length of the string so I do not have to call the length function repeatedly.

The outer loop runs over every possible left endpoint. Inside that loop I allocate a fresh frequency array (or reset it to zeros). This array only tracks characters that belong to the current window that starts at the left endpoint.

The inner loop expands the right endpoint. Each time a new character enters the window I increment its frequency. Because the alphabet is tiny, this update is instantaneous.

Right after the update I need the beauty of the window. I walk through all 26 slots. Whenever a slot holds a positive count I treat it as a character that is present. I keep track of the largest such count and the smallest such count. I initialise the minimum to a value larger than any possible frequency so the first non-zero value will correctly replace it.

Once the scan finishes, the difference between the maximum and the minimum is exactly the beauty of the current substring. I add that difference to the running total.

When the right endpoint reaches the end of the string, the outer loop advances the left endpoint and the process repeats with a clean frequency array. This guarantees every possible contiguous substring is processed exactly once.

Edge cases are handled naturally. A single-character substring has maximum and minimum both equal to 1, so its beauty is zero. A substring that contains only one distinct character also has beauty zero. Substrings that contain multiple characters with different frequencies contribute a positive value, which is what we want.

Because the frequency array is recreated for every left endpoint, there is never any leftover count from a previous window. This keeps the implementation clean and free of off-by-one mistakes.

## Examples

**Example 1**  
Input: s = "aaac"  
Output: 3  

Trace:  

- Substring "aaa" → only a appears → beauty 0  
- Substring "aaac" → a:3, c:1 → beauty 2  
- Substring "aac" → a:2, c:1 → beauty 1  
- All other substrings have beauty 0  
Total = 2 + 1 = 3

**Example 2**  
Input: s = "aabc"  
Output: 2  

Trace:  

- Substring "aab" → a:2, b:1 → beauty 1  
- Substring "aabc" → a:2, b:1, c:1 → beauty 1  
- Remaining substrings have beauty 0  
Total = 1 + 1 = 2

**Example 3**  
Input: s = "abc"  
Output: 0  

Every substring either has one character or all characters appear exactly once, so maximum and minimum frequencies are always equal. The sum is therefore zero.

## How to Use / Run Locally

**C++**  

1. Copy the C++ code into a file named `main.cpp`.  
2. Open a terminal in the same folder.  
3. Compile with: `g++ -o main main.cpp`  
4. Run with: `./main`  
5. Provide the input string when prompted or hard-code a test case inside the main function.

**Java**  

1. Copy the Java code into a file named `Solution.java`.  
2. Compile with: `javac Solution.java`  
3. Run with: `java Solution`  
4. You may need to wrap the method inside a main method that reads a string and prints the result.

**JavaScript**  

1. Copy the JavaScript code into a file named `solution.js`.  
2. Run with Node.js: `node solution.js`  
3. Call the method with a test string and log the returned value.

**Python3**  

1. Copy the Python code into a file named `solution.py`.  
2. Run with: `python3 solution.py`  
3. Inside the file create an instance of the class, call the method with a test string, and print the answer.

In all languages make sure the method signature matches the platform requirements if you plan to submit the code on GeeksforGeeks or similar sites.

## Notes & Optimizations

The current solution already meets the expected time and space complexity. Because n is only 500, further micro-optimisations are unnecessary.

One possible alternative is to pre-compute the contribution of every character pair, but that approach is more complicated and does not improve the asymptotic complexity. The simple expand-from-left method is easier to understand and less error-prone.

Watch out for the definition of minimum frequency: only characters that appear at least once are considered. Forgetting this and taking the absolute minimum (including zeros) will produce wrong answers.

Single-character strings and strings with all identical characters are good test cases because their beauty sum must be zero.

The same idea works for slightly larger alphabets as long as the alphabet size remains a small constant. If the alphabet became large, a different data structure would be needed to maintain the current maximum and minimum efficiently.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
