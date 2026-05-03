# Sort by Set Bit Count

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

## Problem Summary

In this problem, I am given an array of integers. The task is to sort the array based on the number of set bits (1s) in the binary representation of each number.

The sorting should follow two rules:

1. Numbers with more set bits should come first (descending order).
2. If two numbers have the same number of set bits, their original order should remain unchanged. This means the sorting must be stable.

So basically, I am not sorting by value directly, but by how many 1s each number has in binary form.

This is a common bit manipulation + stable sorting problem in data structures and algorithms.

## Constraints

* 1 ≤ array size ≤ 10^5
* 1 ≤ element value ≤ 10^6

## Intuition

The first thing I noticed is that I do not really care about the actual value of the number. What matters is how many bits are set to 1.

Then I realized something important: I need to maintain the original order when two numbers have the same set-bit count. That immediately made me think about stable grouping instead of direct sorting.

Instead of comparing every pair of numbers, I can group numbers based on their set-bit count and then combine those groups in descending order.

## Approach

Here is how I approached the problem step by step:

First, I create buckets for each possible set-bit count. Since integers can have up to 32 bits, I create 32 buckets.

Then I loop through the array:

* For each number, I count how many set bits it has
* I place the number into the corresponding bucket

Because I insert elements in the same order I see them, the order inside each bucket remains stable.

Finally, I rebuild the array:

* Start from the bucket with the highest set-bit count
* Move toward the lowest
* Append all elements back into the array

This gives the correct sorted order while preserving stability.

## Data Structures Used

* Array/List of Lists (Buckets)
  I use a list of 32 lists where each index represents a set-bit count. This helps group numbers efficiently without sorting comparisons.

* Integer Variables
  Used for counting set bits and tracking positions.

## Operations & Behavior Summary

* Traverse the input array once
* Count set bits for each number
* Store numbers in corresponding buckets
* Traverse buckets in reverse order (high to low)
* Rebuild the array from bucket contents

This avoids unnecessary comparisons and keeps the process efficient.

## Complexity

| Type             | Complexity |
| ---------------- | ---------- |
| Time Complexity  | O(n)       |
| Space Complexity | O(n)       |

Explanation:

* Time Complexity:
  I traverse the array once to place elements into buckets and once more to rebuild it. So overall it is linear time.

* Space Complexity:
  I use extra space to store elements in buckets, which takes O(n).

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> sortBySetBitCount(vector<int>& arr) {
        // I keep 32 buckets because a standard positive integer can have at most 32 set bits.
        vector<vector<int>> buckets(32);

        // I place each number into the bucket that matches its set-bit count.
        // This keeps the original order inside each bucket, so ties remain stable.
        for (int num : arr) {
            buckets[__builtin_popcount((unsigned int)num)].push_back(num);
        }

        // I rebuild the answer from the highest set-bit count to the lowest.
        // That gives descending order by bit count while preserving tie order.
        vector<int> ans;
        ans.reserve(arr.size());
        for (int bits = 31; bits >= 0; --bits) {
            for (int num : buckets[bits]) {
                ans.push_back(num);
            }
        }

        return ans;
    }
}; 
```

### Java

```java
class Solution {
    void sortBySetBitCount(int[] arr) {
        // I create 32 buckets so each possible set-bit count has its own place.
        ArrayList<Integer>[] buckets = new ArrayList[32];
        for (int i = 0; i < 32; i++) {
            buckets[i] = new ArrayList<>();
        }

        // I push each number into the bucket that matches its set-bit count.
        // Appending in order keeps the sort stable for equal counts.
        for (int num : arr) {
            buckets[Integer.bitCount(num)].add(num);
        }

        // I write the values back from the highest bucket to the lowest bucket.
        // This directly updates the original array in the required order.
        int idx = 0;
        for (int bits = 31; bits >= 0; bits--) {
            for (int num : buckets[bits]) {
                arr[idx++] = num;
            }
        }
    }
} 
```

### JavaScript

```javascript
class Solution {
    sortBySetBitCount(arr) {
        // I create 32 buckets, one for each possible set-bit count.
        const buckets = Array.from({ length: 32 }, () => []);

        // I count set bits with Kernighan's trick, which removes one set bit per loop.
        const countSetBits = (num) => {
            let count = 0;
            while (num > 0) {
                num &= num - 1;
                count++;
            }
            return count;
        };

        // I place each number into the right bucket in the same order I see it.
        // That keeps ties stable without any extra work.
        for (const num of arr) {
            buckets[countSetBits(num)].push(num);
        }

        // I rebuild the array from the highest set-bit count to the lowest.
        let idx = 0;
        for (let bits = 31; bits >= 0; bits--) {
            for (const num of buckets[bits]) {
                arr[idx++] = num;
            }
        }
    }
}; 
```

### Python3

```python
class Solution:
    def sortBySetBitCount(self, arr):
        # I create 32 buckets so each possible set-bit count has a separate list.
        buckets = [[] for _ in range(32)]

        # I count set bits using the common trick of clearing the lowest set bit each time.
        # Appending in order keeps equal-bit elements in their original order.
        for num in arr:
            count = 0
            x = num
            while x:
                x &= x - 1
                count += 1
            buckets[count].append(num)

        # I write the values back from the highest count bucket to the lowest.
        idx = 0
        for bits in range(31, -1, -1):
            for num in buckets[bits]:
                arr[idx] = num
                idx += 1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains the same across all languages, but syntax differs slightly.

Step 1: Create Buckets
I create 32 empty lists. Each index represents how many set bits a number has.

Step 2: Count Set Bits
For each number:

* I count the number of 1s in its binary form
* This can be done using built-in functions or bit tricks

Step 3: Insert into Buckets
I push the number into the bucket matching its set-bit count.
Since I process numbers in order, the relative order is preserved automatically.

Step 4: Rebuild Array
I iterate from the highest bucket index to the lowest:

* For each bucket, I copy its elements back into the array

Step 5: Final Result
The array is now sorted by set-bit count in descending order and remains stable.

## Examples

Example 1
Input: [5, 2, 3, 9, 4, 6, 7, 15, 32]
Output: [15, 7, 5, 3, 9, 6, 2, 4, 32]

Explanation:

* 15 has 4 set bits
* 7 has 3
* 5, 3, 9, 6 have 2
* 2, 4 have 1
* 32 has 1

Grouped and arranged accordingly.

Example 2
Input: [1, 2, 3, 4, 5, 6]
Output: [3, 5, 6, 1, 2, 4]

Explanation:

* 3, 5, 6 → 2 set bits
* 1, 2, 4 → 1 set bit

Original order is preserved within groups.

Example 3
Input: [8, 4, 2, 1]
Output: [8, 4, 2, 1]

Explanation:
All numbers have exactly one set bit, so the original order remains unchanged.

## How to Use / Run Locally

C++:

* Save file as solution.cpp
* Compile using: g++ solution.cpp -o output
* Run: ./output

Java:

* Save file as Solution.java
* Compile: javac Solution.java
* Run: java Solution

JavaScript:

* Save file as solution.js
* Run using Node.js: node solution.js

Python:

* Save file as solution.py
* Run: python3 solution.py

Make sure to provide input inside the code or through standard input based on your setup.

## Notes & Optimizations

* Using built-in functions like __builtin_popcount (C++) or Integer.bitCount (Java) is faster than manual counting.
* The bucket approach avoids sorting comparisons and ensures stability.
* A standard sort with custom comparator can also work, but stability must be handled carefully.
* This approach works well because the maximum number of set bits is fixed (32).

Edge cases:

* All elements have the same set-bit count → array remains unchanged
* Single element → no changes needed
* Large input size → bucket approach still performs efficiently

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
