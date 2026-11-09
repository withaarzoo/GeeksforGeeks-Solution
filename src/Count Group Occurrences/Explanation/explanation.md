# Count Group Occurrences - GeeksforGeeks Solution

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

You are given a string `s` made of lowercase English letters and an integer `k`.  

The task is to count how many distinct characters appear in exactly `k` groups inside the string.  

A group means one or more consecutive same characters. For example, in the string `"aabbcca"` the groups are `"aa"`, `"bb"`, `"cc"` and `"a"`.  

You need to find the number of different characters that form exactly `k` such groups.

## Constraints

- 1 ≤ length of `s` ≤ 10⁵
- 1 ≤ `k` ≤ 10³
- `s` contains only lowercase English alphabets

## Intuition

The first thing I noticed is that the length of each group does not matter. I only need to know how many separate runs each letter creates.  

Whenever the character changes, a new group starts. So a single left-to-right scan is enough. I can keep a simple count for every letter that tells me how many times it started a new group. At the end I just check which of those counts equal `k`.

## Approach

I use a fixed-size array of 26 counters, one for each letter.  

I walk through the string once. Every time I see a character that is different from the previous one (or I am at the first position), I increase the counter of that letter.  

After the scan finishes, I look at the 26 counters and count how many of them hold the exact value `k`. That final number is the answer.

This keeps the solution linear in the length of the string and uses only constant extra memory.

## Data Structures Used

- A fixed array of size 26.  
  It stores the group count for each lowercase letter. Because the alphabet size is constant, the array gives O(1) access and O(1) space.

No maps, sets or dynamic lists are required.

## Operations & Behavior Summary

1. Create an array `cnt[26]` and set every entry to 0.  
2. Scan the string from left to right.  
3. When a new group starts (first character or different from previous), increment the matching counter.  
4. After the scan, iterate over the 26 counters.  
5. Count how many counters equal `k` and return that value.

## Complexity

| Type              | Value | Explanation                                      |
|-------------------|-------|--------------------------------------------------|
| Time Complexity   | O(n)  | One pass over the string of length n             |
| Space Complexity  | O(1)  | Only a fixed array of 26 integers is used        |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int getCount(string &s, int k) {
        int cnt[26] = {0};
        int n = s.size();
        for (int i = 0; i < n; i++) {
            if (i == 0 || s[i] != s[i - 1]) {
                cnt[s[i] - 'a']++;
            }
        }
        int ans = 0;
        for (int i = 0; i < 26; i++) {
            if (cnt[i] == k) ans++;
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    int getCount(String s, int k) {
        int[] cnt = new int[26];
        int n = s.length();
        for (int i = 0; i < n; i++) {
            if (i == 0 || s.charAt(i) != s.charAt(i - 1)) {
                cnt[s.charAt(i) - 'a']++;
            }
        }
        int ans = 0;
        for (int i = 0; i < 26; i++) {
            if (cnt[i] == k) ans++;
        }
        return ans;
    }
}
```

### JavaScript
```javascript
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

class Solution {
    getCount(s, k) {
        let cnt = new Array(26).fill(0);
        let n = s.length;
        for (let i = 0; i < n; i++) {
            if (i === 0 || s[i] !== s[i - 1]) {
                cnt[s.charCodeAt(i) - 97]++;
            }
        }
        let ans = 0;
        for (let i = 0; i < 26; i++) {
            if (cnt[i] === k) ans++;
        }
        return ans;
    }
}

```

### Python3
```python
class Solution:
    def getCount (self, s, k):
        cnt = [0] * 26
        n = len(s)
        for i in range(n):
            if i == 0 or s[i] != s[i - 1]:
                cnt[ord(s[i]) - ord('a')] += 1
        ans = 0
        for i in range(26):
            if cnt[i] == k:
                ans += 1
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the same logic.

I first allocate a 26-slot array and fill it with zeros. Each index maps to a letter (`'a'` → 0, `'b'` → 1, …).

Then I loop through every character of the string.  
At position `i` I check two simple conditions:  
- Is this the first character?  
- Or is the current character different from the one before it?  

If either condition is true, a new group has begun, so I add one to the counter that belongs to the current letter.

After the loop ends, every letter’s total number of groups sits in the array.  
I make a second short loop over the 26 slots and count how many of them equal the given `k`. That count becomes the return value.

Edge cases are handled naturally:  
- A string of all identical characters produces only one group.  
- A string of all different characters produces one group per character.  
- When `k` is larger than any possible group count, the answer is simply zero.

The same reasoning applies in C++, Java, JavaScript and Python3. Only the syntax for character-to-index conversion and array handling differs slightly between languages.

## Examples

**Example 1**  
Input: `s = "abc"`, `k = 1`  
Groups: `"a"`, `"b"`, `"c"`  
Each letter forms exactly one group.  
Output: `3`

**Example 2**  
Input: `s = "geeksforgeeks"`, `k = 2`  
Groups for `g`: 2, `e`: 2, `k`: 2, `s`: 2, others: 1 or 0  
Four letters appear in exactly two groups.  
Output: `4`

**Example 3**  
Input: `s = "aaaaa"`, `k = 2`  
Only one group exists for letter `a`.  
No letter appears in exactly two groups.  
Output: `0`

## How to Use / Run Locally

**C++**  
1. Copy the solution into a file named `main.cpp`.  
2. Compile: `g++ -o main main.cpp`  
3. Run: `./main`  
   (You will need to add a simple driver that reads `s` and `k` and prints the result.)

**Java**  
1. Place the class in a file named `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run with a driver class that creates an object and calls `getCount`.

**JavaScript**  
1. Save the class in a `.js` file.  
2. Run with Node: `node filename.js`  
   (Add a few console.log test cases at the bottom.)

**Python3**  
1. Save the class in a `.py` file.  
2. Run: `python3 filename.py`  
   (Add a short test block under the class definition.)

## Notes & Optimizations

- The solution already runs in linear time and constant space, which is optimal for the given constraints.  
- Because the alphabet is fixed at 26, replacing the array with a hash map would only add overhead.  
- The same idea works for any alphabet size as long as you replace the fixed array with a map; the time stays O(n) while space becomes O(unique characters).  
- Watch for the empty-string case (though constraints guarantee length ≥ 1) and for `k` larger than the number of groups any letter can form.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
