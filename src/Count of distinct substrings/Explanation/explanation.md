# Count of Distinct Substrings – README

* **Platform**: GeeksforGeeks
* **Topic**: String / Suffix Automaton
* **Author of Solutions**: *Md Aarzoo Islam*

---

## Table of Contents

* [Problem Title](#problem-title)
* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)

  * [C++](#c)
  * [Java](#java)
  * [JavaScript](#javascript)
  * [Python3](#python3)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Title

**Count of Distinct Substrings**

---

## Problem Summary

Given a string `s` consisting of lowercase English letters, I need to find the **total number of distinct non-empty substrings** of `s`.

* A **substring** is a continuous block of characters inside the string.
* Two substrings are considered **distinct** if their content is different, even if they appear at different positions.
* The **empty** substring is **not** counted.

**Example**

* `s = "ababa"` → distinct substrings = `"a", "b", "ab", "ba", "aba", "bab", "abab", "baba", "ababa"` → answer = `9`.

---

## Constraints

* `1 ≤ |s| ≤ 3000`
* `s[i]` is a lowercase English letter (`'a'–'z'`).
* Expected:

  * Time Complexity: around **O(n²)** or better.
  * We will solve it in **O(n)** using **Suffix Automaton**.

---

## Intuition

When I first saw the problem, I thought:

1. Total number of substrings of a string of length `n` is:
   [
   \frac{n(n+1)}{2}
   ]
   But many of these substrings are **repeated**.

2. A simple idea:

   * Generate all substrings.
   * Put them into a `set`.
   * Answer = size of the set.

   But this can be **too slow**:

   * There are `O(n²)` substrings.
   * Each substring can be up to length `n`.
   * Comparing strings again and again makes it close to `O(n³)` in worst cases.

3. So I wanted some structure that:

   * Stores all substrings in a **compressed form**.
   * Lets me **count distinct substrings** easily.

I remembered **Suffix Automaton (SAM)**, which is a compact automaton that represents **all substrings** of a string.

A very nice known property of SAM:

> The number of **distinct substrings** of `s`
> = Σ over all states `v` of `(len[v] - len[link[v]])`.

Once I saw this formula, the plan became clear:

* Build the suffix automaton for `s`.
* Sum `(len[v] - len[link[v]])` for all states (except the initial one).
* Return that sum.

---

## Approach

Here is how I solved it step-by-step:

1. **Build a Suffix Automaton (SAM)** for the string `s`.

   * Each **state** in SAM represents a set of substrings that share the same **end positions** in the original string.
   * For every state `v`, I store:

     * `len[v]`: length of the **longest** substring represented by this state.
     * `link[v]`: suffix link – a pointer to another state that represents the **longest proper suffix** of the same group of substrings.
     * `next[v][c]`: transition by character `c` from this state.

2. I start with one initial state `0`:

   * `len[0] = 0`
   * `link[0] = -1`
   * All transitions are `-1`.

3. I maintain a variable `last`:

   * `last` = the index of the state that corresponds to the whole string processed so far.

4. For each character `ch` in `s`, I **extend** the automaton:

   * Create a new state `cur`.

   * Set `len[cur] = len[last] + 1`.

   * Move backwards from `last` along suffix links and:

     * For any state `p` that does not have a transition `ch`,
       set `next[p][ch] = cur`.

   * If I fall off the chain (`p == -1`), I connect `link[cur] = 0`.

   * Otherwise, let `q = next[p][ch]`:

     * If `len[p] + 1 == len[q]`, simply set `link[cur] = q`.
     * Else, I create a **clone state** `clone`:

       * Copy all transitions from `q` to `clone`.
       * Set `len[clone] = len[p] + 1`, `link[clone] = link[q]`.
       * Redirect transitions pointing to `q` to now point to `clone`.
       * Set `link[q] = link[cur] = clone`.

   * Finally, set `last = cur`.

5. **Counting distinct substrings**:

   * For each state `v` (except state `0`), the number of **new distinct substrings** it introduces is:
     [
     len[v] - len[link[v]]
     ]
   * So I sum this over all states.

6. The final sum is the answer.

---

## Data Structures Used

* **Suffix Automaton (SAM)**

  * Implemented using arrays or vectors:

    * `next[state][26]` for transitions (since only `'a'–'z'`).
    * `link[state]` for suffix links.
    * `len[state]` for the length of the longest substring in that state.
  * Max number of states = `2 * n`.

* Basic integers and a loop to compute the final answer.

---

## Operations & Behavior Summary

For each character of string `s`:

1. Create a new SAM state `cur`.
2. Set `len[cur]` properly.
3. Connect missing transitions for this character.
4. Fix suffix links using the logic:

   * Direct link if possible.
   * Otherwise, clone a state to keep the automaton minimal.
5. Update `last` to the new state.

After building SAM:

1. Loop through all states `v = 1 .. size-1`.
2. Add `len[v] - len[link[v]]` to `ans`.
3. Return `ans`.

---

## Complexity

* **Time Complexity:**

  * Building the suffix automaton for a string of length `n`:

    * Each extension is amortized **O(1)**.
    * Total = **O(n)**.
  * Counting substrings by looping through states:

    * There are at most `2n` states → **O(n)**.

  > Overall Time Complexity: **O(n)**, where `n` is the length of the string `s`.

* **Space Complexity:**

  * We store at most `2n` states.
  * Each state stores:

    * `len` (int)
    * `link` (int)
    * `next[26]` array.
  * So total memory is **O(n)**.

---

## Multi-language Solutions

### C++

```c++
class Solution {
  public:
    int countSubs(std::string& s) {
        int n = s.size();
        
        // Each state in Suffix Automaton
        struct State {
            int next[26]; // transitions
            int link;     // suffix link
            int len;      // length of longest substring in this state
            State() {
                std::fill(next, next + 26, -1);
                link = -1;
                len = 0;
            }
        };
        
        // SAM storage
        std::vector<State> st;
        st.reserve(2 * n);
        st.push_back(State()); // state 0: initial
        int last = 0;          // last state
        
        auto extend = [&](char ch) {
            int c = ch - 'a';
            int cur = (int)st.size();
            st.push_back(State());
            st[cur].len = st[last].len + 1;
            
            int p = last;
            // create transitions for this character
            while (p != -1 && st[p].next[c] == -1) {
                st[p].next[c] = cur;
                p = st[p].link;
            }
            
            if (p == -1) {
                // link to initial state
                st[cur].link = 0;
            } else {
                int q = st[p].next[c];
                if (st[p].len + 1 == st[q].len) {
                    // direct link possible
                    st[cur].link = q;
                } else {
                    // need to clone state q
                    int clone = (int)st.size();
                    st.push_back(st[q]); // copy q
                    st[clone].len = st[p].len + 1;
                    
                    while (p != -1 && st[p].next[c] == q) {
                        st[p].next[c] = clone;
                        p = st[p].link;
                    }
                    
                    st[q].link = st[cur].link = clone;
                }
            }
            last = cur;
        };
        
        // Build SAM
        for (char ch : s) extend(ch);
        
        // Count distinct substrings
        long long ans = 0;
        for (int v = 1; v < (int)st.size(); ++v) {
            ans += st[v].len - st[st[v].link].len;
        }
        return (int)ans;
    }
};
```

---

### Java

```java
class Solution {

    // Global arrays for Suffix Automaton
    static int[][] next; // transitions
    static int[] link;   // suffix links
    static int[] len;    // longest length of state
    static int last;     // last state
    static int size;     // number of states used

    // Initialize SAM for maximum string length n
    static void saInit(int n) {
        int maxStates = 2 * n;
        next = new int[maxStates][26];
        link = new int[maxStates];
        len  = new int[maxStates];

        for (int i = 0; i < maxStates; i++) {
            link[i] = -1;
            len[i] = 0;
            for (int j = 0; j < 26; j++) {
                next[i][j] = -1;
            }
        }

        size = 1;   // initial state index = 0
        last = 0;   // currently processed string ends at state 0
    }

    // Extend SAM with a single character ch
    static void extend(char ch) {
        int c = ch - 'a';

        int cur = size++;
        len[cur] = len[last] + 1;

        int p = last;
        // create transitions for ch
        while (p != -1 && next[p][c] == -1) {
            next[p][c] = cur;
            p = link[p];
        }

        if (p == -1) {
            // no proper suffix, link to initial state
            link[cur] = 0;
        } else {
            int q = next[p][c];
            if (len[p] + 1 == len[q]) {
                // direct suffix link
                link[cur] = q;
            } else {
                // clone q
                int clone = size++;
                len[clone] = len[p] + 1;
                link[clone] = link[q];
                for (int i = 0; i < 26; i++) {
                    next[clone][i] = next[q][i];
                }

                while (p != -1 && next[p][c] == q) {
                    next[p][c] = clone;
                    p = link[p];
                }

                link[q] = link[cur] = clone;
            }
        }

        last = cur; // update last
    }

    public static int countSubs(String s) {
        int n = s.length();
        saInit(n);

        // Build SAM
        for (int i = 0; i < n; i++) {
            extend(s.charAt(i));
        }

        // Count distinct substrings
        long ans = 0;
        for (int v = 1; v < size; v++) {
            ans += len[v] - len[link[v]];
        }
        return (int) ans;
    }
}
```

---

### JavaScript

```javascript
/**
 * @param {string} s
 * @return {number}
 */

class Solution {
    countSubs(s) {
        const n = s.length;

        // SAM state structure
        class State {
            constructor() {
                this.next = new Array(26).fill(-1); // transitions
                this.link = -1;                     // suffix link
                this.len = 0;                       // longest length
            }
        }

        const st = [];
        st.push(new State()); // state 0
        let last = 0;         // last state

        const extend = (ch) => {
            const c = ch.charCodeAt(0) - 97; // 'a' -> 0
            const cur = st.length;
            const curState = new State();
            curState.len = st[last].len + 1;
            st.push(curState);

            let p = last;
            while (p !== -1 && st[p].next[c] === -1) {
                st[p].next[c] = cur;
                p = st[p].link;
            }

            if (p === -1) {
                st[cur].link = 0;
            } else {
                const q = st[p].next[c];
                if (st[p].len + 1 === st[q].len) {
                    st[cur].link = q;
                } else {
                    const clone = st.length;
                    const cloneState = new State();
                    cloneState.len = st[p].len + 1;
                    cloneState.link = st[q].link;
                    cloneState.next = st[q].next.slice(); // copy transitions
                    st.push(cloneState);

                    while (p !== -1 && st[p].next[c] === q) {
                        st[p].next[c] = clone;
                        p = st[p].link;
                    }

                    st[q].link = st[cur].link = clone;
                }
            }
            last = cur;
        };

        // Build SAM
        for (const ch of s) {
            extend(ch);
        }

        // Count distinct substrings
        let ans = 0;
        for (let v = 1; v < st.length; v++) {
            ans += st[v].len - st[st[v].link].len;
        }
        return ans;
    }
}
```

---

### Python3

```python
class Solution:
    def countSubs(self, s: str) -> int:
        n = len(s)
        
        # SAM arrays
        nexts = [[-1] * 26]   # transitions
        link = [-1]           # suffix links
        length = [0]          # longest length in each state
        
        last = 0              # state representing whole string so far
        
        def extend(ch: str):
            nonlocal last
            c = ord(ch) - ord('a')
            cur = len(nexts)
            nexts.append([-1] * 26)
            link.append(-1)
            length.append(length[last] + 1)
            
            p = last
            # create transitions for this character
            while p != -1 and nexts[p][c] == -1:
                nexts[p][c] = cur
                p = link[p]
            
            if p == -1:
                # link to initial state
                link[cur] = 0
            else:
                q = nexts[p][c]
                if length[p] + 1 == length[q]:
                    link[cur] = q
                else:
                    # clone state q
                    clone = len(nexts)
                    nexts.append(nexts[q][:])  # copy transitions
                    link.append(link[q])
                    length.append(length[p] + 1)
                    
                    while p != -1 and nexts[p][c] == q:
                        nexts[p][c] = clone
                        p = link[p]
                    
                    link[q] = link[cur] = clone
            
            last = cur
        
        # Build SAM
        for ch in s:
            extend(ch)
        
        # Count distinct substrings
        ans = 0
        for v in range(1, len(nexts)):
            ans += length[v] - length[link[v]]
        return ans
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Common Logic (for all languages)

1. **Initialization**

   * I create storage for at most `2 * n` states.
   * Each state has:

     * `next[26]` initialized to `-1`.
     * `link = -1`.
     * `len = 0`.
   * `last = 0` (initial state).

2. **Extend function**

   * Called once per character.
   * Creates a new state `cur`.
   * Sets `len[cur] = len[last] + 1`.
   * Walks back using `p = last`:

     * Adds missing transitions for the new character from each state.
   * If there is no previous state with that character (i.e., `p == -1`):

     * `link[cur] = 0`.
   * Otherwise we found state `p` with transition `c` to `q`:

     * If `len[p] + 1 == len[q]` → set `link[cur] = q`.
     * Else:

       * Create a clone state:

         * Copy transitions from `q` to `clone`.
         * `len[clone] = len[p] + 1`.
         * `link[clone] = link[q]`.
       * Redirect transitions pointing to `q` to point to `clone`.
       * Set `link[q] = clone` and `link[cur] = clone`.
   * Update `last = cur`.

3. **Counting**

   * After processing all characters, for each state `v` from `1` to `size-1`:

     * Add `len[v] - len[link[v]]` to `ans`.
   * Return `ans`.

---

### C++: Important Blocks

* `struct State`
  I defined it with constructor that initializes all transitions to `-1`.

* `extend` lambda:

  * Handles entire logic of extension.
  * Uses `st` vector (dynamic array) of states.
  * Cloning is done via `st.push_back(st[q])`.

* Final loop:

  ```cpp
  for (int v = 1; v < (int)st.size(); ++v) {
      ans += st[v].len - st[st[v].link].len;
  }
  ```

---

### Java: Important Blocks

* I used **static arrays** because GeeksforGeeks function is static.
* `saInit(n)`:

  * Allocates arrays `next`, `link`, `len` with size `2 * n`.
  * Initializes them.
* `extend(char ch)`:

  * Uses global `next`, `link`, `len`, `size`, `last`.
  * Performs cloning using:

    ```java
    int clone = size++;
    len[clone] = len[p] + 1;
    link[clone] = link[q];
    for (int i = 0; i < 26; i++) {
        next[clone][i] = next[q][i];
    }
    ```

* Counting loop:

  ```java
  long ans = 0;
  for (int v = 1; v < size; v++) {
      ans += len[v] - len[link[v]];
  }
  ```

---

### JavaScript: Important Blocks

* I created a `State` class with constructor initializing `next`, `link`, `len`.
* The SAM is stored in `const st = []`.
* `extend(ch)`:

  * Creates new state, updates transitions, and clones using object copying (`slice()` for arrays).
* Final summation uses standard JS `for` loop over states.

---

### Python3: Important Blocks

* Instead of a class for state, I used parallel lists:

  * `nexts`: list of `[26]` arrays.
  * `link`: list of ints.
  * `length`: list of ints.
* `extend(ch)`:

  * Appends new state to these lists.
  * Clones state by copying `nexts[q][:]`.
* Counting is done using:

  ```python
  for v in range(1, len(nexts)):
      ans += length[v] - length[link[v]]
  ```

---

## Examples

1. **Example 1**

   ```text
   Input:  s = "ababa"
   Output: 9
   Explanation:
   Distinct substrings are:
   "a", "b", "ab", "ba", "aba", "bab", "abab", "baba", "ababa"
   ```

2. **Example 2**

   ```text
   Input:  s = "aaa"
   Output: 3
   Explanation:
   Distinct substrings = "a", "aa", "aaa"
   ```

---

## How to use / Run locally

### C++

```bash
g++ -std=c++17 main.cpp -o main
./main
```

`main.cpp` should create an object of `Solution`, call `countSubs(s)`, and print the result.

### Java

```bash
javac Solution.java
java Main
```

Where `Main` contains:

```java
public class Main {
    public static void main(String[] args) {
        String s = "ababa";
        System.out.println(Solution.countSubs(s));
    }
}
```

### JavaScript (Node.js)

```bash
node main.js
```

`main.js` can create an object:

```javascript
const sol = new Solution();
console.log(sol.countSubs("ababa"));
```

### Python3

```bash
python3 main.py
```

`main.py`:

```python
from solution import Solution

print(Solution().countSubs("ababa"))
```

---

## Notes & Optimizations

* **Why Suffix Automaton?**

  * Brute force `O(n²)` substring generation with string comparison can be too slow.
  * SAM stores substrings in compressed form and counts them in **O(n)**.
* **Memory Limit**:

  * For `n = 3000`, `2 * n = 6000` states → completely safe in memory.
* **Edge Cases**:

  * String length `1` → always answer `1`.
  * All characters same (`"aaaaa"`) → distinct substrings are `n`, `n-1`, … = `n`.

---

## Author

* [**Md Aarzoo Islam**](https://bento.me/withaarzoo)

Feel free to fork this repo, try your own variations, or use this README as a template for other competitive programming problems. 🚀
