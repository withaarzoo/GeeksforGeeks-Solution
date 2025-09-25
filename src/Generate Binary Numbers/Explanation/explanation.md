# Generate Binary Numbers

## Table of Contents

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

## Problem Summary

Given a number `n`, generate all binary numbers with decimal values from `1` to `n`.
Return them as a list of strings in increasing order (by their decimal value).
Example: for `n = 4` → `["1", "10", "11", "100"]`.

---

## Constraints

* `n` is a positive integer (`n >= 1`).
* Practical constraints depend on the platform. Each generated string has length at most `⌊log2(n)⌋ + 1`.
* Generating very large `n` (e.g., > 10^6) may be memory/time heavy because total output size is `O(n log n)` characters.

---

## Intuition

I thought: how do I get binary numbers from 1..n in the natural increasing order? If I write `"1"` first, then I can form subsequent binaries by appending `0` and `1` to existing binaries in BFS order:

* Start with `"1"`.
* The next binaries are `"10"` and `"11"` (append `0` and `1` to `"1"`).
* Then for `"10"` append `0` and `1` → `"100"`, `"101"`, and so on.

This suggests a queue (BFS) where each popped string `s` becomes part of the answer, and we push `s + "0"` and `s + "1"` for future outputs.

---

## Approach

1. If `n <= 0`, return an empty list.
2. Initialize a queue and push the string `"1"`.
3. Repeat exactly `n` times:

   * Pop the front string `s`.
   * Append `s` to the result list.
   * Push `s + "0"` and `s + "1"` to the queue.
4. Return the result list.

This produces binaries in strictly increasing decimal order, and each binary string is generated exactly once.

---

## Data Structures Used

* **Queue** — BFS ordering (C++: `std::queue<string>`, Java: `Queue<String>`, Python: `collections.deque`, JavaScript: array used as queue with `head` index for efficiency).
* **Result container** — `vector<string>` / `ArrayList<String>` / `String[]`-style list.

---

## Operations & Behavior Summary

* `push` / `enqueue` new binary candidates (append `'0'` and `'1'`) — O(1) amortized per push.
* `pop` / `dequeue` to produce next output — O(1).
* Each generated string `s` is appended to result and extended twice to produce children.
* Total number of strings processed = `n`. Average string length = `O(log n)`.

---

## Complexity

* **Time Complexity:** `O(n * L)` where `L = floor(log2(n)) + 1` is the maximum bit-length of numbers up to `n`. Commonly denoted `O(n log n)` in terms of characters created and processed.

  * Reason: there are `n` strings and each string construction / copying costs up to `O(L)` characters.
* **Space Complexity:** `O(n * L)` to store the `n` binary strings in the result (and the queue may temporarily hold `O(n)` strings, whose total character size is also `O(n L)`).

---

## Multi-language Solutions

### C++

```c++
#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    // Generate binary representations of numbers from 1 to n (as strings)
    vector<string> generateBinary(int n) {
        vector<string> result;
        if (n <= 0) return result;

        queue<string> q;
        q.push("1"); // start with binary for 1

        for (int i = 0; i < n; ++i) {
            string s = q.front(); q.pop();
            result.push_back(s);        // output current binary
            q.push(s + "0");            // enqueue s0
            q.push(s + "1");            // enqueue s1
        }
        return result;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    // Generate binary representations of numbers from 1 to n (as strings)
    public ArrayList<String> generateBinary(int n) {
        ArrayList<String> result = new ArrayList<>();
        if (n <= 0) return result;

        Queue<String> q = new LinkedList<>();
        q.add("1"); // start

        for (int i = 0; i < n; i++) {
            String s = q.poll();      // dequeue
            result.add(s);            // record current
            q.add(s + "0");           // enqueue s0
            q.add(s + "1");           // enqueue s1
        }
        return result;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number} n
 * @returns {String[]}
 */
class Solution {
    generateBinary(n) {
        const result = [];
        if (n <= 0) return result;

        // Use array as queue with head index for O(1) pops
        const q = [];
        let head = 0;
        q.push("1");

        for (let i = 0; i < n; i++) {
            const s = q[head++];      // pop front
            result.push(s);           // store current binary
            q.push(s + "0");          // enqueue s0
            q.push(s + "1");          // enqueue s1
        }
        return result;
    }
}
```

### Python3

```python
from collections import deque

class Solution:
    def generateBinary(self, n):
        # Generate binary strings for numbers 1..n using BFS
        result = []
        if n <= 0:
            return result

        q = deque(["1"])
        for _ in range(n):
            s = q.popleft()
            result.append(s)
            q.append(s + "0")
            q.append(s + "1")
        return result
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

Below I explain key parts of the BFS approach and map them to each language's important lines. The general idea is the same across languages; language differences are only in queue and string-handling syntax.

### Core idea (language-agnostic)

1. Start queue with string `"1"`.
2. Loop `i` from `0` to `n-1`:

   * Pop front `s`.
   * Append `s` to the answer.
   * Push `s + "0"`, `s + "1"` into queue.
3. After `n` iterations, we have first `n` binary numbers.

### C++ (line by line)

```c++
queue<string> q;      // create a FIFO queue of strings
q.push("1");          // seed with "1"
for (int i = 0; i < n; ++i) {
    string s = q.front(); q.pop();  // take the current smallest binary
    result.push_back(s);            // add to result
    q.push(s + "0");                // produce child 1
    q.push(s + "1");                // produce child 2
}
```

* `q.front()` + `q.pop()` gives current element (O(1)).
* `s + "0"` constructs a new string; repeated string constructions cost `O(length)`.

### Java (line by line)

```java
Queue<String> q = new LinkedList<>();
q.add("1");
for (int i = 0; i < n; i++) {
    String s = q.poll();      // remove head and return it
    result.add(s);
    q.add(s + "0");
    q.add(s + "1");
}
```

* `LinkedList` as `Queue` gives O(1) `add` and `poll`.
* `s + "0"` uses string concat (creates new String), cost proportional to string length.

### JavaScript (line by line)

```javascript
const q = []; let head = 0;  // using array with head pointer
q.push("1");
for (let i = 0; i < n; i++) {
    const s = q[head++];      // avoid shift() — use head index
    result.push(s);
    q.push(s + "0");
    q.push(s + "1");
}
```

* Avoid `.shift()` because it's O(n) per call; `head` pointer gives amortized O(1) pop.
* Strings are immutable; concatenation creates new strings.

### Python3 (line by line)

```python
from collections import deque
q = deque(["1"])
for _ in range(n):
    s = q.popleft()         # O(1)
    result.append(s)
    q.append(s + "0")
    q.append(s + "1")
```

* `deque.popleft()` is O(1) — ideal for BFS queue.

---

## Examples

* Input: `n = 4`
  Output: `["1", "10", "11", "100"]`
  Explanation: binaries of 1,2,3,4 in order.

* Input: `n = 6`
  Output: `["1", "10", "11", "100", "101", "110"]`

---

## How to use / Run locally

### C++

1. If you're using GeeksforGeeks driver, place the `Solution` class into the provided file — GfG will call `generateBinary(n)`.
2. To test locally, create a `main`:

```c++
#include <bits/stdc++.h>
using namespace std;
// include the Solution class here...

int main() {
    int n = 6;
    Solution sol;
    vector<string> ans = sol.generateBinary(n);
    for (auto &s : ans) cout << s << "\n";
    return 0;
}
```

3. Compile & run:

```bash
g++ -std=c++17 -O2 main.cpp -o run
./run
```

### Java

1. Use the `Solution` class as shown. For local testing add:

```java
public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        ArrayList<String> ans = sol.generateBinary(6);
        for (String s : ans) System.out.println(s);
    }
}
```

2. Compile & run:

```bash
javac Main.java
java Main
```

### JavaScript (Node)

1. Save the `Solution` class into `solution.js` and test with:

```javascript
// at bottom of file
const sol = new Solution();
console.log(sol.generateBinary(6).join('\n'));
```

2. Run:

```bash
node solution.js
```

### Python3

1. Save the `Solution` class into `solution.py` and add:

```python
if __name__ == "__main__":
    sol = Solution()
    for s in sol.generateBinary(6):
        print(s)
```

2. Run:

```bash
python3 solution.py
```

---

## Notes & Optimizations

* The BFS approach avoids converting integers to binary repeatedly; instead it *constructs* binary strings incrementally.
* Memory-bound: Because the output itself stores `O(n log n)` characters, this is the dominating factor. For memory-sensitive environments:

  * If the driver only expects printing results, you can avoid storing `result` and print as you pop from the queue.
  * Use streaming: generate and write outputs directly to stdout to save peak memory.
* Alternative approach: For some languages you can generate binary for `i` from `1..n` by converting integer to binary with built-in functions — e.g., using bit-manipulation or `Integer.toBinaryString(i)` in Java — but that costs integer-to-string conversion `O(L)` each iteration as well. BFS does similar work but is often simpler to implement and matches expected order without repeated conversions.
* For very large `n` the queue will grow; consider yielding/printing results as they are produced instead of storing.

---

## Author

[Md. Aarzoo Islam](https://bento.me/withaarzoo)