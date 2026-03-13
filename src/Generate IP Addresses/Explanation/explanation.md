# Generate IP Addresses

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given a string `s` containing only digits, the task is to return all possible valid IP address combinations that can be formed by inserting three dots in the string.

A valid IP address consists of four numbers separated by dots in the format:

A.B.C.D

Each segment must:

* Be between `0` and `255`
* Not contain leading zeros unless the number itself is `0`

The answer can be returned in any order.

---

## Constraints

```
1 ≤ s.size() ≤ 16
s contains only digits (0-9)
```

---

## Intuition

When I read the problem, I noticed that every valid IP address always contains **exactly four parts**.

Each part can contain **1 to 3 digits** because the maximum value allowed is `255`.

So the main idea is to try every possible way to split the string into **four segments**, and check whether each segment forms a valid IP block.

If all four segments are valid and the entire string is used, then that combination forms a valid IP address.

Because the maximum number of segments is fixed (4) and each segment length is small (1–3), the total number of combinations is very limited.

This makes a **backtracking solution efficient and easy to implement**.

---

## Approach

1. I use **backtracking** to try all possible segment splits.
2. At each step I try to take **1, 2, or 3 digits** as the next segment.
3. For each segment I check:

   * It does not start with `0` unless the number itself is `0`
   * Its integer value is `≤ 255`
4. If the segment is valid, I recursively continue building the IP address.
5. When I create **exactly four segments** and reach the end of the string, I add the constructed IP address to the result.
6. If a segment becomes invalid or we exceed four parts, that path is discarded immediately.

This pruning keeps the algorithm efficient.

---

## Data Structures Used

* **Array / List** to store resulting IP addresses
* **String builder / temporary string** to construct current IP
* **Recursion stack** for backtracking

No complex data structures are required.

---

## Operations & Behavior Summary

| Operation         | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| Segment Selection | Try segment length 1–3                             |
| Validation        | Ensure segment is within 0–255 and no leading zero |
| Backtracking      | Explore next segment recursively                   |
| Result Storage    | Save valid IP addresses                            |
| Pruning           | Stop invalid paths early                           |

---

## Complexity

### Time Complexity

O(1)

Although the algorithm tries multiple splits, the maximum combinations are limited:

```
3^4 = 81
```

Since the number of IP segments is fixed to 4, the runtime remains constant.

---

### Space Complexity

O(1)

The recursion depth is at most 4 and we only store valid IP addresses.

---

# Multi-language Solutions

## C++

```cpp
class Solution {
public:

    bool isValid(string &s, int start, int len) {
        if(start + len > s.size()) return false;

        if(len > 1 && s[start] == '0') return false;

        int num = 0;

        for(int i = start; i < start + len; i++) {
            num = num * 10 + (s[i] - '0');
        }

        return num <= 255;
    }

    void backtrack(string &s, int index, int parts, string current, vector<string> &result) {

        if(parts == 4 && index == s.size()) {
            current.pop_back();
            result.push_back(current);
            return;
        }

        if(parts >= 4) return;

        for(int len = 1; len <= 3; len++) {

            if(isValid(s, index, len)) {
                string segment = s.substr(index, len);

                backtrack(
                    s,
                    index + len,
                    parts + 1,
                    current + segment + ".",
                    result
                );
            }
        }
    }

    vector<string> generateIp(string &s) {

        vector<string> result;

        backtrack(s, 0, 0, "", result);

        return result;
    }
};
```

---

## Java

```java
class Solution {

    private boolean isValid(String s, int start, int len) {

        if (start + len > s.length()) return false;

        if (len > 1 && s.charAt(start) == '0') return false;

        int num = Integer.parseInt(s.substring(start, start + len));

        return num <= 255;
    }

    private void backtrack(String s, int index, int parts, String current, ArrayList<String> result) {

        if (parts == 4 && index == s.length()) {
            result.add(current.substring(0, current.length() - 1));
            return;
        }

        if (parts >= 4) return;

        for (int len = 1; len <= 3; len++) {

            if (isValid(s, index, len)) {

                String segment = s.substring(index, index + len);

                backtrack(
                        s,
                        index + len,
                        parts + 1,
                        current + segment + ".",
                        result
                );
            }
        }
    }

    public ArrayList<String> generateIp(String s) {

        ArrayList<String> result = new ArrayList<>();

        backtrack(s, 0, 0, "", result);

        return result;
    }
}
```

---

## JavaScript

```javascript
class Solution {

    isValid(s, start, len) {

        if (start + len > s.length) return false;

        if (len > 1 && s[start] === '0') return false;

        let num = Number(s.substring(start, start + len));

        return num <= 255;
    }

    backtrack(s, index, parts, current, result) {

        if (parts === 4 && index === s.length) {
            result.push(current.slice(0, -1));
            return;
        }

        if (parts >= 4) return;

        for (let len = 1; len <= 3; len++) {

            if (this.isValid(s, index, len)) {

                let segment = s.substring(index, index + len);

                this.backtrack(
                    s,
                    index + len,
                    parts + 1,
                    current + segment + ".",
                    result
                );
            }
        }
    }

    generateIp(s) {

        let result = [];

        this.backtrack(s, 0, 0, "", result);

        return result;
    }
}
```

---

## Python3

```python
class Solution:

    def isValid(self, s, start, length):

        if start + length > len(s):
            return False

        if length > 1 and s[start] == '0':
            return False

        num = int(s[start:start+length])

        return num <= 255


    def backtrack(self, s, index, parts, current, result):

        if parts == 4 and index == len(s):
            result.append(current[:-1])
            return

        if parts >= 4:
            return

        for length in range(1, 4):

            if self.isValid(s, index, length):

                segment = s[index:index+length]

                self.backtrack(
                    s,
                    index + length,
                    parts + 1,
                    current + segment + ".",
                    result
                )


    def generateIp(self, s):

        result = []

        self.backtrack(s, 0, 0, "", result)

        return result
```

---

# Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Segment Validation

Each segment must follow two important rules:

1. The numeric value must be between `0` and `255`
2. The segment cannot contain leading zeros

Examples:

Valid

```
0
10
255
```

Invalid

```
01
256
00
```

---

### Backtracking Logic

The algorithm builds the IP address step-by-step.

Example input:

```
255678166
```

Possible exploration path:

```
255
255.6
255.6.78
255.6.78.166
```

Once four valid segments are created and the entire string is consumed, the IP address is stored in the result.

---

### Why Backtracking Works Well

The maximum depth is **4 segments**, and each segment has **3 possibilities**.

So the maximum search space is:

```
3 × 3 × 3 × 3 = 81
```

This makes the algorithm extremely efficient.

---

## Examples

### Example 1

Input

```
s = "255678166"
```

Output

```
[
"25.56.78.166",
"255.6.78.166",
"255.67.8.166",
"255.67.81.66"
]
```

---

### Example 2

Input

```
s = "25505011535"
```

Output

```
[]
```

Explanation

No valid IP address can be formed from this string.

---

## How to use / Run locally

### C++

Compile and run:

```
g++ solution.cpp
./a.out
```

---

### Java

Compile and run:

```
javac Solution.java
java Solution
```

---

### Python

Run with:

```
python solution.py
```

---

### JavaScript

Run with Node.js:

```
node solution.js
```

---

## Notes & Optimizations

* The problem size is small, so brute-force with pruning works efficiently.
* Backtracking allows early termination when invalid segments appear.
* Avoid substring conversions where possible to reduce overhead.
* Always validate segment length before converting to integer.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
