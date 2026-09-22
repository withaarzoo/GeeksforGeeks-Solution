# Longest Matching in Dictionary with Removals

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

We are given a lowercase string `s` and a dictionary `d` that contains several lowercase words. The task is to find the longest word from the dictionary that can be formed by deleting some characters from `s` without changing the relative order of the remaining characters.

In simple terms, the chosen word must be a subsequence of `s`. If more than one word has the same maximum length, we must return the lexicographically smallest one. If no word from the dictionary can be formed this way, we return an empty string.

This is a classic subsequence matching problem that appears in many coding interviews and online judges under names such as “longest word in dictionary through deleting” or “longest matching word with character removals”.

## Constraints

- 1 ≤ |s| ≤ 5 × 10⁵
- 1 ≤ n ≤ 10⁴ (n = number of words in the dictionary)
- 1 ≤ m ≤ 100 (m = length of any single word)
- Both `s` and every word in `d` contain only lowercase English letters

## Intuition

The first thing I noticed is that checking every word with a simple two-pointer scan would be too slow when the string can be half a million characters long and there are ten thousand words. I needed a faster way to decide whether a word is a subsequence of `s`.

I realized that if I pre-record every position where each letter appears in `s`, I can later jump to the next required letter using binary search. That observation turns an expensive linear scan into a series of cheap logarithmic lookups and gives the complexity the problem expects.

## Approach

1. Build 26 lists (one for each letter a–z). Walk through `s` once and store every index where a letter appears.
2. For each word in the dictionary, try to match its characters one by one.
3. Keep a variable that remembers the last position used so far.
4. For the current character, binary-search its position list for the smallest index that is strictly greater than the last used position.
5. If such an index exists, update the last position and continue. If it does not exist, the word is not a subsequence.
6. Among all words that succeed, keep the longest one. When lengths are equal, keep the lexicographically smaller word.
7. Return the best word found (or the empty string if none matched).

This approach is efficient, easy to implement in any language, and handles the large constraints cleanly.

## Data Structures Used

- **Array of vectors / lists (size 26)**  
  Stores the positions of every character in `s`. Chosen because lookups become binary searches and the total space stays linear in |s|.

- **String (or equivalent)**  
  Holds the current best answer so we can compare lengths and lexicographical order on the fly.

No other heavy structures are needed; the solution stays simple and memory-friendly.

## Operations & Behavior Summary

- Pre-process `s` into 26 sorted position lists.
- For every candidate word:
  - Start with last position = –1.
  - For each character of the word, locate the next occurrence after the last position using binary search.
  - Abort early if any character cannot be matched.
- Compare every successful word against the current answer and update when a better (longer or same-length-but-smaller) word appears.
- After scanning the whole dictionary, return the answer that survived all comparisons.

## Complexity

| Type              | Complexity                  | Explanation |
|-------------------|-----------------------------|-------------|
| Time Complexity   | O(\|s\| + n × m × log\|s\|) | Building the position lists costs O(\|s\|). Each of the n words performs at most m binary searches, each taking O(log\|s\|). |
| Space Complexity  | O(\|s\|)                    | The 26 lists together store exactly \|s\| indices. Extra variables use constant space. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    string findLongestWord(string &s, vector<string> &d) {
        vector<vector<int>> pos(26);
        for (int i = 0; i < (int)s.size(); i++) {
            pos[s[i] - 'a'].push_back(i);
        }
        string ans = "";
        for (const string &w : d) {
            int last = -1;
            bool ok = true;
            for (char c : w) {
                auto &p = pos[c - 'a'];
                auto it = upper_bound(p.begin(), p.end(), last);
                if (it == p.end()) {
                    ok = false;
                    break;
                }
                last = *it;
            }
            if (ok) {
                if (w.size() > ans.size() || (w.size() == ans.size() && w < ans)) {
                    ans = w;
                }
            }
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public String findLongestWord(String s, List<String> d) {
        List<Integer>[] pos = new ArrayList[26];
        for (int i = 0; i < 26; i++) pos[i] = new ArrayList<>();
        for (int i = 0; i < s.length(); i++) {
            pos[s.charAt(i) - 'a'].add(i);
        }
        String ans = "";
        for (String w : d) {
            int last = -1;
            boolean ok = true;
            for (int i = 0; i < w.length(); i++) {
                char c = w.charAt(i);
                List<Integer> p = pos[c - 'a'];
                int idx = Collections.binarySearch(p, last + 1);
                if (idx < 0) idx = -idx - 1;
                if (idx >= p.size()) {
                    ok = false;
                    break;
                }
                last = p.get(idx);
            }
            if (ok) {
                if (w.length() > ans.length() || (w.length() == ans.length() && w.compareTo(ans) < 0)) {
                    ans = w;
                }
            }
        }
        return ans;
    }
}
```

### JavaScript
```javascript
class Solution {
    findLongestWord(s, d) {
        let pos = Array.from({length: 26}, () => []);
        for (let i = 0; i < s.length; i++) {
            pos[s.charCodeAt(i) - 97].push(i);
        }
        let ans = "";
        for (let w of d) {
            let last = -1;
            let ok = true;
            for (let i = 0; i < w.length; i++) {
                let c = w.charCodeAt(i) - 97;
                let p = pos[c];
                let lo = 0, hi = p.length;
                while (lo < hi) {
                    let mid = (lo + hi) >> 1;
                    if (p[mid] <= last) lo = mid + 1;
                    else hi = mid;
                }
                if (lo === p.length) {
                    ok = false;
                    break;
                }
                last = p[lo];
            }
            if (ok) {
                if (w.length > ans.length || (w.length === ans.length && w < ans)) {
                    ans = w;
                }
            }
        }
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def findLongestWord(self, s: str, d: list) -> str:
        pos = [[] for _ in range(26)]
        for i, c in enumerate(s):
            pos[ord(c) - 97].append(i)
        ans = ""
        for w in d:
            last = -1
            ok = True
            for c in w:
                p = pos[ord(c) - 97]
                lo, hi = 0, len(p)
                while lo < hi:
                    mid = (lo + hi) // 2
                    if p[mid] <= last:
                        lo = mid + 1
                    else:
                        hi = mid
                if lo == len(p):
                    ok = False
                    break
                last = p[lo]
            if ok:
                if len(w) > len(ans) or (len(w) == len(ans) and w < ans):
                    ans = w
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

All four implementations follow the same logic; only the syntax for lists and binary search changes.

First we allocate 26 empty lists. While scanning `s` we push every index into the list that belongs to the corresponding letter. After this single pass the lists are already sorted.

Then we initialise an empty answer string. For each word we reset a “last” variable to –1. For every character of the word we perform a binary search (upper_bound in C++, Collections.binarySearch in Java, a hand-written lower-bound loop in JavaScript and Python) that looks for the first position strictly greater than last.

If the search fails, the word is discarded. If it succeeds for every character, we compare the word with the current answer: longer length wins; equal length keeps the lexicographically smaller string. At the end the answer variable contains the required result.

Edge cases such as an empty dictionary, a word longer than `s`, or multiple words of the same length are handled naturally by the comparison logic.

## Examples

**Example 1**  
Input: `d = ["ale", "apple", "monkey", "plea"]`, `s = "abpcplea"`  
Output: `"apple"`  

Trace:  
- “ale” matches positions 0 → 2 → 7  
- “apple” matches 0 → 1 → 2 → 5 → 7  
- “monkey” fails early  
- “plea” matches 1 → 2 → 5 → 7  
Both “apple” and “plea” succeed; “apple” is longer, so it is chosen.

**Example 2**  
Input: `d = ["a", "b", "c"]`, `s = "abpcplea"`  
Output: `"a"`  

Trace: All three single-letter words succeed. Among equal lengths the lexicographically smallest is “a”.

**Example 3**  
Input: `d = ["xyz"]`, `s = "abc"`  
Output: `""`  

Trace: The only word cannot be matched, so the empty string is returned.

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `main.cpp`.  
2. Compile with `g++ -std=c++17 main.cpp -o main`.  
3. Run with `./main` and supply input according to the problem statement.

**Java**  
1. Save the code in `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution`.

**JavaScript**  
1. Save the code in `solution.js`.  
2. Run with `node solution.js` (Node.js required).

**Python3**  
1. Save the code in `solution.py`.  
2. Run with `python3 solution.py`.

In every language you can wrap the class method inside a small main/driver function that reads the string and the dictionary from standard input if you want interactive testing.

## Notes & Optimizations

- Sorting the dictionary by length (descending) and then by lexicographical order beforehand lets you return the first valid word, but the linear scan with on-the-fly comparison is simpler and still fast enough under the given limits.
- If the same dictionary is reused for many different strings, the position lists can be rebuilt for each new string; the dictionary itself does not need re-processing.
- The binary-search approach is optimal for the stated constraints. A pure two-pointer solution works for smaller limits but becomes too slow when |s| reaches 5 × 10⁵.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)