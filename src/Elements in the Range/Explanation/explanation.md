# Elements in the Range

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
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

The "Elements in the Range" problem is a simple array and searching problem from GeeksforGeeks.

We are given:

* An array of distinct positive integers
* A starting value `start`
* An ending value `end`

The task is to check whether every number in the inclusive range `[start, end]` exists inside the array.

If all numbers are present, we return `true`.
If even one number is missing, we return `false`.

This problem is mainly based on:

* Hashing
* Fast lookup
* Range checking
* Set data structure

It is a good beginner-friendly DSA problem for understanding how hash sets improve search performance.

---

## Constraints

| Constraint        | Value  |
| ----------------- | ------ |
| `1 ≤ arr.size()`  | `10^5` |
| `1 ≤ arr[i]`      | `10^5` |
| `1 ≤ start ≤ end` | `10^5` |

---

## Intuition

When I first looked at the problem, I noticed that I only needed to verify whether all numbers between `start` and `end` were present in the array.

A brute-force approach would be:

* Take each number in the range
* Search for it manually in the array

But that would be slow because searching in an array takes linear time.

So I thought about using a hash set.

A set allows very fast lookup. Once all array elements are stored in a set, I can quickly check whether each required number exists or not.

The moment I find a missing number, I can directly return `false`.

That makes the solution clean, simple, and efficient.

---

## Approach

First, I store every array element inside a hash set.

Then I run a loop from `start` to `end`.

For every number:

1. Check whether it exists in the set
2. If it does not exist, return `false`
3. Otherwise continue checking

If the loop finishes completely, it means every number in the required range exists in the array.

Finally, return `true`.

This approach works efficiently because set lookup is almost constant time.

---

## Data Structures Used

| Data Structure           | Why I Used It                                             |
| ------------------------ | --------------------------------------------------------- |
| Hash Set / Unordered Set | To perform fast existence checks for numbers in the range |
| Array                    | Input storage provided by the problem                     |

The hash set is the main optimization here because it avoids repeated linear searches.

---

## Operations & Behavior Summary

Here is what the algorithm does step by step:

1. Read the array and range values
2. Insert all array elements into a hash set
3. Start iterating from `start` to `end`
4. For each number:

   * Check whether it exists in the set
   * If missing, return `false`
5. If all numbers are found, return `true`

This is basically a fast lookup-based range validation algorithm.

---

## Complexity

| Type             | Complexity                 | Explanation                                                                                      |
| ---------------- | -------------------------- | ------------------------------------------------------------------------------------------------ |
| Time Complexity  | `O(n + (end - start + 1))` | `n` for inserting array elements into the set and remaining time for checking the required range |
| Space Complexity | `O(n)`                     | Extra hash set is used to store array elements                                                   |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    bool checkElements(int start, int end, vector<int> &arr) {
        
        // Store all array elements inside a set
        unordered_set<int> st;
        
        for(int num : arr) {
            st.insert(num);
        }
        
        // Check every number from start to end
        for(int i = start; i <= end; i++) {
            
            // If any number is missing, return false
            if(st.find(i) == st.end()) {
                return false;
            }
        }
        
        // All numbers are present
        return true;
    }
};
```

### Java

```java
class Solution {
    public boolean checkElements(int start, int end, int[] arr) {
        
        // HashSet is used for fast searching
        HashSet<Integer> set = new HashSet<>();
        
        // Insert all array elements into the set
        for(int num : arr) {
            set.add(num);
        }
        
        // Check every number in the range
        for(int i = start; i <= end; i++) {
            
            // If number is missing, return false
            if(!set.contains(i)) {
                return false;
            }
        }
        
        // All numbers are present
        return true;
    }
}
```

### JavaScript

```javascript
class Solution {
    checkElements(start, end, arr) {
        
        // Store all array elements in a Set
        let set = new Set(arr);
        
        // Check every number from start to end
        for(let i = start; i <= end; i++) {
            
            // If number does not exist, return false
            if(!set.has(i)) {
                return false;
            }
        }
        
        // All numbers are present
        return true;
    }
}
```

### Python3

```python
class Solution:
    def checkElements(self, start, end, arr):
        
        # Convert array into a set for fast lookup
        st = set(arr)
        
        # Check every number in the range
        for i in range(start, end + 1):
            
            # If any number is missing
            if i not in st:
                return False
        
        # All numbers are present
        return True
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all languages.

The only thing that changes is the syntax and the built-in data structure names.

### Step 1: Store Array Elements

The first thing I do is store all array elements inside a hash-based set.

Why?

Because checking whether a number exists inside:

* an array takes `O(n)` time
* a hash set takes almost `O(1)` time

That is the main optimization.

Different languages use different names:

* C++ → `unordered_set`
* Java → `HashSet`
* JavaScript → `Set`
* Python → `set`

---

### Step 2: Iterate Through the Required Range

Now I start a loop from `start` to `end`.

Example:

```text
start = 2
end = 5
```

The loop checks:

* 2
* 3
* 4
* 5

These are the only numbers that matter.

---

### Step 3: Check Presence in the Set

For every number in the range:

* If the number exists → continue
* If the number does not exist → return `false`

The moment a missing number is found, there is no need to continue further.

This early stopping improves efficiency.

---

### Step 4: Return True

If the loop finishes successfully, it means:

* every required number exists
* nothing is missing

So the answer becomes `true`.

---

### Why This Approach is Better Than Brute Force

Suppose:

* array size = `100000`
* range size = `50000`

If I searched manually inside the array for every number, the solution could become very slow.

Using hashing avoids repeated searches and keeps the solution efficient.

That is why hash-based lookup is commonly used in DSA problems involving:

* existence checking
* duplicates
* frequency counting
* range validation

---

## Examples

### Example 1

#### Input

```text
start = 2
end = 5
arr = [1, 4, 5, 2, 7, 8, 3]
```

#### Output

```text
true
```

#### Explanation

The required range is:

```text
2, 3, 4, 5
```

All these numbers exist in the array.

So the answer is `true`.

---

### Example 2

#### Input

```text
start = 2
end = 6
arr = [1, 4, 5, 2, 7, 8, 3]
```

#### Output

```text
false
```

#### Explanation

The required range is:

```text
2, 3, 4, 5, 6
```

The number `6` does not exist in the array.

So the answer becomes `false`.

---

### Example 3

#### Input

```text
start = 1
end = 3
arr = [1, 2, 3]
```

#### Output

```text
true
```

#### Explanation

All numbers from `1` to `3` exist in the array.

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

---

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

---

### JavaScript

Run using Node.js:

```bash
node solution.js
```

---

### Python3

Run:

```bash
python solution.py
```

---

## Notes & Optimizations

* The array contains distinct integers, so duplicate handling is not needed.
* Using a hash set is the key optimization.
* A brute-force solution using nested loops would be much slower.
* Early return improves practical performance because the algorithm stops immediately after finding a missing number.
* This problem is a good introduction to:

  * Hashing
  * Sets
  * Fast lookup techniques
  * Search optimization in arrays

Possible alternative approaches:

* Sorting + binary search
* Boolean frequency array

But hashing is the cleanest and most efficient solution here.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
