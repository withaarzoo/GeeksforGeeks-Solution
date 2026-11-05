# Minimum Days - GeeksforGeeks Solution

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

You are given a string `s` of length `n` that contains only lowercase English letters. You are also given a permutation array `p` of length `n` that contains every index from 0 to n-1 exactly once.

Starting from day 1, you replace one character in the string with `'?'` according to the order given in `p`:
- On day 1 you replace the character at index `p[0]`
- On day 2 you replace the character at index `p[1]`
- and so on

Your task is to find the minimum number of days needed so that no two adjacent characters in the string are equal, unless at least one of them is already a `'?'`.

In other words, after the replacements, the string should satisfy: whenever two neighboring characters are both not `'?'`, they must be different.

If the original string already satisfies the condition, the answer is 0.

This is a classic competitive programming problem that appears on GeeksforGeeks under the title Minimum Days. It tests your ability to work with permutations, track replacement order, and handle adjacent character constraints efficiently.

## Constraints

- 1 ≤ s.size() ≤ 10^5
- 0 ≤ p[i] < s.size()
- s consists only of lowercase English alphabets
- p.size() = s.size()
- p is a permutation of indices from 0 to n-1

These constraints force an O(n) solution. Any approach slower than linear time will get Time Limit Exceeded on the larger test cases.

## Intuition

The only pairs that can ever create a problem are the adjacent positions that start with the same letter. Once a position becomes `'?'`, it stops conflicting with its neighbors. Characters never change into other letters, so new equal pairs can never appear later.

That observation simplifies everything. I only need to look at the original equal adjacent pairs. For each such pair I must make sure at least one of the two positions has been turned into `'?'` by the day I stop. The earliest day that happens for a pair is the smaller of the two replacement days of those positions. The overall answer is simply the largest of those “earliest safe days” across all bad pairs. If there are no bad pairs at all, the answer is zero.

This insight leads directly to a clean linear-time solution.

## Approach

1. Create an array that records the exact day each index gets replaced. Walk through the permutation once and store day[p[i]] = i + 1.
2. Initialize the answer to 0.
3. Scan the string from left to right. Whenever two neighboring characters are equal, look up their replacement days, take the minimum of those two days, and keep a running maximum of that value.
4. After the scan finishes, the running maximum is the minimum number of days required. If no equal neighbors were found, the answer stays 0.

The method works because every dangerous pair is covered exactly when the earlier of its two positions is replaced, and taking the maximum over all such pairs gives the global minimum day that works for the whole string.

## Data Structures Used

- An integer array (or vector) of size n called `day`.  
  This array maps every string index to the day number on which it gets replaced. It is the only extra memory needed and lets us answer “when does index i become ‘?’” in constant time.

No other data structures are required. The original string and the permutation are already given, so we reuse them directly.

## Operations & Behavior Summary

- First pass: Build the day array by iterating through the permutation. After this step every index knows its own replacement day.
- Second pass: Walk through every adjacent pair in the string.  
  - If the two characters differ, ignore the pair.  
  - If they are the same, compute min(day of left, day of right) and update the global maximum.
- Return the global maximum.  
  This value is the smallest day after which every original equal adjacent pair has at least one `'?'`.

The algorithm never modifies the original string; it only reads the characters and the pre-computed days.

## Complexity

| Complexity Type | Value | Explanation |
|-----------------|-------|-------------|
| Time Complexity | O(n) | Two linear passes over the string and the permutation. n is the length of the string (up to 10^5). |
| Space Complexity | O(n) | Extra array of size n to store the replacement day of every index. |

The solution meets the expected complexity mentioned in the problem statement and runs comfortably within the time limits of competitive programming platforms.

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int getMinimumDays(string &s, vector<int> &p) {
        int n = s.size();
        vector<int> day(n);
        for (int i = 0; i < n; i++) {
            day[p[i]] = i + 1;
        }
        int ans = 0;
        for (int i = 0; i < n - 1; i++) {
            if (s[i] == s[i + 1]) {
                ans = max(ans, min(day[i], day[i + 1]));
            }
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int getMinimumDays(String s, int[] p) {
        int n = s.length();
        int[] day = new int[n];
        for (int i = 0; i < n; i++) {
            day[p[i]] = i + 1;
        }
        int ans = 0;
        for (int i = 0; i < n - 1; i++) {
            if (s.charAt(i) == s.charAt(i + 1)) {
                ans = Math.max(ans, Math.min(day[i], day[i + 1]));
            }
        }
        return ans;
    }
}
```

### JavaScript
```javascript
/**
 * @param {String} s
 * @param {number[]} p
 * @return {number}
 */
class Solution {
    getMinimumDays(s, p) {
        let n = s.length;
        let day = new Array(n);
        for (let i = 0; i < n; i++) {
            day[p[i]] = i + 1;
        }
        let ans = 0;
        for (let i = 0; i < n - 1; i++) {
            if (s[i] === s[i + 1]) {
                ans = Math.max(ans, Math.min(day[i], day[i + 1]));
            }
        }
        return ans;
    }
};
```

### Python3
```python
class Solution:
    def getMinimumDays(self, s: str, p: list[int]) -> int:
        n = len(s)
        day = [0] * n
        for i in range(n):
            day[p[i]] = i + 1
        ans = 0
        for i in range(n - 1):
            if s[i] == s[i + 1]:
                ans = max(ans, min(day[i], day[i + 1]))
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the exact same logic. The differences are only in syntax.

First we create an array named `day` of length n. We then loop through the permutation. For every position i in the permutation we write day[p[i]] = i + 1. This tells us that the character at index p[i] is replaced on day i+1.

Next we set a variable `ans` to 0. This variable will hold the largest “earliest safe day” we discover.

We then walk from index 0 to n-2. For each index i we look at the pair (i, i+1). If the two characters are different we do nothing. If they are the same we take the minimum of day[i] and day[i+1] and keep the maximum of that value with the current `ans`.

When the loop ends, `ans` contains the answer. Returning 0 when no equal pairs exist is handled automatically because `ans` never increases.

Edge cases are covered naturally:
- If the string length is 1 there are no adjacent pairs, so the answer is 0.
- If the string is already free of equal adjacent characters, the answer stays 0.
- If every pair needs a replacement, the answer becomes the latest of the earliest safe days, which is still computed correctly by the max-of-mins formula.

The same reasoning applies in C++, Java, JavaScript and Python3. Only the way we declare arrays, access characters, and call max/min functions changes between the languages.

## Examples

**Example 1**  
Input: s = "aabb", p = [2, 1, 3, 0]  
Output: 2  

Trace:  
- Day array becomes [4, 2, 1, 3]  
- Pair (0,1) both ‘a’ → min(4,2) = 2  
- Pair (1,2) ‘a’ and ‘b’ → ignore  
- Pair (2,3) both ‘b’ → min(1,3) = 1  
- Maximum of the values is 2. After 2 days the string is "a??b", which is valid.

**Example 2**  
Input: s = "abca", p = [3, 0, 2, 1]  
Output: 0  

Trace:  
No two adjacent characters are equal, so the answer remains 0. No replacements are needed.

**Example 3**  
Input: s = "aa", p = [0, 1]  
Output: 1  

Trace:  
Day array = [1, 2]  
Pair (0,1) both ‘a’ → min(1,2) = 1  
Answer is 1. After day 1 the string becomes "?a", which satisfies the condition.

## How to Use / Run Locally

1. Copy the solution code for the language you want into a file (for example Solution.cpp, Solution.java, solution.js or solution.py).
2. Add a simple main / driver function that reads the string and the permutation, creates a Solution object, calls the method, and prints the result.
3. Compile and run according to the language:

- C++: `g++ Solution.cpp -o solution && ./solution`
- Java: `javac Solution.java && java Solution`
- JavaScript: `node solution.js`
- Python3: `python3 solution.py`

Make sure the input format matches the problem (first the string, then the space-separated permutation values) or adjust the driver code to hard-code the sample inputs while testing.

## Notes & Optimizations

- The solution is already optimal at O(n) time and O(n) space. Further asymptotic improvement is not possible because we must examine every character and every entry of the permutation at least once.
- In C++ it is possible to reuse the permutation array itself to store the day values and save a few bytes, but the clarity of a separate day array is usually preferred.
- The algorithm correctly handles the case when multiple pairs share the same early replacement day; the max operation automatically picks the highest required day.
- Because the permutation guarantees every index appears exactly once, we never have to worry about an index that is never replaced.

This approach is both simple to implement and efficient enough for the tight constraints of the Minimum Days problem on GeeksforGeeks and similar platforms.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
