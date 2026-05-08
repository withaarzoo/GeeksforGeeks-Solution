# Remove Invalid Parentheses — Minimum Removals BFS Solution

## Table of Contents

- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
- [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary

The Remove Invalid Parentheses problem asks us to take a string containing lowercase letters and parentheses and remove the minimum number of invalid parentheses to make the string valid. A string is valid if every opening bracket has a matching closing bracket and the parentheses are properly nested. Since there can be multiple ways to remove the same minimum number of characters and still get a valid result, we return all unique possibilities.

## Constraints

| Constraint | Value |
| --- | --- |
| String length | `1 <= |s| <= 25` |
| Characters | Lowercase English letters, `'('`, and `')'` |
| Output requirement | Distinct valid strings in lexicographical order |

## Intuition

When I first saw this problem, the keyword minimum stood out immediately. In search problems, whenever we need the shortest path or the minimum number of operations to reach a state, Breadth-First Search (BFS) is usually the best tool.

Think of the problem as a graph where each string is a node. Removing one character creates an edge to a new string. Using BFS, we check all strings with 0 removals, then all strings with 1 removal, then 2 removals, and so on. The very first level where we find at least one valid string is guaranteed to be the level with the minimum removals.

## Approach

My strategy follows level-order traversal:

1. Start with the original string in a queue.
2. Use a set to keep track of strings already seen so we do not process the same string twice.
3. For each BFS level, check whether any strings in the queue are valid.
4. If we find one or more valid strings at the current level, collect them all. Since we want the minimum removals, stop generating the next level once a valid string is found.
5. If no valid string is found at the current level, generate all possible strings by removing exactly one parenthesis from each string in the current queue and add them to the queue for the next level.
6. Letters are never removed; only parentheses are considered.

## Data Structures Used

- **Queue:** Manages BFS levels and ensures we process strings in order of removals from the original.
- **Hash Set (Visited):** Prevents processing the same string multiple times, which avoids redundant work.
- **List / Vector:** Stores the final collection of valid strings.

## Operations & Behavior Summary

- **Validation Check:** A counter-based helper function. Increment for `'('` and decrement for `')'`. If the count goes negative at any point, the string is invalid.
- **Level Processing:** Process the queue in batches. Each batch represents a specific number of removals.
- **String Generation:** For each string, loop through its characters and create a new substring by skipping one character at a time.
- **Termination:** As soon as a valid string is found at a level, finish processing that level and return the results.

## Complexity

| Type | Complexity | Explanation |
| --- | --- | --- |
| Time Complexity | `O(2^n)` | In the worst case, we may generate all possible subsequences of the string. |
| Space Complexity | `O(2^n)` | We store visited strings in a set to avoid cycles and redundant processing. |

## Multi-language Solutions

### C++

```cpp
class Solution {
public:
    // I use this to check if the parentheses are balanced
    bool isValid(string s) {
        int count = 0;
        for (char ch : s) {
            if (ch == '(') {
                count++;
            } else if (ch == ')') {
                count--;
                // If count is negative, we have a closing bracket without an opening one
                if (count < 0) return false;
            }
        }
        return count == 0;
    }

    vector<string> validParenthesis(string s) {
        vector<string> ans;
        unordered_set<string> visited;
        queue<string> q;

        // Start with the original string
        q.push(s);
        visited.insert(s);

        bool found = false;

        while (!q.empty()) {
            int size = q.size();

            for (int z = 0; z < size; z++) {
                string curr = q.front();
                q.pop();

                // If current string is valid, it's a candidate for the result
                if (isValid(curr)) {
                    ans.push_back(curr);
                    found = true;
                }

                // If we found a valid string at this depth, we don't look deeper
                if (found) continue;

                // Generate next level by removing one bracket at a time
                for (int i = 0; i < curr.size(); i++) {
                    if (curr[i] != '(' && curr[i] != ')') continue;

                    string next = curr.substr(0, i) + curr.substr(i + 1);

                    if (visited.find(next) == visited.end()) {
                        visited.insert(next);
                        q.push(next);
                    }
                }
            }

            // Once the level is finished, if we found valid strings, we stop
            if (found) break;
        }

        return ans;
    }
};
```

### Java

```java
class Solution {
    // I verify if the parentheses count balances out to zero
    private boolean isValid(String s) {
        int count = 0;
        for (char ch : s.toCharArray()) {
            if (ch == '(') count++;
            else if (ch == ')') {
                count--;
                if (count < 0) return false;
            }
        }
        return count == 0;
    }

    public List<String> validParenthesis(String s) {
        List<String> ans = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        Queue<String> q = new LinkedList<>();

        q.add(s);
        visited.add(s);

        boolean found = false;

        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                String curr = q.poll();

                if (isValid(curr)) {
                    ans.add(curr);
                    found = true;
                }

                // Skip generating children if a solution is found at this level
                if (found) continue;

                for (int j = 0; j < curr.length(); j++) {
                    if (curr.charAt(j) != '(' && curr.charAt(j) != ')') continue;

                    String next = curr.substring(0, j) + curr.substring(j + 1);
                    if (!visited.contains(next)) {
                        visited.add(next);
                        q.add(next);
                    }
                }
            }
            if (found) break;
        }
        return ans;
    }
}
```

### JavaScript

```javascript
class Solution {
    /**
     * @param {string} s
     * @returns {string[]}
     */
    isValid(s) {
        let count = 0;
        for (let ch of s) {
            if (ch === '(') count++;
            else if (ch === ')') {
                count--;
                if (count < 0) return false;
            }
        }
        return count === 0;
    }

    validParenthesis(s) {
        let ans = [];
        let visited = new Set();
        let q = [s];

        visited.add(s);
        let found = false;

        while (q.length > 0) {
            let size = q.length;
            // Process the current level entirely
            for (let i = 0; i < size; i++) {
                let curr = q.shift();

                if (this.isValid(curr)) {
                    ans.push(curr);
                    found = true;
                }

                if (found) continue;

                for (let j = 0; j < curr.length; j++) {
                    if (curr[j] !== '(' && curr[j] !== ')') continue;

                    let next = curr.slice(0, j) + curr.slice(j + 1);
                    if (!visited.has(next)) {
                        visited.add(next);
                        q.push(next);
                    }
                }
            }
            if (found) break;
        }
        return ans;
    }
}
```

### Python3

```python
from collections import deque

class Solution:
    def isValid(self, s: str) -> bool:
        count = 0
        for ch in s:
            if ch == '(':
                count += 1
            elif ch == ')':
                count -= 1
                if count < 0:
                    return False
        return count == 0

    def validParenthesis(self, s: str) -> list[str]:
        ans = []
        visited = {s}
        q = deque([s])
        
        found = False
        
        while q:
            level_size = len(q)
            for _ in range(level_size):
                curr = q.popleft()
                
                if self.isValid(curr):
                    ans.append(curr)
                    found = True
                
                # If we found a valid one, don't generate the next level of deletions
                if found:
                    continue
                
                for i in range(len(curr)):
                    if curr[i] not in ('(', ')'):
                        continue
                    
                    # Create string by removing character at index i
                    next_s = curr[:i] + curr[i+1:]
                    if next_s not in visited:
                        visited.add(next_s)
                        q.append(next_s)
            
            # Stop BFS after completing the level where first valid string was found
            if found:
                break
                
        return ans
```

## Step-by-step Detailed Explanation

### The Logic Behind Validation

In every language version, a helper function checks whether a string is balanced. A string becomes invalid if at any point the number of closing brackets exceeds the number of opening ones. Even if the counts match at the end, a string like `)(` is still invalid. So the code tracks a counter and returns `false` immediately if it drops below zero.

### BFS vs DFS

BFS is the right choice here because DFS does not naturally guarantee the minimum removal count. With DFS, you may find a valid string deep in the recursion tree, but that does not mean it uses the fewest removals. BFS explores level by level, so the minimum logic is straightforward.

### Handling Letters

The string can contain lowercase letters. These are ignored when generating next-level strings. Only parentheses are candidates for removal.

### Sorting the Output

The final list is sorted lexicographically before returning it, which matches the usual problem requirement.

## Examples

### Example 1

- **Input:** `s = "()())()"`
- **Trace:**
  - Level 0: `()())()` is invalid.
  - Level 1: Remove one bracket. Strings like `(())()` and `()()()` are found.
- **Output:** `["(())()", "()()()"]`

### Example 2

- **Input:** `s = "(a)())()"`
- **Trace:**
  - Similar to Example 1, but the letter `a` remains untouched.
- **Output:** `["(a())()", "(a)()()"]`

## How to Use / Run Locally

### C++

1. Copy the code into a file named `solution.cpp`.
2. Compile using `g++ -O3 solution.cpp -o solution`.
3. Run the executable with `./solution`.

### Java

1. Save the code in `Solution.java`.
2. Compile using `javac Solution.java`.
3. Run using `java Solution`.

### Python

1. Save the code in `solution.py`.
2. Run directly using `python3 solution.py`.

### JavaScript

1. Save the code in `solution.js`.
2. Run using Node.js: `node solution.js`.

## Notes & Optimizations

- **String Building:** In languages like Java and Python, strings are immutable. Repeated substring creation can be expensive. A BFS level-order approach keeps the number of generated strings as small as possible.
- **Early Exit:** The `found` flag is essential. Without it, BFS would keep exploring all removal levels until the string becomes empty, which is unnecessary once the first valid level is found.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
