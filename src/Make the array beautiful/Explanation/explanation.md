# Make the Array Beautiful

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

The "Make the Array Beautiful" problem is a popular stack-based array problem from GeeksforGeeks.

We are given an array containing both negative and non-negative integers. The goal is to repeatedly remove adjacent elements whenever they have opposite signs.

If:

* one number is negative
* and the other is positive or zero

then both numbers are removed from the array.

This process continues until no such adjacent pair exists anymore.

At the end, we return the final beautiful array.

A beautiful array means:

* every adjacent pair has the same sign
* or the array becomes empty

This problem is a good example of:

* stack problems
* array manipulation
* sign comparison
* simulation-based algorithms
* linear time complexity optimization

---

## Constraints

| Constraint    | Value                   |
| ------------- | ----------------------- |
| Array Size    | `1 ≤ arr.size() ≤ 10^5` |
| Element Range | `-10^5 ≤ arr[i] ≤ 10^5` |

---

## Intuition

The first thing I noticed was that removing elements changes the neighboring pairs again.

For example:

* after removing one pair
* two previously separated elements may become adjacent

That immediately made this feel similar to a stack problem.

I realized I only really care about the most recent valid element while scanning the array from left to right.

So instead of deleting elements from the array repeatedly, I can:

* keep storing valid elements in a stack
* compare the current number with the top element
* remove both if their signs are different

This avoids expensive array operations and keeps the solution fast.

---

## Approach

I used a stack-like approach to solve this problem efficiently.

Step-by-step process:

1. Create an empty stack.
2. Traverse the array from left to right.
3. For every current number:

   * check the top element of the stack
   * if both have opposite signs:

     * remove the top element
     * skip the current element too
   * otherwise:

     * push the current number into the stack
4. Continue until all elements are processed.
5. The stack itself becomes the final beautiful array.

The important part is sign checking.

Two numbers cancel each other when:

* one is negative
* and the other is non-negative

This approach works in linear time and handles all edge cases naturally.

---

## Data Structures Used

### Stack / Dynamic Array

I used a stack to keep track of the current valid elements.

Why a stack works well here:

* I only need to compare with the latest inserted element
* removing the latest element is fast
* new adjacent pairs form after removals

In different languages:

* `vector` acts like a stack in C++
* `ArrayList` is used in Java
* normal arrays work in JavaScript
* Python lists behave like stacks

---

## Operations & Behavior Summary

Here’s what the algorithm does internally:

1. Start with an empty stack.
2. Read elements one by one.
3. Compare the current number with the last stored number.
4. If signs are opposite:

   * remove the last stored number
   * ignore the current number
5. Otherwise:

   * keep the current number
6. Repeat until traversal ends.
7. Return the remaining stack elements.

This creates the final beautiful array exactly as required.

---

## Complexity

| Type             | Complexity | Explanation                                           |
| ---------------- | ---------- | ----------------------------------------------------- |
| Time Complexity  | `O(n)`     | Each element is pushed and popped at most once        |
| Space Complexity | `O(n)`     | Extra stack space is used to store remaining elements |

Where:

* `n` = size of the array

This is the most optimized solution for this problem.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> makeBeautiful(vector<int> arr) {
        
        // This vector will work like a stack
        vector<int> st;
        
        // Traverse every element of the array
        for (int num : arr) {
            
            // Check if stack is not empty
            // and current number has opposite sign
            // compared to the top element
            if (!st.empty() &&
               ((st.back() >= 0 && num < 0) ||
                (st.back() < 0 && num >= 0))) {
                
                // Remove the previous element
                // because both cancel each other
                st.pop_back();
            }
            else {
                
                // Otherwise keep the current element
                st.push_back(num);
            }
        }
        
        // Final beautiful array
        return st;
    }
};
```

### Java

```java
class Solution {
    List<Integer> makeBeautiful(int[] arr) {
        
        // List used like a stack
        List<Integer> st = new ArrayList<>();
        
        // Traverse all numbers
        for (int num : arr) {
            
            // Get stack size
            int size = st.size();
            
            // Check opposite signs with last element
            if (size > 0 &&
               ((st.get(size - 1) >= 0 && num < 0) ||
                (st.get(size - 1) < 0 && num >= 0))) {
                
                // Remove last element
                st.remove(size - 1);
            }
            else {
                
                // Keep current element
                st.add(num);
            }
        }
        
        // Return final beautiful array
        return st;
    }
}
```

### JavaScript

```javascript
class Solution {
    makeBeautiful(arr) {
        
        // Array used like a stack
        let st = [];
        
        // Traverse the array
        for (let num of arr) {
            
            // Get last element from stack
            let top = st[st.length - 1];
            
            // Check if signs are opposite
            if (
                st.length > 0 &&
                ((top >= 0 && num < 0) ||
                 (top < 0 && num >= 0))
            ) {
                
                // Remove previous element
                st.pop();
            } else {
                
                // Keep current element
                st.push(num);
            }
        }
        
        // Return final beautiful array
        return st;
    }
};
```

### Python3

```python
class Solution:
    def makeBeautiful(self, arr: list[int]) -> list[int]:
        
        # List used like a stack
        st = []
        
        # Traverse every element
        for num in arr:
            
            # Check if stack is not empty
            # and signs are opposite
            if st and (
                (st[-1] >= 0 and num < 0) or
                (st[-1] < 0 and num >= 0)
            ):
                
                # Remove previous element
                st.pop()
            else:
                
                # Keep current element
                st.append(num)
        
        # Final beautiful array
        return st
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all four languages.

Only syntax changes slightly.

### Step 1: Create a Stack

The first step is creating a stack-like structure.

This structure stores the current valid elements of the beautiful array.

Why?

Because:

* we only compare with the latest element
* removals always happen from the end
* stack operations are fast

---

### Step 2: Traverse the Array

We scan the array from left to right.

This follows the problem statement directly.

For every element:

* compare it with the top of the stack
* decide whether to remove or keep

---

### Step 3: Check Opposite Signs

This is the core condition.

Two numbers cancel each other when:

* one is negative
* the other is non-negative

Examples:

* `5` and `-2`
* `0` and `-7`
* `-3` and `4`

All these pairs get removed.

Zero is treated as non-negative.

---

### Step 4: Remove Both Elements

If opposite signs are found:

* remove the top stack element
* skip adding the current element

This simulates removing both adjacent numbers from the array.

---

### Step 5: Keep Valid Elements

If signs are the same:

* store the current element in the stack

That means:

* no removal should happen
* the array remains valid so far

---

### Step 6: Return Final Stack

After traversal finishes:

* whatever remains in the stack forms the final beautiful array

No extra cleanup is needed.

---

### Why This Solution Is Efficient

A brute-force solution would repeatedly:

* scan the array
* remove pairs
* shift elements

That becomes slow for large inputs.

The stack solution avoids all repeated shifting operations.

Each element:

* enters the stack once
* leaves the stack at most once

That gives an optimized linear-time solution.

---

## Examples

### Example 1

Input:

```text
[4, 2, -2, 1]
```

Output:

```text
[4, 1]
```

Explanation:

* `2` and `-2` have opposite signs
* both are removed
* remaining array becomes `[4, 1]`
* both are non-negative
* final array is beautiful

---

### Example 2

Input:

```text
[2, -2, -1, 1]
```

Output:

```text
[]
```

Explanation:

* `2` and `-2` cancel each other
* remaining array becomes `[-1, 1]`
* `-1` and `1` also cancel each other
* array becomes empty

An empty array is considered beautiful.

---

### Example 3

Input:

```text
[-5, -3, 4, 8]
```

Output:

```text
[-5, 8]
```

Explanation:

* `-3` and `4` are removed
* remaining elements become adjacent
* final array contains valid neighboring signs

---

## How to Use / Run Locally

### C++

Compile and run:

```bash
g++ main.cpp -o main
./main
```

---

### Java

Compile and run:

```bash
javac Main.java
java Main
```

---

### JavaScript

Run using Node.js:

```bash
node main.js
```

---

### Python3

Run using Python:

```bash
python3 main.py
```

---

## Notes & Optimizations

* The stack approach is the most efficient solution for this problem.
* Zero is treated as a non-negative number.
* The solution works even when the final array becomes empty.
* Repeated array deletion should be avoided because it increases time complexity.
* This problem is commonly asked in:

  * stack interview questions
  * array simulation problems
  * competitive programming contests
  * DSA practice platforms like GeeksforGeeks and LeetCode

Possible alternative approaches:

* brute-force simulation
* linked list removal simulation

But those approaches are slower and more complicated.

The stack solution is cleaner and easier to maintain.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
