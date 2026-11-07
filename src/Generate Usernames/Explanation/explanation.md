# Generate Usernames - GeeksforGeeks Solution

## Table of Contents
- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary

You are given an array of strings. Each string is a first name. Your job is to generate a unique username for every name while keeping the original order.

All names that appear in the input are treated as reserved from the start. When you process a name:

- If that exact name has not been given to anyone yet, keep it as it is.
- If it is already taken, attach the smallest positive integer suffix so the new username is not reserved and has not been used before.

Return the final list of unique usernames.

This is a classic string + set problem that appears in competitive programming and DSA interviews under topics like unique username generation and handling reserved names.

## Constraints

- 1 ≤ |arr| ≤ 10³
- 1 ≤ |arr[i]| ≤ 10²
- Each string contains only English letters and digits

## Intuition

The first thing I noticed is that every distinct string in the input starts out as reserved. That means those strings cannot be freely created later as a suffix.

The second observation is that order matters. The first time a name appears, we should try to keep the original form if possible. Only later duplicates need a number.

This naturally leads to two sets: one that remembers the reserved names, and another that tracks what has already been assigned while we walk through the array.

## Approach

Collect every unique string from the input into a reserved set.

Create an empty assigned set that will grow as usernames are handed out.

Walk through the array from left to right. For each name:

- If the name is not yet in the assigned set, give it as-is and mark it assigned.
- Otherwise start trying name1, name2, name3 …  
  Accept the first candidate that is neither in the assigned set nor in the reserved set. Mark that candidate as assigned.

After processing every name, return the list of usernames that were generated.

The two-set technique is the key. Keeping reserved separate from assigned lets a reserved name still be claimed the first time it appears as an original entry, while blocking it from being used as a suffix by anyone else.

## Data Structures Used

- Hash set (unordered_set / HashSet / Set) for reserved names  
  Instant look-up to know whether a candidate string was present in the original input.

- Hash set for assigned usernames  
  Instant look-up to know whether a username has already been given out.

- Result list / vector / ArrayList  
  Stores the final usernames in the same order as the input.

These structures give average O(1) checks, which keeps the solution practical under the given constraints.

## Operations & Behavior Summary

1. Build the reserved set from all unique strings in the input.
2. Initialise an empty assigned set and an empty result list.
3. For every name in the original array:
   - If the name is free, assign it directly.
   - If the name is taken, generate successive candidates name + k until a free and non-reserved string is found, then assign that candidate.
4. Return the result list.

This produces unique usernames while respecting the reserved set and the original order.

## Complexity

| Type              | Complexity     | Explanation |
|-------------------|----------------|-------------|
| Time Complexity   | O(n² · m)     | n = length of the array, m = maximum string length. In the worst case each of the n names may try up to n different suffixes; each string operation and hash-set look-up costs O(m). |
| Space Complexity  | O(n · m)      | Both sets together store at most O(n) strings, each of length up to m. The result list also needs O(n · m) space. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    vector<string> generateUsernames(vector<string> arr) {
        unordered_set<string> reserved(arr.begin(), arr.end());
        unordered_set<string> assigned;
        vector<string> res;
        for (const string& name : arr) {
            if (assigned.find(name) == assigned.end()) {
                assigned.insert(name);
                res.push_back(name);
            } else {
                int k = 1;
                while (true) {
                    string cand = name + to_string(k);
                    if (assigned.find(cand) == assigned.end() && reserved.find(cand) == reserved.end()) {
                        assigned.insert(cand);
                        res.push_back(cand);
                        break;
                    }
                    k++;
                }
            }
        }
        return res;
    }
};
```

### Java
```java
class Solution {
    public ArrayList<String> generateUsernames(String[] arr) {
        HashSet<String> reserved = new HashSet<>();
        for (String s : arr) reserved.add(s);
        HashSet<String> assigned = new HashSet<>();
        ArrayList<String> res = new ArrayList<>();
        for (String name : arr) {
            if (!assigned.contains(name)) {
                assigned.add(name);
                res.add(name);
            } else {
                int k = 1;
                while (true) {
                    String cand = name + k;
                    if (!assigned.contains(cand) && !reserved.contains(cand)) {
                        assigned.add(cand);
                        res.add(cand);
                        break;
                    }
                    k++;
                }
            }
        }
        return res;
    }
}
```

### JavaScript
```javascript
/**
 * @param {string[]} arr
 * @returns {string[]}
 */
class Solution {
    generateUsernames(arr) {
        const reserved = new Set(arr);
        const assigned = new Set();
        const res = [];
        for (const name of arr) {
            if (!assigned.has(name)) {
                assigned.add(name);
                res.push(name);
            } else {
                let k = 1;
                while (true) {
                    const cand = name + k;
                    if (!assigned.has(cand) && !reserved.has(cand)) {
                        assigned.add(cand);
                        res.push(cand);
                        break;
                    }
                    k++;
                }
            }
        }
        return res;
    }
}
```

### Python3
```python
class Solution:
    def generateUsernames(self, arr: list[str]) -> list[str]:
        reserved = set(arr)
        assigned = set()
        res = []
        for name in arr:
            if name not in assigned:
                assigned.add(name)
                res.append(name)
            else:
                k = 1
                while True:
                    cand = name + str(k)
                    if cand not in assigned and cand not in reserved:
                        assigned.add(cand)
                        res.append(cand)
                        break
                    k += 1
        return res
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the same logic. The only differences are the language-specific set and list types.

First the reserved set is filled with every distinct string from the input. This is done once so later suffix checks are fast.

An empty assigned set starts the process. While walking the array we ask a simple question for each name: has this exact string already been given out?

If the answer is no, we hand the original name over, record it in the assigned set, and move on. This covers the first occurrence of any reserved name as well.

If the answer is yes, we enter a small loop that builds candidates by appending 1, 2, 3 … We reject a candidate as soon as it appears in either the assigned set or the reserved set. The first candidate that passes both checks is accepted, recorded, and the loop ends.

Because we never put the reserved names into the assigned set at the beginning, a reserved name stays available for its own first appearance. At the same time the reserved set blocks that name from being generated as a suffix by any earlier duplicate.

Edge cases such as consecutive identical names, names that already end with digits, or a reserved name appearing after a generated suffix of the same form are all handled by the two independent set checks.

The same reasoning applies unchanged in C++, Java, JavaScript and Python3; only the syntax for creating sets and concatenating strings differs.

## Examples

**Example 1**  
Input: `["aba", "ab", "aba", "aba", "ab"]`  
Output: `["aba", "ab", "aba1", "aba2", "ab1"]`  

- “aba” and “ab” are free on first sight, so they stay unchanged.  
- The second “aba” needs a suffix; “aba1” is free, so it is taken.  
- The third “aba” finds “aba1” already used, therefore takes “aba2”.  
- The second “ab” takes “ab1”.

**Example 2**  
Input: `["a", "a", "a1", "a"]`  
Output: `["a", "a2", "a1", "a3"]`  

- Reserved set contains both “a” and “a1”.  
- First “a” is free and is kept.  
- Second “a” cannot use “a1” because it is reserved, so it receives “a2”.  
- When “a1” itself appears it is still free and is kept.  
- Last “a” finds both “a1” and “a2” taken, therefore receives “a3”.

**Example 3**  
Input: `["aba1", "aba", "aba"]`  
Output: `["aba1", "aba", "aba2"]`  

- Both “aba1” and “aba” are reserved.  
- They are claimed on their first appearance.  
- The second “aba” cannot use the reserved “aba1”, so it takes “aba2”.

## How to Use / Run Locally

**C++**  
1. Copy the C++ code into a file named `main.cpp`.  
2. Compile: `g++ -std=c++17 main.cpp -o main`  
3. Run: `./main`  
   (You will need to add a small driver that reads the array and prints the result.)

**Java**  
1. Copy the Java code into a file named `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run with a driver class that creates an instance and calls the method.

**JavaScript**  
1. Copy the JavaScript code into a file named `solution.js`.  
2. Run with Node: `node solution.js`  
   (Add a short test harness at the bottom of the file.)

**Python3**  
1. Copy the Python code into a file named `solution.py`.  
2. Run: `python3 solution.py`  
   (Add a few print statements that call the method with sample inputs.)

## Notes & Optimizations

The current solution is already practical for the given constraints (n ≤ 1000). In the absolute worst case the quadratic factor appears, yet 10⁸ operations are acceptable on most judges.

A possible micro-optimisation is to keep a map from each base name to the next integer that should be tried. This reduces the number of failed suffix attempts when the same name appears many times, but the asymptotic complexity stays the same because of the reserved-set checks.

Watch out for names that already look like they contain a numeric suffix (for example “a1”). The algorithm treats them as ordinary strings; the reserved set correctly prevents collisions.

If the problem ever increases the constraints to n ≈ 10⁵, a more advanced structure such as a trie that also stores the next free suffix for every prefix would become necessary. Under the present limits the two-hash-set approach is clear, correct and fast enough.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
