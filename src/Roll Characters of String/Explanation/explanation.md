# Roll Characters of String - Efficient Prefix Increment Solution

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

You are given a string `s` that contains only lowercase English letters and an integer array `roll`.  

For every value `roll[i]` you must increment the first `roll[i]` characters of the current string by one position in the alphabet. When a character is `'z'` it wraps around to `'a'`.  

All operations happen one after another on the updated string. After every roll has been applied you must return the final string.  

This is a classic string manipulation problem that appears in competitive programming contests and coding interviews under topics such as prefix updates, range increments, and efficient string transformation.

## Constraints

- `1 ≤ s.size(), roll.size() ≤ 10^5`
- `1 ≤ roll[i] ≤ s.size()`
- `s` contains only lowercase English letters

Because both the string length and the number of roll operations can reach 100000, any solution that actually walks over the prefixes for every roll will be too slow.

## Intuition

The first thing I noticed was the size limit. Doing each roll one by one would take roughly n × m operations and easily exceed the time limit.  

I then realized that every roll only ever touches a prefix of the string. So the final value of any character depends only on how many times that character was covered by the given rolls.  

Once I focused on counting the coverage of each index instead of performing the rolls, the problem became a simple frequency-and-suffix-sum task.

## Approach

I create a frequency array of size n+1.  

For every value in the roll array I increment the corresponding slot in the frequency array. After this step `freq[k]` tells me how many times a roll of exact length k appears.  

I then convert the frequency array into a suffix-sum array by walking from right to left. After this conversion `freq[i]` stores the total number of rolls whose length is at least i.  

That value is exactly the number of times the character at position i-1 must be incremented.  

I walk through the string once, add the pre-computed shift (modulo 26) to each character, and write the new letter back.  

Because addition is commutative, the original order of the rolls does not matter. Only the total count for each position matters.

## Data Structures Used

- Frequency / count array of size n+1  
  Stores how many times each possible prefix length appears and later holds the suffix sums.  
  Chosen because it lets me answer “how many rolls cover this index?” in constant time after a linear preprocessing pass.

- The original string (or a character array copy)  
  Used to apply the final shifts in place or to build the result.

No other data structures are required. The solution stays linear in both time and extra space.

## Operations & Behavior Summary

1. Allocate a count array of size n+1 and fill it with zeros.  
2. For every number in the roll array, increase the count of that exact length.  
3. Convert the count array into suffix sums so each position stores the total number of covering rolls.  
4. For every character, read its total shift from the suffix-sum array, reduce it modulo 26, and update the character.  
5. Return the transformed string.

## Complexity

| Type              | Value     | Explanation                                                                 |
|-------------------|-----------|-----------------------------------------------------------------------------|
| Time Complexity   | O(n + m)  | n = length of the string, m = length of the roll array. One pass to count, one pass to build suffix sums, one pass to update the string. |
| Space Complexity  | O(n)      | Extra array of size n+1 is allocated. No other significant memory is used.  |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    string findRollOut(string& s, vector<int>& roll) {
        int n = s.size();
        vector<int> freq(n + 1, 0);
        for (int x : roll) freq[x]++;
        for (int i = n - 1; i >= 1; i--) freq[i] += freq[i + 1];
        for (int i = 0; i < n; i++) {
            int shift = freq[i + 1] % 26;
            s[i] = ((s[i] - 'a' + shift) % 26) + 'a';
        }
        return s;
    }
};
```

### Java
```java
class Solution {
    public String findRollOut(String s, int[] roll) {
        int n = s.length();
        int[] freq = new int[n + 1];
        for (int x : roll) freq[x]++;
        for (int i = n - 1; i >= 1; i--) freq[i] += freq[i + 1];
        char[] arr = s.toCharArray();
        for (int i = 0; i < n; i++) {
            int shift = freq[i + 1] % 26;
            arr[i] = (char)(((arr[i] - 'a' + shift) % 26) + 'a');
        }
        return new String(arr);
    }
}
```

### JavaScript
```javascript
/**
 * @params {string} s
 * @params {number[]} roll
 * @return {string}
 */
class Solution {
    findRollOut(s, roll) {
        let n = s.length;
        let freq = new Array(n + 1).fill(0);
        for (let x of roll) freq[x]++;
        for (let i = n - 1; i >= 1; i--) freq[i] += freq[i + 1];
        let arr = s.split('');
        for (let i = 0; i < n; i++) {
            let shift = freq[i + 1] % 26;
            arr[i] = String.fromCharCode(((arr[i].charCodeAt(0) - 97 + shift) % 26) + 97);
        }
        return arr.join('');
    }
}
```

### Python3
```python
class Solution:
    def findRollOut(self, s, roll):
        n = len(s)
        freq = [0] * (n + 1)
        for x in roll:
            freq[x] += 1
        for i in range(n - 1, 0, -1):
            freq[i] += freq[i + 1]
        arr = list(s)
        for i in range(n):
            shift = freq[i + 1] % 26
            arr[i] = chr((ord(arr[i]) - 97 + shift) % 26 + 97)
        return ''.join(arr)
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The core idea is identical in every language.  

First I record the length of the string as n.  

I create a frequency array of size n+1. Then I loop over the roll array and simply increment the counter that matches each given length. At this point the array only knows exact lengths.  

Next I turn the array into suffix sums. I start from the rightmost index and keep adding the next value into the current one. After this loop finishes, looking up index i immediately tells me how many rolls cover the character at position i-1.  

I walk through the string (or a mutable character array) one index at a time. For each character I fetch the pre-computed shift, take it modulo 26, add it to the original letter, and store the new letter.  

In C++ and Python the string itself can be modified in place. In Java and JavaScript I usually convert the string into a character array first because strings are immutable, then build the final string from that array.  

The modulo-26 step guarantees that the alphabet wraps correctly from ‘z’ back to ‘a’. Because every character is updated exactly once with its total shift, the solution never needs to simulate the rolls in order.

## Examples

**Example 1**  
Input: s = "bca", roll = [1, 2, 3]  
Output: "eeb"  

Trace:  
- Position 0 is covered by all three rolls → shift 3 → ‘b’ becomes ‘e’  
- Position 1 is covered by the last two rolls → shift 2 → ‘c’ becomes ‘e’  
- Position 2 is covered by the last roll → shift 1 → ‘a’ becomes ‘b’  
Final string: "eeb"

**Example 2**  
Input: s = "zcza", roll = [1, 1, 3, 4]  
Output: "debb"  

Trace:  
- Position 0 is covered four times → ‘z’ + 4 → ‘d’  
- Position 1 is covered twice → ‘c’ + 2 → ‘e’  
- Position 2 is covered twice → ‘z’ + 2 → ‘b’  
- Position 3 is covered once → ‘a’ + 1 → ‘b’  
Final string: "debb"

**Example 3**  
Input: s = "abc", roll = [1, 1, 1]  
Output: "dbc"  

Trace:  
- Only the first character is covered three times → ‘a’ + 3 → ‘d’  
- The other two characters stay unchanged.

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `main.cpp`.  
2. Compile with `g++ -std=c++17 main.cpp -o main`.  
3. Run with `./main`.  
You can hard-code the input inside `main` or read from standard input.

**Java**  
1. Save the code in a file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution`.  
Add a `main` method that creates a `Solution` object and calls `findRollOut` with sample data.

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with `node solution.js`.  
You can add a few console.log statements at the bottom to test the function.

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run with `python3 solution.py`.  
Add a few print statements at the bottom to verify the output for the sample inputs.

## Notes & Optimizations

- The modulo-26 operation can be performed either while updating the character or after computing the total shift; both are correct.  
- If the problem ever allowed larger alphabet sizes or negative shifts, the same counting idea would still work; only the final arithmetic would change.  
- An alternative approach using a difference array is also possible and has the same complexity, but the frequency + suffix-sum method is slightly simpler to implement and debug.  
- Because the maximum number of rolls is 1e5, the total shift per character never exceeds 1e5, so a 32-bit integer is safe in every language.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)