---

# Min Cost To Make Two Strings Identical

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

You are given two strings s1 and s2 along with two integers costS1 and costS2.  
costS1 is the cost of deleting one character from s1 and costS2 is the cost of deleting one character from s2.  

The goal is to make both strings identical by deleting any number of characters from either string. The relative order of the remaining characters must stay the same.  

You need to return the minimum total cost required to achieve this.

## Constraints

- 1 ≤ |s1|, |s2| ≤ 1000
- 1 ≤ costS1, costS2 ≤ 10^5

## Intuition

The first thing I noticed is that the characters we keep must form a common subsequence of both strings.  
Everything else has to be deleted.  

So the problem reduces to finding the longest common subsequence (LCS). Once I know the length of the LCS, the leftover characters in each string tell me exactly how many deletions are needed, and I just multiply those counts by the given costs.

## Approach

I solve this using dynamic programming for the classic longest common subsequence problem.  

I create a DP table where dp[i][j] stores the length of the LCS using the first i characters of s1 and the first j characters of s2.  

If the current characters match, I take the diagonal value and add one.  
If they do not match, I take the maximum of the value from the top or the left cell.  

After filling the table, the bottom-right cell gives the LCS length.  
The final answer is simply:  
(length of s1 − LCS) × costS1 + (length of s2 − LCS) × costS2.  

To keep space low I only keep two rolling arrays instead of the full 2-D table.

## Data Structures Used

- Two 1-D arrays (prev and curr) of size equal to the shorter string + 1.  
  These act as the previous and current rows of the DP table and let me compute the LCS length with O(min(n, m)) extra space.

## Operations & Behavior Summary

1. Make sure the first string is the longer one (swap if needed). This keeps the DP arrays as short as possible.  
2. Initialize two arrays of zeros.  
3. For every character in the longer string:  
   - For every character in the shorter string:  
     - If characters match → extend the previous common subsequence.  
     - Else → take the best of ignoring either character.  
4. After processing one full row, move the current row into the previous row.  
5. When finished, the last cell holds the LCS length.  
6. Compute the deletion cost from the leftover characters and return it.

## Complexity

| Type              | Value          | Explanation |
|-------------------|----------------|-------------|
| Time Complexity   | O(n × m)       | n and m are the lengths of the two strings. Every cell of the logical DP table is filled once. |
| Space Complexity  | O(min(n, m))   | Only two arrays of size equal to the shorter string are kept. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int findMinCost(string &s1, string &s2, int costS1, int costS2) {
        int n = s1.size(), m = s2.size();
        if (n < m) {
            swap(s1, s2);
            swap(n, m);
            swap(costS1, costS2);
        }
        vector<int> prev(m + 1, 0), curr(m + 1, 0);
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1])
                    curr[j] = prev[j - 1] + 1;
                else
                    curr[j] = max(prev[j], curr[j - 1]);
            }
            prev = curr;
        }
        int lcs = prev[m];
        return (n - lcs) * costS1 + (m - lcs) * costS2;
    }
};
```

### Java
```java
class Solution {
    public int findMinCost(String s1, String s2, int costS1, int costS2) {
        int n = s1.length(), m = s2.length();
        if (n < m) {
            String temp = s1; s1 = s2; s2 = temp;
            int t = n; n = m; m = t;
            t = costS1; costS1 = costS2; costS2 = t;
        }
        int[] prev = new int[m + 1];
        int[] curr = new int[m + 1];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1))
                    curr[j] = prev[j - 1] + 1;
                else
                    curr[j] = Math.max(prev[j], curr[j - 1]);
            }
            int[] temp = prev; prev = curr; curr = temp;
        }
        int lcs = prev[m];
        return (n - lcs) * costS1 + (m - lcs) * costS2;
    }
}
```

### JavaScript
```javascript
/**
 * @param {string} s1
 * @param {string} s2
 * @param {number} costS1
 * @param {number} costS2
 * @returns {number}
 */

class Solution {
    findMinCost(s1, s2, costS1, costS2) {
        let n = s1.length, m = s2.length;
        if (n < m) {
            [s1, s2] = [s2, s1];
            [n, m] = [m, n];
            [costS1, costS2] = [costS2, costS1];
        }
        let prev = new Array(m + 1).fill(0);
        let curr = new Array(m + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                if (s1[i - 1] === s2[j - 1])
                    curr[j] = prev[j - 1] + 1;
                else
                    curr[j] = Math.max(prev[j], curr[j - 1]);
            }
            [prev, curr] = [curr, prev];
        }
        let lcs = prev[m];
        return (n - lcs) * costS1 + (m - lcs) * costS2;
    }
}
```

### Python3
```python
class Solution:
    def findMinCost(self, s1: str, s2: str, costS1: int, costS2: int) -> int:
        n, m = len(s1), len(s2)
        if n < m:
            s1, s2 = s2, s1
            n, m = m, n
            costS1, costS2 = costS2, costS1
        prev = [0] * (m + 1)
        curr = [0] * (m + 1)
        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s1[i - 1] == s2[j - 1]:
                    curr[j] = prev[j - 1] + 1
                else:
                    curr[j] = max(prev[j], curr[j - 1])
            prev, curr = curr, prev
        lcs = prev[m]
        return (n - lcs) * costS1 + (m - lcs) * costS2
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

I start by swapping the strings (and their costs) if the first one is shorter. This guarantees that the DP arrays are sized by the shorter length and saves memory.

I create two arrays filled with zeros. One holds the results of the previous character of the longer string; the other will hold the results for the current character.

I loop over every character of the longer string. Inside that loop I walk through every character of the shorter string.

When the two characters are the same I set the current cell to the diagonal value plus one. That means I found a matching pair and can extend an earlier common subsequence.

When the characters differ I simply choose the larger of the two options: the value that ignores the current character of the longer string, or the value that ignores the current character of the shorter string.

After finishing one complete row I swap (or copy) the arrays so the next iteration can use the freshly computed values as the new previous row.

When the outer loop ends, the last entry of the previous array contains the length of the longest common subsequence.

The characters that were not part of this LCS must be deleted. Multiplying the leftover counts by their respective costs gives the minimum total cost.

The same logic is followed in all four languages; only the syntax for arrays, loops and swapping differs.

## Examples

**Example 1**  
Input: s1 = "abcd", s2 = "acdb", costS1 = 10, costS2 = 20  
Output: 30  

Trace:  
LCS length is 3 ("acd").  
Delete 1 character from s1 (cost 10) and 1 character from s2 (cost 20).  
Total = 30.

**Example 2**  
Input: s1 = "ef", s2 = "gh", costS1 = 10, costS2 = 20  
Output: 60  

Trace:  
No common characters, so LCS length is 0.  
Delete both characters from s1 (20) and both from s2 (40).  
Total = 60.

**Example 3**  
Input: s1 = "abc", s2 = "abc", costS1 = 5, costS2 = 7  
Output: 0  

Trace:  
LCS length is 3. No deletions needed, cost is zero.

## How to Use / Run Locally

**C++**  
1. Copy the C++ code into a file named `main.cpp`.  
2. Compile: `g++ main.cpp -o main`  
3. Run: `./main`  
   (You will need to add a small driver that reads the inputs and calls the function.)

**Java**  
1. Copy the Java code into a file named `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`  
   (Add a main method that reads input and prints the result.)

**JavaScript**  
1. Copy the JavaScript code into a file named `solution.js`.  
2. Run with Node: `node solution.js`  
   (Add a few lines at the bottom to read input and call the method.)

**Python3**  
1. Copy the Python code into a file named `solution.py`.  
2. Run: `python3 solution.py`  
   (Add a driver that takes input and prints the returned value.)

## Notes & Optimizations

- The space-optimized version is important because the constraints allow strings up to length 1000; a full 2-D table would use more memory than necessary.  
- If the costs were the same for both strings the problem would reduce to a pure LCS length calculation, but here the different costs force us to keep the leftover counts separate.  
- Edge cases worth checking: empty strings (though constraints start from length 1), completely identical strings, and strings with no common characters.  
- An alternative approach could use recursion with memoization, but the bottom-up DP is clearer and usually faster in practice for this size.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)