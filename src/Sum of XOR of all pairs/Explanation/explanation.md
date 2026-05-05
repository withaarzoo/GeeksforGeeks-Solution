# Sum of XOR of All Pairs

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

This problem asks to calculate the total sum of XOR values for all distinct pairs in an array.

You are given an integer array `arr` of size `n`. You need to consider every pair `(i, j)` such that `i < j` and compute `arr[i] XOR arr[j]`. The final answer is the sum of all these XOR values.

The challenge here is to do it efficiently. A brute force approach checks all pairs, which takes O(n²) time and becomes too slow for large inputs.

So the goal is to find an optimized solution for the sum of XOR of all pairs using bit manipulation.

---

## Constraints

* 1 ≤ n ≤ 100000
* 1 ≤ arr[i] ≤ 100000

---

## Intuition

At first glance, generating all pairs seems natural. But that quickly becomes inefficient.

Then I noticed something important about XOR. It works independently on each bit. That means instead of comparing whole numbers, I can analyze one bit at a time.

For any bit position:

* XOR gives 1 only when the bits are different
* So I only need to count how many numbers have that bit set and how many don’t

This reduces the problem from pair comparison to counting bits, which is much faster.

---

## Approach

Here is how I approached it step by step:

1. Loop through each bit position (0 to 31)
2. For each bit:

   * Count how many numbers have that bit set (1)
   * The rest will have it unset (0)
3. Each pair formed between a number with bit 1 and bit 0 contributes to XOR
4. Number of such pairs = count1 × count0
5. Each pair contributes `2^bit` to the sum
6. Add all contributions across all bits

This way, instead of checking all pairs, I compute contributions bit by bit.

---

## Data Structures Used

* Array
  The input array is used directly. No extra data structure is needed.

* Variables
  A few counters are used to track how many numbers have a bit set or unset.

This keeps the solution space-efficient.

---

## Operations & Behavior Summary

* Iterate over each bit position (0 to 31)
* Count numbers with bit = 1
* Calculate numbers with bit = 0
* Multiply both counts to get valid XOR pairs
* Multiply with the bit value (2^bit)
* Add to result
* Repeat for all bits

---

## Complexity

| Type             | Complexity | Explanation                                     |
| ---------------- | ---------- | ----------------------------------------------- |
| Time Complexity  | O(n × 32)  | For each of the 32 bits, we scan the array once |
| Space Complexity | O(1)       | No extra space used apart from variables        |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    long long sumXOR(vector<int> &arr) {
        int n = arr.size(); // total number of elements
        long long result = 0; // final answer
        
        // Iterate over all 32 bits (for integers up to 10^5)
        for (int bit = 0; bit < 32; bit++) {
            long long count1 = 0; // count of numbers having this bit set
            
            // Count how many numbers have current bit = 1
            for (int i = 0; i < n; i++) {
                if (arr[i] & (1 << bit)) {
                    count1++;
                }
            }
            
            long long count0 = n - count1; // remaining numbers have bit = 0
            
            // Each pair (1,0) contributes 2^bit
            result += count1 * count0 * (1LL << bit);
        }
        
        return result;
    }
};
```

### Java

```java
class Solution {
    public long sumXOR(int[] arr) {
        int n = arr.length; // total elements
        long result = 0; // final answer
        
        // Check each bit position
        for (int bit = 0; bit < 32; bit++) {
            long count1 = 0; // numbers with this bit set
            
            // Count set bits at current position
            for (int i = 0; i < n; i++) {
                if ((arr[i] & (1 << bit)) != 0) {
                    count1++;
                }
            }
            
            long count0 = n - count1; // numbers with bit = 0
            
            // Add contribution of this bit
            result += count1 * count0 * (1L << bit);
        }
        
        return result;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
    sumXOR(arr) {
        let n = arr.length; // total elements
        let result = 0; // final sum
        
        // Loop through each bit
        for (let bit = 0; bit < 32; bit++) {
            let count1 = 0; // count of numbers with bit set
            
            // Count numbers with current bit = 1
            for (let i = 0; i < n; i++) {
                if ((arr[i] & (1 << bit)) !== 0) {
                    count1++;
                }
            }
            
            let count0 = n - count1; // remaining have bit = 0
            
            // Add contribution
            result += count1 * count0 * (1 << bit);
        }
        
        return result;
    }
}
```

### Python3

```python
class Solution:
    def sumXOR(self, arr):
        n = len(arr)  # total elements
        result = 0  # final answer
        
        # Iterate through all 32 bits
        for bit in range(32):
            count1 = 0  # numbers with this bit set
            
            # Count set bits
            for num in arr:
                if num & (1 << bit):
                    count1 += 1
            
            count0 = n - count1  # numbers with bit = 0
            
            # Add contribution of this bit
            result += count1 * count0 * (1 << bit)
        
        return result
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic stays the same across all languages, only syntax changes.

First, I get the size of the array. This helps calculate how many elements have a bit unset.

Then I initialize a variable to store the result.

Next, I loop through all 32 bit positions because integers are represented in binary form.

For each bit:

* I count how many numbers have that bit set
* This is done using bitwise AND with `(1 << bit)`
* If the result is not zero, that bit is set

Once I have the count of set bits:

* I calculate unset bits as `n - count1`

Now comes the key part:

* Every combination of one set bit and one unset bit creates a valid XOR pair
* So total pairs = `count1 × count0`

Each such pair contributes `2^bit` to the final sum.

I multiply everything and add it to the result.

I repeat this for all bits and return the result.

If I had used brute force, I would compute XOR for every pair explicitly. This optimized bit manipulation approach avoids that and runs much faster.

---

## Examples

### Example 1

Input:
arr = [7, 3, 5]

Output:
12

Explanation:
Pairs:

* 7 XOR 3 = 4
* 7 XOR 5 = 2
* 3 XOR 5 = 6

Total = 4 + 2 + 6 = 12

---

### Example 2

Input:
arr = [5, 9, 7, 6]

Output:
47

Explanation:
All pairs are computed and summed:
12 + 2 + 3 + 14 + 15 + 1 = 47

---

### Example 3

Input:
arr = [10]

Output:
0

Explanation:
No pairs exist, so the result is 0.

---

## How to Use / Run Locally

### C++

1. Save your file as `solution.cpp`
2. Compile:

   ```
   g++ solution.cpp -o solution
   ```

3. Run:

   ```
   ./solution
   ```

---

### Java

1. Save as `Solution.java`
2. Compile:

   ```
   javac Solution.java
   ```

3. Run:

   ```
   java Solution
   ```

---

### JavaScript

1. Save as `solution.js`
2. Run:

   ```
   node solution.js
   ```

---

### Python3

1. Save as `solution.py`
2. Run:

   ```
   python3 solution.py
   ```

---

## Notes & Optimizations

* The brute force approach takes O(n²), which is too slow for large inputs
* Bit manipulation reduces complexity to linear time
* Works because XOR is independent across bits
* Always use long or 64-bit integer for result to avoid overflow
* Edge case: if array has less than 2 elements, answer is 0

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
