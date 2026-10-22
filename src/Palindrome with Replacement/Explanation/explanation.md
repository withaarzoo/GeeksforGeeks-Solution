# Palindrome with Replacement – GeeksforGeeks Solution

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

You are given a string that contains only lowercase English letters and the special character ‘?’. Your task is to replace every ‘?’ with a lowercase letter so that the final string becomes a palindrome.

If it is possible to form a valid palindrome, you must also make the sum of the absolute differences of ASCII values between every pair of adjacent characters as small as possible. Return that minimum sum.

If no replacement can turn the string into a palindrome, return -1.

This is a classic GeeksforGeeks problem that tests both string manipulation and greedy thinking under the constraint of forming a palindrome while minimizing the total adjacent character difference.

## Constraints

- 1 ≤ |s| ≤ 10⁵
- s consists only of lowercase English letters and the character ‘?’

Because the length can be up to 100 000, any solution that is slower than linear time will time out.

## Intuition

The first thing I noticed is that a string can become a palindrome only if every pair of characters that face each other are the same (or can be made the same).  

Whenever both positions already have fixed letters and those letters are different, the answer is immediately -1.  

When one side is a letter and the other is ‘?’, I can simply copy the letter across. After doing this for the whole string, every fixed letter is already mirrored correctly.  

The remaining ‘?’ characters can be filled in the cheapest possible way: keep the same letter as long as possible and change only when a new fixed letter forces a change. The total amount of change that happens is exactly the minimum sum we are looking for.

## Approach

1. Walk from both ends toward the middle.  
   - If both characters are fixed and different → return -1.  
   - If one is ‘?’ and the other is a letter → copy the letter to the ‘?’ side.  

2. After the mirroring pass, the string is consistent with the palindrome requirement.  

3. Find the first real letter (skip leading ‘?’). If the whole string is still ‘?’, the answer is 0.  

4. From that first letter onward, keep a running “previous” character.  
   - When you meet a ‘?’, treat it as the previous character (difference 0).  
   - When you meet a real letter, add the absolute ASCII difference to the answer and update the previous character.  

5. Because the earlier mirroring already forced symmetry, the sum collected on one half automatically covers the whole string.

This greedy “stay the same until forced to change” strategy gives the minimum possible adjacent sum.

## Data Structures Used

- A simple character array (or mutable string) – used to replace ‘?’ in place.  
- A few integer variables for indices and the running answer.  
- No extra stacks, maps or queues are required; everything is done with constant extra space.

## Operations & Behavior Summary

- First pass: enforce the palindrome constraint by mirroring fixed letters and detecting conflicts.  
- Second pass: locate the leftmost non-‘?’ character.  
- Third pass: walk from left to right, filling remaining ‘?’ with the previous character and accumulating the absolute differences only when a real letter forces a change.  
- Return the accumulated sum (or -1 if a conflict was found earlier).

## Complexity

| Complexity       | Value | Explanation |
|------------------|-------|-------------|
| Time Complexity  | O(n)  | We scan the string a constant number of times. n is the length of the input string. |
| Space Complexity | O(1)  | Only a few extra variables are used; the input itself may be modified in place. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int minimumSum(string &s) {
        int n = s.size();
        for (int i = 0; i < n / 2; i++) {
            if (s[i] != '?' && s[n - 1 - i] != '?' && s[i] != s[n - 1 - i])
                return -1;
            if (s[i] == '?' && s[n - 1 - i] != '?')
                s[i] = s[n - 1 - i];
            else if (s[i] != '?' && s[n - 1 - i] == '?')
                s[n - 1 - i] = s[i];
        }
        int i = 0;
        while (i < n && s[i] == '?') i++;
        if (i == n) return 0;
        char prev = s[i];
        int ans = 0;
        for (int j = i + 1; j < n; j++) {
            if (s[j] == '?') s[j] = prev;
            ans += abs(s[j] - prev);
            prev = s[j];
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int minimumSum(String s) {
        char[] a = s.toCharArray();
        int n = a.length;
        for (int i = 0; i < n / 2; i++) {
            if (a[i] != '?' && a[n - 1 - i] != '?' && a[i] != a[n - 1 - i])
                return -1;
            if (a[i] == '?' && a[n - 1 - i] != '?')
                a[i] = a[n - 1 - i];
            else if (a[i] != '?' && a[n - 1 - i] == '?')
                a[n - 1 - i] = a[i];
        }
        int i = 0;
        while (i < n && a[i] == '?') i++;
        if (i == n) return 0;
        char prev = a[i];
        int ans = 0;
        for (int j = i + 1; j < n; j++) {
            if (a[j] == '?') a[j] = prev;
            ans += Math.abs(a[j] - prev);
            prev = a[j];
        }
        return ans;
    }
}
```

### JavaScript
```javascript
/**
 * @param {string} s
 * @returns {number}
 */
class Solution {
    minimumSum(s) {
        let a = s.split('');
        let n = a.length;
        for (let i = 0; i < Math.floor(n / 2); i++) {
            if (a[i] !== '?' && a[n - 1 - i] !== '?' && a[i] !== a[n - 1 - i])
                return -1;
            if (a[i] === '?' && a[n - 1 - i] !== '?')
                a[i] = a[n - 1 - i];
            else if (a[i] !== '?' && a[n - 1 - i] === '?')
                a[n - 1 - i] = a[i];
        }
        let i = 0;
        while (i < n && a[i] === '?') i++;
        if (i === n) return 0;
        let prev = a[i];
        let ans = 0;
        for (let j = i + 1; j < n; j++) {
            if (a[j] === '?') a[j] = prev;
            ans += Math.abs(a[j].charCodeAt(0) - prev.charCodeAt(0));
            prev = a[j];
        }
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def minimumSum(self, s: str) -> int:
        a = list(s)
        n = len(a)
        for i in range(n // 2):
            if a[i] != '?' and a[n - 1 - i] != '?' and a[i] != a[n - 1 - i]:
                return -1
            if a[i] == '?' and a[n - 1 - i] != '?':
                a[i] = a[n - 1 - i]
            elif a[i] != '?' and a[n - 1 - i] == '?':
                a[n - 1 - i] = a[i]
        i = 0
        while i < n and a[i] == '?':
            i += 1
        if i == n:
            return 0
        prev = a[i]
        ans = 0
        for j in range(i + 1, n):
            if a[j] == '?':
                a[j] = prev
            ans += abs(ord(a[j]) - ord(prev))
            prev = a[j]
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax changes.

- Convert the string into a mutable array of characters so we can overwrite ‘?’.  
- Loop only up to the middle of the string. For each index i look at the mirror index n-1-i.  
  - Conflict of two fixed different letters → return -1.  
  - One side ‘?’ → copy the letter from the other side.  
- After this loop every fixed letter is correctly mirrored.  
- Skip any leading ‘?’ that may still exist. If we reach the end, every character was ‘?’ and the answer is 0.  
- Remember the first real letter as “prev”.  
- Walk from that position to the end of the string:  
  - ‘?’ is replaced by the current prev (cost 0).  
  - A real letter adds |current - prev| to the answer and becomes the new prev.  
- Because of the earlier mirroring, the total variation we just calculated is already the minimum possible sum for the whole palindrome.  

Edge cases handled automatically:  
- Entirely ‘?’ → 0  
- Already a palindrome with no ‘?’ → just the sum of existing adjacent differences  
- Leading or trailing ‘?’ blocks → filled with the nearest fixed letter, costing nothing extra  

## Examples

**Example 1**  
Input: `a???c??c????`  
After mirroring: `a???cccc???a`  
Filling from the left: the first jump is from ‘a’ to ‘c’ (cost 2) and the symmetric jump from ‘c’ to ‘a’ (cost 2).  
Total = 4.  
One possible resulting string: `abbbccccbbba` (or `aaaaccccccca`) – both give the same minimum sum.

**Example 2**  
Input: `a???c??c???c`  
The first and last characters are different fixed letters, so it is impossible to form a palindrome.  
Output: -1

**Example 3**  
Input: `?????`  
Everything is free. We can fill the whole string with the same letter.  
Output: 0

## How to Use / Run Locally

**C++**  
```bash
g++ -std=c++17 solution.cpp -o solution
./solution
```

**Java**  
```bash
javac Solution.java
java Solution
```

**JavaScript**  
```bash
node solution.js
```

**Python3**  
```bash
python3 solution.py
```

Replace the empty function body with the code from the corresponding section above, then feed the input string according to the problem’s input format.

## Notes & Optimizations

- The solution is already optimal in both time and space for the given constraints.  
- An alternative approach would be to collect all fixed “anchor” characters and sum the absolute differences between consecutive anchors; the result is the same.  
- Because we never go back and forth between letters, the total variation is minimal. Any extra oscillation would only increase the sum.  
- The algorithm works correctly even when long runs of ‘?’ appear at the beginning, middle or end of the string.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)