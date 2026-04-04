# Gray Code

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
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

## Problem Summary

Given an integer `n`, generate all Gray Code patterns from `0` to `2^n - 1`.

A Gray Code sequence has the property that every adjacent value differs by only one bit.

The sequence must always begin with `0`.

For example:

* For `n = 2`

  * Output: `["00", "01", "11", "10"]`

* For `n = 3`

  * Output: `["000", "001", "011", "010", "110", "111", "101", "100"]`

---

## Constraints

```text
1 <= n <= 16
```

---

## Intuition

I thought about how Gray Code works.

The main rule says that every consecutive binary string should differ by exactly one bit.

Instead of generating all binary numbers and checking them manually, I used a direct mathematical formula.

For every number `i`, the Gray Code can be generated using:

```text
gray = i ^ (i >> 1)
```

Here:

* `i >> 1` means shifting bits one position to the right.
* `^` means XOR operation.

This formula automatically guarantees that adjacent values differ by only one bit.

After generating the Gray Code number, I convert it into a binary string of length `n`.

---

## Approach

1. Calculate total possible Gray Codes using `2^n`.
2. Loop from `0` to `2^n - 1`.
3. For each number `i`, calculate Gray Code using:

```text
gray = i ^ (i >> 1)
```

1. Convert the Gray Code number into an `n` length binary string.
2. Store the binary string in the answer list.
3. Return the final list.

---

## Data Structures Used

* Array / Vector / List

  * Used to store all generated Gray Code strings.

* String

  * Used to build binary representation of Gray Code.

---

## Operations & Behavior Summary

| Operation              | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `1 << n`               | Computes `2^n`                                |
| `i >> 1`               | Shifts bits of `i` one position right         |
| `i ^ (i >> 1)`         | Generates Gray Code value                     |
| `gray & (1 << bit)`    | Checks whether a particular bit is set        |
| Binary conversion loop | Converts Gray Code integer into binary string |

---

## Complexity

* Time Complexity: `O(n * 2^n)`

  * There are `2^n` Gray Codes.
  * For every Gray Code, I take up to `n` operations to build the binary string.

* Space Complexity: `O(n * 2^n)`

  * I store `2^n` strings.
  * Each string has length `n`.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<string> graycode(int n) {
        vector<string> result;
        
        // Total number of Gray Codes
        int total = 1 << n;
        
        for (int i = 0; i < total; i++) {
            // Generate Gray Code
            int gray = i ^ (i >> 1);
            
            string binary = "";
            
            // Convert Gray Code to binary string
            for (int bit = n - 1; bit >= 0; bit--) {
                if (gray & (1 << bit))
                    binary += '1';
                else
                    binary += '0';
            }
            
            result.push_back(binary);
        }
        
        return result;
    }
};
```

### Java

```java
class Solution {
    public ArrayList<String> graycode(int n) {
        ArrayList<String> result = new ArrayList<>();
        
        int total = 1 << n;
        
        for (int i = 0; i < total; i++) {
            int gray = i ^ (i >> 1);
            
            StringBuilder binary = new StringBuilder();
            
            for (int bit = n - 1; bit >= 0; bit--) {
                if ((gray & (1 << bit)) != 0)
                    binary.append('1');
                else
                    binary.append('0');
            }
            
            result.add(binary.toString());
        }
        
        return result;
    }
}
```

### JavaScript

```javascript
class Solution {
    graycode(n) {
        let result = [];
        let total = 1 << n;

        for (let i = 0; i < total; i++) {
            let gray = i ^ (i >> 1);
            let binary = "";

            for (let bit = n - 1; bit >= 0; bit--) {
                if ((gray & (1 << bit)) !== 0)
                    binary += '1';
                else
                    binary += '0';
            }

            result.push(binary);
        }

        return result;
    }
}
```

### Python3

```python
class Solution:
    def graycode(self, n):
        result = []
        total = 1 << n

        for i in range(total):
            gray = i ^ (i >> 1)
            binary = ""

            for bit in range(n - 1, -1, -1):
                if gray & (1 << bit):
                    binary += '1'
                else:
                    binary += '0'

            result.append(binary)

        return result
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Find total Gray Codes

```cpp
int total = 1 << n;
```

This gives total number of Gray Codes.

For example:

* If `n = 2`, total = `4`
* If `n = 3`, total = `8`

---

### Step 2: Loop through all values

```cpp
for (int i = 0; i < total; i++)
```

I visit every number from `0` to `2^n - 1`.

---

### Step 3: Generate Gray Code value

```cpp
int gray = i ^ (i >> 1);
```

Example:

```text
i       = 5  -> 101
i >> 1  = 2  -> 010
Gray    = 7  -> 111
```

So Gray Code for `5` becomes `111`.

---

### Step 4: Convert Gray Code into binary string

```cpp
for (int bit = n - 1; bit >= 0; bit--)
```

I check every bit from left to right.

```cpp
if (gray & (1 << bit))
    binary += '1';
else
    binary += '0';
```

If the bit exists, I add `1`.
Otherwise, I add `0`.

---

### Step 5: Store the answer

```cpp
result.push_back(binary);
```

After creating the binary string, I store it in the result list.

---

### Step 6: Return final answer

```cpp
return result;
```

Finally, I return all generated Gray Codes.

---

## Examples

### Example 1

```text
Input: n = 2
Output: ["00", "01", "11", "10"]
```

Explanation:

* `00` and `01` differ by one bit
* `01` and `11` differ by one bit
* `11` and `10` differ by one bit

### Example 2

```text
Input: n = 3
Output: ["000", "001", "011", "010", "110", "111", "101", "100"]
```

---

## How to use / Run locally

### C++

```bash
g++ solution.cpp -o solution
./solution
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node solution.js
```

### Python3

```bash
python solution.py
```

---

## Notes & Optimizations

* Using the Gray Code formula is much faster than generating all binary strings and manually checking adjacent differences.
* The XOR method is the standard and most optimized approach.
* This solution works efficiently for the maximum constraint `n = 16`.
* The solution guarantees that every adjacent Gray Code differs by exactly one bit.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
