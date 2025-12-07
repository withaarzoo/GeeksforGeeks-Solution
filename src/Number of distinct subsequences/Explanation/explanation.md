# Number of Distinct Subsequences

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

**Number of Distinct Subsequences**

---

## Problem Summary

Given a string `str` containing only lowercase English letters, I need to find the **number of distinct subsequences** of this string.

* A subsequence is formed by deleting zero or more characters **without changing the order** of the remaining characters.
* The answer can be very large, so I return it modulo `10^9 + 7`.
* The empty subsequence `""` is also counted as a valid subsequence.

---

## Constraints

* `1 ≤ |str| ≤ 10^5`
* `str` contains only lowercase English letters (`'a'` to `'z'`).
* Result must be given modulo `10^9 + 7`.

---

## Intuition

When I first saw the problem, I thought:

* For each character in the string, I always have **two choices**:

  1. Include it in my subsequence.
  2. Skip it.

If I ignore duplicates for a moment:

* If the number of subsequences for the prefix `str[0..i-2]` is `dp[i-1]`,
* After adding the `i-th` character, I can either:

  * keep all old subsequences as they are, or
  * create new subsequences by appending this new character.

So it feels like:

> `dp[i] = 2 * dp[i-1]`

But this double-counts when characters **repeat**.

Example:
String = `"aa"`

* After first `'a'`: subsequences = `["", "a"]` → `2`
* After second `'a'`: using the doubling logic → `["", "a(1)", "a(2)", "a(1)a(2)"]`

  * But `"a(1)"` and `"a(2)"` are **same subsequence** `"a"`.
  * So duplicates appear.

So my main thought was:

> I need to **subtract** those subsequences that were already counted when this same character appeared earlier.

To handle this, I track the **last position** where each character appeared, and subtract its old contribution.

---

## Approach

1. Let `n` be the length of the string.
2. I define a DP array `dp` of size `n + 1`.

   * `dp[i]` = number of **distinct subsequences** of the prefix `str[0..i-1]`.
   * `dp[0] = 1` (for the empty string, only one subsequence: `""`).
3. I use an array `last[26]` to store, for each character `'a'` to `'z'`:

   * `last[ch]` = **last index (1-based in terms of `dp`)** where this character appeared.
   * Initially, all are `0` (meaning character not seen yet).
4. For each position `i` from `1` to `n`:

   * Let current character be `c = str[i-1]`.
   * First, I assume character is new:

     * `dp[i] = 2 * dp[i-1]` (take or not take `c`).
   * If `c` appeared earlier at position `prev = last[c]` (non-zero):

     * When `c` was at `prev`, it already generated `dp[prev - 1]` subsequences.
     * Those exact subsequences will get generated again now, so I must subtract:

       * `dp[i] = dp[i] - dp[prev - 1]`
   * I handle modulo carefully and fix negatives by adding `MOD`.
   * Finally, I update `last[c] = i`.
5. Answer is `dp[n]` (includes empty subsequence), modulo `10^9 + 7`.

This gives me the count of distinct subsequences in `O(n)` time.

---

## Data Structures Used

* **Array `dp` (size `n + 1`)**

  * Stores count of distinct subsequences for each prefix.
* **Array `last` (size `26`)**

  * For each character `'a'` to `'z'`, stores the last index (in 1-based DP indexing) where it appeared.
* Both are simple arrays, so access is `O(1)`.

---

## Operations & Behavior Summary

For each character in the string:

1. **Double** the previous count:
   `dp[i] = 2 * dp[i-1]`
2. If the character has appeared before:

   * **Subtract** `dp[previous_index - 1]` to avoid double-counting subsequences.
3. Apply modulo `MOD = 1_000_000_007` after every update.
4. Update the last occurrence index of the current character.

---

## Complexity

* **Time Complexity:** `O(n)`

  * I loop over the string once.
  * Each step does only constant time operations.

* **Space Complexity:** `O(n)`

  * `dp` array of size `n + 1`.
  * `last` array of size `26` (constant extra space).
  * Overall dominated by the `dp` array.

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int distinctSubseq(string &str) {
        const int MOD = 1000000007;
        int n = (int)str.size();
        
        // dp[i] = number of distinct subsequences of prefix str[0..i-1]
        vector<long long> dp(n + 1, 0);
        dp[0] = 1;  // empty subsequence
        
        // last[pos] = last index (1..n) where character 'a'+pos appeared
        vector<int> last(26, 0);
        
        for (int i = 1; i <= n; i++) {
            int chIndex = str[i - 1] - 'a';
            
            // Initially double the subsequences (include or exclude current char)
            long long val = (2LL * dp[i - 1]) % MOD;
            
            // If this character appeared before, subtract old subsequences
            if (last[chIndex] != 0) {
                int prevPos = last[chIndex]; // previous position (1..n)
                val = (val - dp[prevPos - 1] + MOD) % MOD;
            }
            
            dp[i] = val;
            last[chIndex] = i;  // update last occurrence
        }
        
        return (int)(dp[n] % MOD);
    }
};
```

---

### Java

```java
class Solution {
    int distinctSubseq(String str) {
        final int MOD = 1000000007;
        int n = str.length();
        
        // dp[i] = number of distinct subsequences of prefix str[0..i-1]
        long[] dp = new long[n + 1];
        dp[0] = 1; // empty subsequence
        
        // last[pos] = last index (1..n) where character 'a'+pos appeared
        int[] last = new int[26];
        
        for (int i = 1; i <= n; i++) {
            int chIndex = str.charAt(i - 1) - 'a';
            
            // double previous subsequences
            long val = (2L * dp[i - 1]) % MOD;
            
            // if character seen before, subtract its old contribution
            if (last[chIndex] != 0) {
                int prevPos = last[chIndex];
                val = (val - dp[prevPos - 1] + MOD) % MOD;
            }
            
            dp[i] = val;
            last[chIndex] = i; // update last position
        }
        
        return (int)(dp[n] % MOD);
    }
}
```

---

### JavaScript

```javascript
class Solution {
    distinctSubseq(str) {
        const MOD = 1000000007;
        const n = str.length;
        
        // dp[i] = number of distinct subsequences of prefix str[0..i-1]
        const dp = new Array(n + 1).fill(0);
        dp[0] = 1; // empty subsequence
        
        // last[pos] = last index (1..n) where character 'a'+pos appeared
        const last = new Array(26).fill(0);
        
        for (let i = 1; i <= n; i++) {
            const chIndex = str.charCodeAt(i - 1) - 'a'.charCodeAt(0);
            
            // double the subsequences
            let val = (2 * dp[i - 1]) % MOD;
            
            // if character has appeared before, subtract duplicates
            if (last[chIndex] !== 0) {
                const prevPos = last[chIndex];
                val = (val - dp[prevPos - 1] + MOD) % MOD;
            }
            
            dp[i] = val;
            last[chIndex] = i; // update last occurrence
        }
        
        return dp[n] % MOD;
    }
}
```

---

### Python3

```python
class Solution:
    def distinctSubseq(self, s: str) -> int:
        MOD = 10**9 + 7
        n = len(s)
        
        # dp[i] = number of distinct subsequences of prefix s[0..i-1]
        dp = [0] * (n + 1)
        dp[0] = 1  # empty subsequence
        
        # last[pos] = last index (1..n) where character 'a'+pos appeared
        last = [0] * 26
        
        for i in range(1, n + 1):
            ch_index = ord(s[i - 1]) - ord('a')
            
            # double the number of subsequences
            val = (2 * dp[i - 1]) % MOD
            
            # subtract duplicates created by previous occurrence of same character
            if last[ch_index] != 0:
                prev_pos = last[ch_index]
                val = (val - dp[prev_pos - 1] + MOD) % MOD
            
            dp[i] = val
            last[ch_index] = i  # update last occurrence
        
        return dp[n] % MOD
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is same in all languages, so I’ll explain it once and connect it to each implementation.

### 1. Define MOD and read string

* I define `MOD = 10^9 + 7`, because the answer can be very large and the problem asks to return result modulo this value.
* I take the length `n` of the string.

In code:

* C++: `const int MOD = 1000000007; int n = str.size();`
* Java: `final int MOD = 1000000007; int n = str.length();`
* JS: `const MOD = 1000000007; const n = str.length;`
* Python: `MOD = 10**9 + 7; n = len(s)`

---

### 2. Create `dp` array

I create `dp` of size `n + 1`.

* Meaning of `dp[i]`:

  * Number of **distinct subsequences** of the prefix `str[0..i-1]`.

Base case:

* `dp[0] = 1`
  There is exactly 1 subsequence of an empty string → the empty subsequence `""`.

Code:

* C++: `vector<long long> dp(n + 1, 0); dp[0] = 1;`
* Java: `long[] dp = new long[n + 1]; dp[0] = 1;`
* JS: `const dp = new Array(n + 1).fill(0); dp[0] = 1;`
* Python: `dp = [0] * (n + 1); dp[0] = 1`

---

### 3. Create `last` array

I need to track the last position where each character appeared.

* `last[c]` will store a 1-based index `i` for character `c`.
* If `last[c] == 0`, it means character not seen yet.

Code:

* C++: `vector<int> last(26, 0);`
* Java: `int[] last = new int[26];`
* JS: `const last = new Array(26).fill(0);`
* Python: `last = [0] * 26`

---

### 4. Iterate through the string

I iterate from `i = 1` to `n`.
At each step, I handle `str[i-1]`.

#### Step 4.1: Map character to index

I convert character `'a'`–`'z'` to `0`–`25`.

* C++: `int chIndex = str[i - 1] - 'a';`
* Java: `int chIndex = str.charAt(i - 1) - 'a';`
* JS: `const chIndex = str.charCodeAt(i - 1) - 'a'.charCodeAt(0);`
* Python: `ch_index = ord(s[i - 1]) - ord('a')`

---

### 5. Doubling subsequences

First, I assume this character is new and unique.

Logic:

* Every subsequence without this character can exist as it is.
* And each of those can also be extended by adding the current character at the end.

So:

> `dp[i] = 2 * dp[i - 1]`

Code:

* C++: `long long val = (2LL * dp[i - 1]) % MOD;`
* Java: `long val = (2L * dp[i - 1]) % MOD;`
* JS: `let val = (2 * dp[i - 1]) % MOD;`
* Python: `val = (2 * dp[i - 1]) % MOD`

---

### 6. Handling repeated characters

If the character appeared before, say last time at `prev` (1-based index):

* At that time, number of subsequences was `dp[prev - 1]`.
* Those subsequences are now being re-created when I include the current character, causing duplicates.
* So I must subtract `dp[prev - 1]` from `val`.

To avoid negative values with modulo, I add `MOD` before `% MOD`.

Code:

* C++:

  ```c++
  if (last[chIndex] != 0) {
      int prevPos = last[chIndex];
      val = (val - dp[prevPos - 1] + MOD) % MOD;
  }
  ```

* Java:

  ```java
  if (last[chIndex] != 0) {
      int prevPos = last[chIndex];
      val = (val - dp[prevPos - 1] + MOD) % MOD;
  }
  ```

* JS:

  ```javascript
  if (last[chIndex] !== 0) {
      const prevPos = last[chIndex];
      val = (val - dp[prevPos - 1] + MOD) % MOD;
  }
  ```

* Python:

  ```python
  if last[ch_index] != 0:
      prev_pos = last[ch_index]
      val = (val - dp[prev_pos - 1] + MOD) % MOD
  ```

---

### 7. Store current result and update last occurrence

I store `val` in `dp[i]`, and update `last` for this character.

Code:

* C++:

  ```c++
  dp[i] = val;
  last[chIndex] = i;
  ```

* Java:

  ```java
  dp[i] = val;
  last[chIndex] = i;
  ```

* JS:

  ```javascript
  dp[i] = val;
  last[chIndex] = i;
  ```

* Python:

  ```python
  dp[i] = val
  last[ch_index] = i
  ```

---

### 8. Final Answer

After loop ends, `dp[n]` is the number of distinct subsequences of the full string.

* C++: `return (int)(dp[n] % MOD);`
* Java: `return (int)(dp[n] % MOD);`
* JS: `return dp[n] % MOD;`
* Python: `return dp[n] % MOD`

---

## Examples

### Example 1

**Input:**

```text
str = "gfg"
```

Subsequences (distinct):

* `""` (empty)
* `"g"` (from 1st position)
* `"f"`
* `"gf"`
* `"fg"`
* `"gg"` (1st and 3rd chars)
* `"gfg"`

Total = `7`

**Output:**

```text
7
```

---

### Example 2

**Input:**

```text
str = "ggg"
```

Distinct subsequences:

* `""`
* `"g"`
* `"gg"`
* `"ggg"`

Total = `4`

**Output:**

```text
4
```

---

## How to use / Run locally

Here I assume the function is wrapped in the usual way (like on GeeksforGeeks).

### C++

```bash
g++ -std=c++17 main.cpp -o main
./main
```

In `main.cpp`, you can create a `Solution` object and call `distinctSubseq(str)`.

---

### Java

```bash
javac Main.java
java Main
```

In `Main.java`, create an instance of `Solution` and call `distinctSubseq(str)`.

---

### JavaScript (Node.js)

```bash
node main.js
```

In `main.js`, create:

```javascript
const sol = new Solution();
console.log(sol.distinctSubseq("gfg"));
```

---

### Python3

```bash
python3 main.py
```

In `main.py`, do:

```python
s = Solution()
print(s.distinctSubseq("gfg"))
```

---

## Notes & Optimizations

* I used **DP with last occurrence tracking**, which is a standard pattern for “distinct subsequences” problems.
* Time complexity is linear `O(n)`, which is optimal for this problem since we must at least read the whole string once.
* Space complexity is `O(n)` because of `dp`.
  If needed, this can be optimized, but here we directly follow the classic DP pattern which is simple and clear.
* I carefully handled **modulo** operations, especially when subtracting values:

  * `val = (val - x + MOD) % MOD`
    to avoid negative intermediate results.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
