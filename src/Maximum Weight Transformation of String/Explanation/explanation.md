# Maximum Weight Transformation of String - Dynamic Programming Solution

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

You are given a string that contains only the characters A and B. You are allowed to toggle any character (change A to B or B to A). Every toggle you perform reduces the final weight by 1.

The weight of the final string is calculated like this:

- Every pair of adjacent characters that form an alternating pattern (AB or BA) adds 4 to the weight.
- These pairs cannot overlap. Each character can belong to at most one pair.
- Every character that is not part of any pair adds 1 to the weight.
- Finally you subtract the number of toggles you used.

Your task is to choose which characters to toggle and which non-overlapping pairs to form so that the total weight becomes as large as possible. This is a classic maximum weight transformation of string problem that appears frequently in coding interviews and on platforms like GeeksforGeeks.

## Constraints

- 1 ≤ length of string ≤ 10^5
- The string contains only the characters A and B

Because the string can be up to 100000 characters long, any solution slower than linear time will time out.

## Intuition

The first thing that stands out is that every character contributes at least 1 when it stays unpaired. Turning two neighbouring characters into an alternating pair upgrades their combined contribution from 2 to 4. The only cost is the number of toggles needed to make those two characters different.

If two characters are already different, the gain is 2. If they are the same, you must flip one of them, so the gain drops to 1. In both cases the gain is positive. Therefore it always helps to form pairs, but the pairs must not share any character.

This observation immediately turns the original problem into a simpler one: find a set of non-overlapping adjacent pairs that gives the maximum total gain, then add that gain to the length of the string.

## Approach

I treat every place between two consecutive characters as a possible pair slot. There are n-1 such slots for a string of length n.

For each slot I calculate a gain value:

- 2 when the two characters are already different
- 1 when they are the same

I now need the maximum sum of gains I can collect under the restriction that I never pick two consecutive slots (because consecutive slots would share a character).

A simple linear dynamic programming solves this perfectly. I keep an array dp where dp[i] stores the best total gain using only the first i slots. At every slot I decide whether to take it (and therefore skip the previous slot) or to skip it. The recurrence is:

dp[i] = max(dp[i-1], dp[i-2] + gain[i-1])

After the DP finishes, the answer is simply n plus the value stored in the last cell of the DP array.

This approach runs in linear time and is easy to implement in any language.

## Data Structures Used

- An integer array (or list) of size n-1 to store the gain of every possible pair slot.
- Another integer array of size n to store the dynamic programming results.

Both arrays are simple one-dimensional structures. They give constant-time access and keep the whole solution O(n) in both time and space.

## Operations & Behavior Summary

1. Read the input string and compute its length n.
2. Create a gain array of size n-1.
3. Walk through every pair of adjacent characters and fill the gain array with either 1 or 2.
4. Create a DP array of size n and initialise the first cell to 0.
5. For every slot from 1 to n-1 decide whether taking the current slot or skipping it produces a better total.
6. Return n plus the final DP value.

The algorithm never modifies the original string. It only looks at pairs and decides which ones to “claim”.

## Complexity

| Complexity Type | Value | Explanation |
|-----------------|-------|-------------|
| Time Complexity | O(n) | One linear pass to build the gain array and one linear pass for the DP. n is the length of the string. |
| Space Complexity | O(n) | Two arrays of size roughly n are used. The space can be reduced to O(1) with a couple of variables if needed, but the linear version is clearer. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int getMaxWeight(string &s) {
        int n = s.size();
        if (n == 0) return 0;
        int m = n - 1;
        vector<int> gain(m);
        for (int i = 0; i < m; i++) {
            gain[i] = (s[i] == s[i + 1] ? 1 : 2);
        }
        vector<int> dp(m + 1, 0);
        for (int i = 1; i <= m; i++) {
            dp[i] = max(dp[i - 1], (i >= 2 ? dp[i - 2] : 0) + gain[i - 1]);
        }
        return n + dp[m];
    }
};
```

### Java

```java
class Solution {
    public int getMaxWeight(String s) {
        int n = s.length();
        if (n == 0) return 0;
        int m = n - 1;
        int[] gain = new int[m];
        for (int i = 0; i < m; i++) {
            gain[i] = (s.charAt(i) == s.charAt(i + 1) ? 1 : 2);
        }
        int[] dp = new int[m + 1];
        for (int i = 1; i <= m; i++) {
            dp[i] = Math.max(dp[i - 1], (i >= 2 ? dp[i - 2] : 0) + gain[i - 1]);
        }
        return n + dp[m];
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
    getMaxWeight(s) {
        let n = s.length;
        if (n === 0) return 0;
        let m = n - 1;
        let gain = new Array(m);
        for (let i = 0; i < m; i++) {
            gain[i] = (s[i] === s[i + 1] ? 1 : 2);
        }
        let dp = new Array(m + 1).fill(0);
        for (let i = 1; i <= m; i++) {
            dp[i] = Math.max(dp[i - 1], (i >= 2 ? dp[i - 2] : 0) + gain[i - 1]);
        }
        return n + dp[m];
    }
}
```

### Python3

```python
class Solution:
    def getMaxWeight(self, s):
        n = len(s)
        if n == 0:
            return 0
        m = n - 1
        gain = [1 if s[i] == s[i + 1] else 2 for i in range(m)]
        dp = [0] * (m + 1)
        for i in range(1, m + 1):
            dp[i] = max(dp[i - 1], (dp[i - 2] if i >= 2 else 0) + gain[i - 1])
        return n + dp[m]
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in all four languages. Here is what happens in order.

First I obtain the length of the string. If the string is empty I return 0 immediately, although the constraints guarantee it is never empty.

I then create a gain array whose size is one less than the string length. For every index i I look at the characters at positions i and i+1. When they differ the gain is 2; when they are equal the gain is 1. This single pass captures the entire cost of forming each possible pair.

Next I allocate a DP array one element larger than the gain array. The cell dp[0] stays 0 because no slots means no gain. For every subsequent index i I compute two numbers:

- the best result if I ignore the current slot (simply dp[i-1])
- the best result if I take the current slot (dp[i-2] plus the gain of the current slot)

I store the larger of those two numbers. Because every gain is positive, the DP never leaves a useful pair behind.

When the loop ends, dp[n-1] holds the maximum extra weight I can obtain from pairs. Adding the original length n gives the final answer, because every character still contributes its base weight of 1.

Edge cases such as a string of length 1 or 2 are handled automatically by the same recurrence. No special branches are required.

## Examples

**Example 1**  
Input: AA  
Output: 3  

The only possible pair has gain 1 (the two characters are the same). Taking it produces total weight 2 + 1 = 3. Leaving it produces only 2. So the answer is 3.

**Example 2**  
Input: ABB  
Output: 5  

Possible gains: first pair AB gives 2, second pair BB gives 1.  
DP chooses the first pair (gain 2). Final answer = 3 + 2 = 5. Choosing the second pair would give only 4, which is worse.

**Example 3**  
Input: ABAB  
Output: 8  

Gains are 2, 2, 2. The DP can take the first and third pairs for a total gain of 4. Answer = 4 + 4 = 8, which is optimal.

## How to Use / Run Locally

**C++**  
Save the code in a file named main.cpp. Compile with  
g++ -std=c++17 main.cpp -o main  
Run with  
./main  
and paste the input string when prompted (or hard-code a test case inside the main function).

**Java**  
Save the code in Solution.java. Compile with  
javac Solution.java  
Run with  
java Solution  

**JavaScript**  
Save the code in solution.js. Run with  
node solution.js  
(You may need to add a small driver that calls the method and prints the result.)

**Python3**  
Save the code in solution.py. Run with  
python3 solution.py  

In all languages you can replace the function body with a hard-coded test string to verify the output quickly.

## Notes & Optimizations

- The solution already meets the expected O(n) time and O(n) space limits.
- Space can be reduced to O(1) by keeping only the last two DP values instead of the whole array. This is a useful optimisation when memory is extremely tight.
- Because all gains are positive, a greedy “take every other high-gain pair” approach sometimes works, but the DP is safer and still linear.
- The same technique can be reused for any problem that asks for a maximum-weight non-overlapping selection of adjacent pairs on a string or array.

## Author

[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
