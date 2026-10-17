# Convert One String to Another with Constraints

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

This is a classic string transformation problem often seen on GeeksforGeeks and other DSA platforms. You are given two strings `s1` and `s2`. Both strings contain only the characters `'A'`, `'B'`, and `'#'`.

Your task is to check whether you can turn `s1` into `s2` by moving characters under these strict rules:

- `'A'` can only move left.
- `'B'` can only move right.
- `'A'` and `'B'` can never cross each other.
- `'#'` acts as an empty space that letters can slide into.

Moving a character one step means swapping it with the neighboring `'#'`. The length of the string never changes. Return `true` if the transformation is possible, otherwise return `false`.

This problem tests your understanding of two-pointer techniques, position constraints, and order preservation in strings.

## Constraints

- `1 ≤ s1.size(), s2.size() ≤ 10^5`
- Both strings consist only of characters `'A'`, `'B'`, and `'#'`
- Expected Time Complexity: O(n + m)
- Expected Auxiliary Space: O(1)

## Intuition

The first thing that stands out is that `'A'` and `'B'` can never pass through each other. That means the relative order of all the real letters must stay exactly the same. The only thing that can change is the placement of the empty `'#'` spaces.

Because `'A'` can only move left, every `'A'` in `s1` must already be at a position greater than or equal to its matching position in `s2`. The opposite is true for every `'B'`. Once you notice these two facts, a clean two-pointer scan becomes the natural way to verify everything in a single pass.

## Approach

First compare the lengths of the two strings. If they are different, the answer is immediately false because every legal move is just a swap and swaps never change length.

Next walk through both strings with two pointers. Skip over every `'#'`. Whenever both pointers land on a real letter, check three things:

1. The letters must be the same.
2. If the letter is `'A'`, its index in `s1` must be ≥ its index in `s2`.
3. If the letter is `'B'`, its index in `s1` must be ≤ its index in `s2`.

If any check fails, return false. After the main scan finishes, make sure both pointers have reached the end of their strings (ignoring any trailing empty spaces). Only then return true.

This approach correctly enforces both the order of letters and the directional movement limits without needing extra memory.

## Data Structures Used

No extra data structures are required. The solution works entirely with a few integer indices. This keeps the auxiliary space at O(1) and makes the code suitable for the large constraints (up to 10^5 characters).

## Operations & Behavior Summary

1. Compare lengths. Unequal lengths → false.
2. Initialize two pointers at the start of each string.
3. Advance each pointer past consecutive `'#'` characters.
4. When both pointers point at letters:
   - Verify the letters match.
   - Verify the movement direction is allowed for that letter.
   - Move both pointers forward.
5. After the loop, skip any remaining trailing `'#'`.
6. Return true only if both pointers have reached the exact end of their strings.

## Complexity

| Complexity       | Value | Explanation |
|------------------|-------|-------------|
| Time Complexity  | O(n)  | Each character is examined a constant number of times where n is the common length of the strings. |
| Space Complexity | O(1)  | Only a handful of integer variables are used. No arrays or maps grow with input size. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    bool isItPossible(string &s1, string &s2) {
        if (s1.length() != s2.length()) return false;
        int n = s1.length();
        int i = 0, j = 0;
        while (i < n && j < n) {
            while (i < n && s1[i] == '#') i++;
            while (j < n && s2[j] == '#') j++;
            if (i == n || j == n) break;
            if (s1[i] != s2[j]) return false;
            if (s1[i] == 'A' && i < j) return false;
            if (s1[i] == 'B' && i > j) return false;
            i++;
            j++;
        }
        while (i < n && s1[i] == '#') i++;
        while (j < n && s2[j] == '#') j++;
        return i == n && j == n;
    }
};
```

### Java
```java
class Solution {
    public boolean isItPossible(String s1, String s2) {
        if (s1.length() != s2.length()) return false;
        int n = s1.length();
        int i = 0, j = 0;
        while (i < n && j < n) {
            while (i < n && s1.charAt(i) == '#') i++;
            while (j < n && s2.charAt(j) == '#') j++;
            if (i == n || j == n) break;
            if (s1.charAt(i) != s2.charAt(j)) return false;
            if (s1.charAt(i) == 'A' && i < j) return false;
            if (s1.charAt(i) == 'B' && i > j) return false;
            i++;
            j++;
        }
        while (i < n && s1.charAt(i) == '#') i++;
        while (j < n && s2.charAt(j) == '#') j++;
        return i == n && j == n;
    }
}
```

### JavaScript
```javascript
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
class Solution {
    isItPossible(s1, s2) {
        if (s1.length !== s2.length) return false;
        let n = s1.length;
        let i = 0, j = 0;
        while (i < n && j < n) {
            while (i < n && s1[i] === '#') i++;
            while (j < n && s2[j] === '#') j++;
            if (i === n || j === n) break;
            if (s1[i] !== s2[j]) return false;
            if (s1[i] === 'A' && i < j) return false;
            if (s1[i] === 'B' && i > j) return false;
            i++;
            j++;
        }
        while (i < n && s1[i] === '#') i++;
        while (j < n && s2[j] === '#') j++;
        return i === n && j === n;
    }
}
```

### Python3
```python
class Solution:
    def isItPossible(self, s1: str, s2: str) -> bool:
        if len(s1) != len(s2):
            return False
        n = len(s1)
        i = j = 0
        while i < n and j < n:
            while i < n and s1[i] == '#':
                i += 1
            while j < n and s2[j] == '#':
                j += 1
            if i == n or j == n:
                break
            if s1[i] != s2[j]:
                return False
            if s1[i] == 'A' and i < j:
                return False
            if s1[i] == 'B' and i > j:
                return False
            i += 1
            j += 1
        while i < n and s1[i] == '#':
            i += 1
        while j < n and s2[j] == '#':
            j += 1
        return i == n and j == n
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages. The only differences are syntax details such as how you get a character or the length of a string.

Start by checking whether the two strings have the same length. If they do not, transformation is impossible.

Create two index variables, one for each string, both beginning at zero. Enter a loop that continues while both indices stay inside their strings.

Inside the loop, first skip every `'#'` that the current index is sitting on. Do this independently for both strings. After skipping, either both indices point at a real letter or at least one has gone past the end.

If either index has gone past the end, break out of the main loop. The remaining work is just a final cleanup.

When both indices still point at letters, compare those letters. A mismatch means the sequence of `'A'`s and `'B'`s is different, so the answer is false.

If the letters match, apply the direction rules. An `'A'` that needs to move right is illegal. A `'B'` that needs to move left is also illegal. Either case returns false immediately.

After a successful check, advance both indices by one and continue.

When the main loop ends, skip any trailing empty spaces that may still remain. Finally return true only if both indices have landed exactly at the end of their respective strings. This guarantees that no unmatched letters were left behind.

The same reasoning applies in C++, Java, JavaScript, and Python3. Only the way you write the length check, character access, and loop syntax changes.

## Examples

**Example 1**

Input:  
s1 = `#A#B#B#`  
s2 = `A###B#B`

Output: true

Trace:  
The non-empty sequence is A B B in both strings.  
- First A moves from index 1 to index 0 (left, allowed).  
- First B moves from index 3 to index 4 (right, allowed).  
- Second B moves from index 5 to index 6 (right, allowed).  
All checks pass, so the answer is true.

**Example 2**

Input:  
s1 = `#A#B#`  
s2 = `#B#A#`

Output: false

Trace:  
The non-empty sequences are A B versus B A. The order is different, so the letters never match when the two pointers meet. The function returns false at the first mismatch.

**Example 3**

Input:  
s1 = `A##B`  
s2 = `#A#B`

Output: true

Trace:  
Sequence is A B in both.  
- A moves from index 0 to index 1 (right would be required, but wait — in this case the target index is larger, which would be illegal for A).  

Correction for a valid case:  
s1 = `#A#B`  
s2 = `A##B`  

- A moves from 1 to 0 (left, allowed).  
- B stays at the same relative position or moves right if needed.  
All direction checks succeed and the answer is true.

## How to Use / Run Locally

**C++**  
1. Copy the C++ solution into a file named `main.cpp`.  
2. Open a terminal and run:  
   `g++ -std=c++17 main.cpp -o main`  
3. Execute:  
   `./main`  
   (You will need to add a simple main function that reads two strings and prints the result if you want to test interactively.)

**Java**  
1. Copy the Java solution into a file named `Solution.java`.  
2. Compile:  
   `javac Solution.java`  
3. Run:  
   `java Solution`  
   (Add a main method that creates a Solution object and calls the method with sample inputs.)

**JavaScript**  
1. Copy the JavaScript solution into a file named `solution.js`.  
2. Run with Node.js:  
   `node solution.js`  
   (Add a few console.log calls at the bottom to test the method.)

**Python3**  
1. Copy the Python solution into a file named `solution.py`.  
2. Run:  
   `python3 solution.py`  
   (Add a few print statements at the bottom to test the method with sample inputs.)

## Notes & Optimizations

- Always check lengths first. Different lengths make the answer false no matter what the letters look like.
- Strings that contain only `'#'` are valid and should return true when both are empty of letters.
- The two-pointer method already achieves the optimal O(n) time and O(1) space, so further asymptotic improvement is not possible under the given constraints.
- An alternative approach of collecting positions of every `'A'` and `'B'` into lists also works, but it uses O(n) extra space and is therefore less desirable for this problem.
- Be careful with the final cleanup of trailing `'#'`. Forgetting it can cause false negatives when one string ends with empty spaces and the other does not.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)