# Lexicographically Smallest Rotation

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

You are given a string made of lowercase English letters. Your task is to rotate the string left any number of times (including zero) and produce the lexicographically smallest string possible.

A left rotation means taking the first character and moving it to the end. For a string of length n there are exactly n possible rotations. Among all of them you must return the one that comes first in dictionary order.

This is a classic competitive programming problem that appears under names such as lexicographically smallest rotation, minimal cyclic shift, or lexicographically minimum string rotation. The challenge is to solve it efficiently when the string can be as long as one million characters.

## Constraints

- 1 ≤ length of s ≤ 10⁶
- s contains only lowercase English letters (a–z)

Because the length can reach 10⁶, any solution slower than linear time will time out on most judges.

## Intuition

When I first saw the problem I realized that every rotation is just the original string starting at a different index and wrapping around. Generating all n rotations and comparing them would be too slow for a million characters.

The key observation is that if I concatenate the string with itself, every possible rotation becomes a simple contiguous substring of length n inside the doubled string. Now the problem reduces to finding the starting index of the lexicographically smallest substring of length n inside that doubled string.

To do this without spending quadratic time I reuse the same idea that the Knuth-Morris-Pratt algorithm uses: a failure function that tells me how far I can jump after a mismatch. By keeping track of the best starting index while I build this failure function, I can discover the optimal rotation in a single linear scan.

## Approach

1. Double the input string so that every rotation appears as a plain substring.
2. Create an array that will act as a failure function (similar to the KMP prefix table).
3. Maintain a variable k that stores the starting index of the best rotation found so far. Initially k is 0.
4. Walk through the doubled string from left to right. At each position compare the current character with the character that the current best rotation would place there.
5. On a mismatch, use the failure links to skip ahead and, if the new character is smaller, update k to the new candidate start.
6. When the scan finishes, k holds the starting index of the lexicographically smallest rotation.
7. Return the substring of length n that begins at index k inside the doubled string.

This approach is known as Booth’s algorithm and runs in linear time.

## Data Structures Used

- A doubled string (or the original string treated circularly) so that wrap-around can be handled without modular arithmetic.
- An integer array of size 2n that stores the failure function values. Each entry tells how many characters matched before the last mismatch relative to the current best start. This array is the reason the algorithm never re-examines characters unnecessarily.

No other heavy data structures are required; everything stays simple and cache-friendly.

## Operations & Behavior Summary

- Build the doubled string.
- Initialize the failure array to -1 and set the current best start k to 0.
- For every position j from 1 to 2n-1:
  - Retrieve the previous match length from the failure array.
  - While the characters differ, decide whether the new candidate is better; if it is, move k forward.
  - Follow the failure links to the next possible match length.
  - Record the new match length (or -1) in the failure array.
- After the loop, extract the n-character substring that starts at the final value of k.

The whole process is a single forward pass with occasional constant-time jumps, exactly like the KMP preprocessing phase.

## Complexity

| Metric            | Value | Explanation |
|-------------------|-------|-------------|
| Time Complexity   | O(n)  | The doubled string has length 2n. Each character is examined a constant number of times because of the failure-function jumps. |
| Space Complexity  | O(n)  | The failure array and the doubled string both occupy linear space in the length of the input. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    string lexiString(string &s) {
        string doubled = s + s;
        int n = doubled.size();
        vector<int> f(n, -1);
        int k = 0;
        for (int j = 1; j < n; j++) {
            char sj = doubled[j];
            int i = f[j - k - 1];
            while (i != -1 && sj != doubled[k + i + 1]) {
                if (sj < doubled[k + i + 1]) {
                    k = j - i - 1;
                }
                i = f[i];
            }
            if (sj != doubled[k + i + 1]) {
                if (sj < doubled[k]) {
                    k = j;
                }
                f[j - k] = -1;
            } else {
                f[j - k] = i + 1;
            }
        }
        return doubled.substr(k, s.size());
    }
};
```

### Java
```java
class Solution {
    public String lexiString(String s) {
        String doubled = s + s;
        int n = doubled.length();
        int[] f = new int[n];
        java.util.Arrays.fill(f, -1);
        int k = 0;
        for (int j = 1; j < n; j++) {
            char sj = doubled.charAt(j);
            int i = f[j - k - 1];
            while (i != -1 && sj != doubled.charAt(k + i + 1)) {
                if (sj < doubled.charAt(k + i + 1)) {
                    k = j - i - 1;
                }
                i = f[i];
            }
            if (sj != doubled.charAt(k + i + 1)) {
                if (sj < doubled.charAt(k)) {
                    k = j;
                }
                f[j - k] = -1;
            } else {
                f[j - k] = i + 1;
            }
        }
        return doubled.substring(k, k + s.length());
    }
}
```

### JavaScript
```javascript
/**
 * @param {string} s
 * @return {string}
 */

class Solution {
    lexiString(s) {
        let doubled = s + s;
        let n = doubled.length;
        let f = new Array(n).fill(-1);
        let k = 0;
        for (let j = 1; j < n; j++) {
            let sj = doubled[j];
            let i = f[j - k - 1];
            while (i !== -1 && sj !== doubled[k + i + 1]) {
                if (sj < doubled[k + i + 1]) {
                    k = j - i - 1;
                }
                i = f[i];
            }
            if (sj !== doubled[k + i + 1]) {
                if (sj < doubled[k]) {
                    k = j;
                }
                f[j - k] = -1;
            } else {
                f[j - k] = i + 1;
            }
        }
        return doubled.substring(k, k + s.length);
    }
}
```

### Python3
```python
class Solution:
    def lexiString(self, s: str) -> str:
        doubled = s + s
        n = len(doubled)
        f = [-1] * n
        k = 0
        for j in range(1, n):
            sj = doubled[j]
            i = f[j - k - 1]
            while i != -1 and sj != doubled[k + i + 1]:
                if sj < doubled[k + i + 1]:
                    k = j - i - 1
                i = f[i]
            if sj != doubled[k + i + 1]:
                if sj < doubled[k]:
                    k = j
                f[j - k] = -1
            else:
                f[j - k] = i + 1
        return doubled[k:k + len(s)]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core logic is identical across all four languages; only the syntax for strings, arrays and loops changes.

First the input string is concatenated with itself. This single step turns the circular problem into a linear one. Every possible left rotation now sits inside the longer string as a contiguous block of exactly n characters.

An array of the same length is allocated and filled with -1. This array plays the role of the KMP failure function, but the values are stored relative to the current best starting index k. k itself begins at 0, meaning we initially treat the original string as the candidate answer.

The main loop starts at index 1 and walks to the end of the doubled string. At each position j the algorithm looks up how many characters matched the last time it compared against the rotation that starts at k. That lookup is a simple array access: f[j - k - 1].

A while loop then resolves mismatches. As long as the characters differ, the algorithm checks whether the new character is smaller than the one belonging to the current best rotation. If it is, k is moved forward to the new candidate. After each mismatch the failure link is followed, exactly as in KMP, so previously examined prefixes are never re-checked.

When the characters finally match (or when the failure index becomes -1), the failure array is updated with the new match length. This constant-time update is what keeps the whole algorithm linear.

After the loop finishes, k holds the starting index of the lexicographically smallest rotation. Returning the substring of length n that begins at that index gives the required answer.

Edge cases are handled automatically:
- A string of length 1 simply returns itself.
- A string that is already the smallest possible rotation never moves k away from 0.
- Strings with many repeated characters still finish in linear time because the failure links prevent quadratic comparisons.

Because the four languages only differ in how they express strings and arrays, the same reasoning applies to the C++, Java, JavaScript and Python implementations.

## Examples

**Example 1**

Input: `"abcd"`  
All rotations: `"abcd"`, `"bcda"`, `"cdab"`, `"dabc"`  
The smallest is `"abcd"`.  
The algorithm keeps k = 0 throughout and returns the original string.

**Example 2**

Input: `"baca"`  
All rotations: `"baca"`, `"acab"`, `"caba"`, `"abac"`  
The algorithm discovers that the rotation starting at index 3 (`"abac"`) is smaller than the previous candidates and finally returns `"abac"`.

**Example 3**

Input: `"acab"`  
Rotations include `"acab"`, `"caba"`, `"abac"`, `"baca"`.  
After scanning the doubled string the best start lands at index 2 and the answer is `"abac"`.

## How to Use / Run Locally

**C++**  
Save the code in a file named `main.cpp`.  
Compile with:  
`g++ -std=c++17 main.cpp -o main`  
Run:  
`./main`  
(You can hard-code a test string inside main or read from standard input.)

**Java**  
Save the code in a file named `Solution.java`.  
Compile with:  
`javac Solution.java`  
Run:  
`java Solution`

**JavaScript**  
Save the code in a file named `solution.js`.  
Run with Node.js:  
`node solution.js`

**Python3**  
Save the code in a file named `solution.py`.  
Run:  
`python3 solution.py`

In every language you can replace the hard-coded example with any string you want to test.

## Notes & Optimizations

- Booth’s algorithm is optimal for the general case; no comparison-based method can do better than O(n) in the worst case.
- An alternative linear-time method called the two-candidate elimination algorithm exists and uses less constant memory, but Booth’s algorithm is simpler to implement correctly.
- If the alphabet is very small you can sometimes build a suffix array on the doubled string and take the first suffix whose starting index is less than n. That approach is also O(n) after the suffix array is built, but the constant factors are usually larger.
- Watch out for the empty-string edge case if the constraints ever change; the current problem guarantees length at least 1.
- Because the failure array is the only extra memory, the solution is cache-friendly and performs well on large inputs.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)