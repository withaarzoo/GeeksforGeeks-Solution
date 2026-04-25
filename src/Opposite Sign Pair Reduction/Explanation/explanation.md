# Opposite Sign Pair Reduction

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

Given an array `arr[]`, repeatedly apply the following operation from left to right until no more valid operations are possible:

* If two adjacent elements have opposite signs:

  * If their absolute values are different, remove both elements and insert the one with the greater absolute value, preserving its sign.
  * If their absolute values are equal, remove both elements without inserting any new element.

The task is to return the final reduced array.

## Constraints

* `1 <= arr.size() <= 10^5`
* `-10000 <= arr[i] <= 10000`
* `arr[i] != 0`

## Intuition

I thought about this problem as a collision process.

Whenever two adjacent values have opposite signs, they interact. The stronger one survives, and the weaker one disappears. If both have the same strength, both disappear.

This kind of behavior is a classic sign that a stack can help. I can process the array from left to right and keep building the answer step by step. Whenever the current number conflicts with the last number in the stack, I resolve that conflict immediately.

## Approach

1. Start with an empty stack.
2. Traverse the array from left to right.
3. For each element `x`, check whether it conflicts with the top of the stack.
4. A conflict exists only when the top and `x` have opposite signs.
5. While there is a conflict:

   * If `abs(top) == abs(x)`, remove the top element and discard `x` too.
   * If `abs(top) > abs(x)`, keep the top element and discard `x`.
   * If `abs(top) < abs(x)`, remove the top element and keep checking `x` with the new stack top.
6. If `x` survives all conflicts, push it into the stack.
7. At the end, the stack contains the final reduced array.

## Data Structures Used

* **Stack / Dynamic array**: to store the current final sequence while processing the array.

## Operations & Behavior Summary

* Compare the current element with the last inserted element.
* Resolve opposite-sign pairs immediately.
* Continue until no valid reduction is possible.
* Preserve the sign of the element with larger absolute value.
* Remove both when absolute values are equal.

## Complexity

* **Time Complexity:** `O(n)`

  * Each element is pushed and popped at most once.
* **Space Complexity:** `O(n)`

  * In the worst case, all elements may remain in the stack.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> reducePairs(vector<int>& arr) {
        vector<int> st; // acts like a stack

        for (int x : arr) {
            bool alive = true;

            while (!st.empty() && alive && (st.back() * x < 0)) {
                int top = st.back();

                if (abs(top) == abs(x)) {
                    // Both cancel out
                    st.pop_back();
                    alive = false;
                } else if (abs(top) > abs(x)) {
                    // Current element is weaker
                    alive = false;
                } else {
                    // Stack top is weaker
                    st.pop_back();
                }
            }

            if (alive) {
                st.push_back(x);
            }
        }

        return st;
    }
};
```

### Java

```java
import java.util.*;

class Solution {
    public ArrayList<Integer> reducePairs(int[] arr) {
        ArrayList<Integer> st = new ArrayList<>();

        for (int x : arr) {
            boolean alive = true;

            while (!st.isEmpty() && alive && st.get(st.size() - 1) * x < 0) {
                int top = st.get(st.size() - 1);

                if (Math.abs(top) == Math.abs(x)) {
                    st.remove(st.size() - 1);
                    alive = false;
                } else if (Math.abs(top) > Math.abs(x)) {
                    alive = false;
                } else {
                    st.remove(st.size() - 1);
                }
            }

            if (alive) {
                st.add(x);
            }
        }

        return st;
    }
}
```

### JavaScript

```javascript
/**
 * @param {number[]} arr
 * @returns {number[]}
 */
class Solution {
    reducePairs(arr) {
        let st = [];

        for (let x of arr) {
            let alive = true;

            while (st.length > 0 && alive && st[st.length - 1] * x < 0) {
                let top = st[st.length - 1];

                if (Math.abs(top) === Math.abs(x)) {
                    st.pop();
                    alive = false;
                } else if (Math.abs(top) > Math.abs(x)) {
                    alive = false;
                } else {
                    st.pop();
                }
            }

            if (alive) {
                st.push(x);
            }
        }

        return st;
    }
}
```

### Python3

```python
class Solution:
    def reducePairs(self, arr):
        st = []

        for x in arr:
            alive = True

            while st and alive and st[-1] * x < 0:
                top = st[-1]

                if abs(top) == abs(x):
                    st.pop()
                    alive = False
                elif abs(top) > abs(x):
                    alive = False
                else:
                    st.pop()

            if alive:
                st.append(x)

        return st
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### 1. Store the result as we build it

I use a stack-like structure to keep the currently valid array.

* In C++, I use `vector<int>`.
* In Java, I use `ArrayList<Integer>`.
* In JavaScript, I use `[]`.
* In Python, I use `[]`.

This works because I only need to compare the current element with the last kept element.

### 2. Process elements from left to right

For every number `x` in the input array, I try to place it into the result.

### 3. Check for opposite signs

I compare `x` with the last element in the stack.

If their product is negative, their signs are opposite.

### 4. Handle the three possible outcomes

* **Equal absolute values**: both are removed.
* **Top has larger absolute value**: current element is removed.
* **Current has larger absolute value**: top is removed, and the current element may still collide with earlier elements.

### 5. Keep reducing until stable

I continue checking the current element against the new top of the stack until:

* there is no top element left, or
* the top has the same sign as the current element, or
* the current element is removed.

### 6. Save the surviving element

If the current element survives all conflicts, I append it to the stack.

### 7. Return the final reduced array

At the end, the stack contains the answer in correct order.

## Examples

### Example 1

**Input:** `arr = [10, -5, -8, 2, -5]`

**Process:**

* `10` stays.
* `-5` collides with `10`, and `10` survives.
* `-8` collides with `10`, and `10` survives.
* `2` stays because the last element has the same sign.
* `-5` collides with `2`, and `-5` survives.
* `-5` then collides with `10`, and `10` survives.

**Output:** `[10]`

### Example 2

**Input:** `arr = [5, -5, -2, -10]`

**Process:**

* `5` and `-5` cancel each other.
* `-2` stays.
* `-10` has the same sign, so it stays.

**Output:** `[-2, -10]`

### Example 3

**Input:** `arr = [-20, 1, 20]`

**Process:**

* `-20` and `1` collide, and `-20` survives.
* `-20` and `20` have equal absolute values, so both cancel out.

**Output:** `[]`

## How to use / Run locally

### C++

1. Copy the C++ solution into your GeeksforGeeks driver or local file.
2. Compile and run:

```bash
g++ -std=c++17 -O2 -o main main.cpp
./main
```

### Java

1. Copy the Java solution into your class file.
2. Compile and run:

```bash
javac Solution.java
java Solution
```

### JavaScript

1. Copy the JavaScript solution into a `.js` file.
2. Run with Node.js:

```bash
node solution.js
```

### Python3

1. Copy the Python solution into a `.py` file.
2. Run:

```bash
python3 solution.py
```

## Notes & Optimizations

* This solution is already optimal for the given problem.
* I avoid nested full-array scans by resolving collisions immediately.
* The stack-based approach ensures each element is handled efficiently.
* Since each element is pushed and popped at most once, the solution remains linear.
* The logic is similar to collision problems, so this pattern is useful to remember for interviews.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
