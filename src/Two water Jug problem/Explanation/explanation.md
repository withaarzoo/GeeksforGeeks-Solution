# Two Water Jug Problem

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

You are given two jugs of capacity `m` litres and `n` litres.

Initially, both jugs are empty.

You need to measure exactly `d` litres of water using only these operations:

1. Fill a jug completely
2. Empty a jug completely
3. Pour water from one jug to another until one jug becomes full or the other becomes empty

The task is to find the minimum number of operations needed to get exactly `d` litres of water in any one jug.

If it is not possible, return `-1`.

## Constraints

```text
1 <= m, n <= 100
1 <= d <= 100
```

## Intuition

I thought about this problem as a simulation problem.

At every step, I can only do one of three operations:

* Fill a jug
* Empty a jug
* Pour water from one jug into another

One important mathematical observation is:

* It is only possible to get `d` litres if `d` is divisible by `gcd(m, n)`
* Also, `d` must not be greater than the larger jug

If the answer is possible, then I can try two ways:

1. Pour from jug `m` to jug `n`
2. Pour from jug `n` to jug `m`

Then I simply return the minimum operations among both ways.

## Approach

1. Check if `d > max(m, n)`

   * If yes, return `-1`

2. Find `gcd(m, n)`

   * If `d % gcd(m, n) != 0`, return `-1`

3. Simulate pouring in two ways:

   * From jug `m` to jug `n`
   * From jug `n` to jug `m`

4. In each simulation:

   * Fill source jug if it becomes empty
   * Pour water into target jug
   * Empty target jug if it becomes full
   * Continue until one jug contains exactly `d` litres

5. Return the minimum number of operations.

## Data Structures Used

This solution does not use any extra data structure like array, queue, stack, map, or set.

I only use:

* Integer variables
* GCD function
* Simulation logic

So, the space usage remains constant.

## Operations & Behavior Summary

| Operation     | Description                             |
| ------------- | --------------------------------------- |
| Fill Jug      | Fill a jug completely                   |
| Empty Jug     | Empty a jug completely                  |
| Pour Water    | Transfer water from one jug to another  |
| Refill Source | Refill source jug when it becomes empty |
| Empty Target  | Empty target jug when it becomes full   |

## Complexity

* Time Complexity: `O(max(m, n))`

  * In the worst case, the number of operations depends on the jug sizes.

* Space Complexity: `O(1)`

  * Only a few variables are used.

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    int gcd(int a, int b) {
        while (b != 0) {
            int temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }
    
    int pour(int fromCap, int toCap, int d) {
        int from = fromCap;
        int to = 0;
        int steps = 1;
        
        while (from != d && to != d) {
            int transfer = min(from, toCap - to);
            to += transfer;
            from -= transfer;
            steps++;
            
            if (from == d || to == d)
                break;
            
            if (from == 0) {
                from = fromCap;
                steps++;
            }
            
            if (to == toCap) {
                to = 0;
                steps++;
            }
        }
        
        return steps;
    }
    
    int minSteps(int m, int n, int d) {
        if (d > max(m, n))
            return -1;
        
        if (d % gcd(m, n) != 0)
            return -1;
        
        return min(pour(m, n, d), pour(n, m, d));
    }
};
```

### Java

```java
class Solution {
    
    private int gcd(int a, int b) {
        while (b != 0) {
            int temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }
    
    private int pour(int fromCap, int toCap, int d) {
        int from = fromCap;
        int to = 0;
        int steps = 1;
        
        while (from != d && to != d) {
            int transfer = Math.min(from, toCap - to);
            to += transfer;
            from -= transfer;
            steps++;
            
            if (from == d || to == d)
                break;
            
            if (from == 0) {
                from = fromCap;
                steps++;
            }
            
            if (to == toCap) {
                to = 0;
                steps++;
            }
        }
        
        return steps;
    }
    
    public int minSteps(int m, int n, int d) {
        if (d > Math.max(m, n))
            return -1;
        
        if (d % gcd(m, n) != 0)
            return -1;
        
        return Math.min(pour(m, n, d), pour(n, m, d));
    }
}
```

### JavaScript

```javascript
class Solution {
    
    gcd(a, b) {
        while (b !== 0) {
            let temp = a % b;
            a = b;
            b = temp;
        }
        return a;
    }
    
    pour(fromCap, toCap, d) {
        let from = fromCap;
        let to = 0;
        let steps = 1;
        
        while (from !== d && to !== d) {
            let transfer = Math.min(from, toCap - to);
            to += transfer;
            from -= transfer;
            steps++;
            
            if (from === d || to === d)
                break;
            
            if (from === 0) {
                from = fromCap;
                steps++;
            }
            
            if (to === toCap) {
                to = 0;
                steps++;
            }
        }
        
        return steps;
    }
    
    minSteps(m, n, d) {
        if (d > Math.max(m, n))
            return -1;
        
        if (d % this.gcd(m, n) !== 0)
            return -1;
        
        return Math.min(this.pour(m, n, d), this.pour(n, m, d));
    }
}
```

### Python3

```python
class Solution:
    
    def gcd(self, a, b):
        while b:
            a, b = b, a % b
        return a
    
    def pour(self, fromCap, toCap, d):
        fromJug = fromCap
        toJug = 0
        steps = 1
        
        while fromJug != d and toJug != d:
            transfer = min(fromJug, toCap - toJug)
            toJug += transfer
            fromJug -= transfer
            steps += 1
            
            if fromJug == d or toJug == d:
                break
            
            if fromJug == 0:
                fromJug = fromCap
                steps += 1
            
            if toJug == toCap:
                toJug = 0
                steps += 1
        
        return steps
    
    def minSteps(self, m, n, d):
        if d > max(m, n):
            return -1
        
        if d % self.gcd(m, n) != 0:
            return -1
        
        return min(self.pour(m, n, d), self.pour(n, m, d))
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

### Step 1: Check Impossible Cases

```text
If d is greater than the larger jug, it is impossible.

Example:
m = 3, n = 5, d = 7

No jug can hold 7 litres.
So answer is -1.
```

### Step 2: Use GCD Condition

```text
For the problem to be solvable:
d % gcd(m, n) must be equal to 0

Example:
m = 8, n = 56, d = 46

gcd(8, 56) = 8
46 % 8 != 0

So it is impossible.
```

### Step 3: Simulate Pouring

```text
I try both directions:
1. Pour from m jug to n jug
2. Pour from n jug to m jug

Then I take the minimum answer.
```

### Step 4: Simulation Process

```text
Suppose:
m = 3
n = 5
d = 4

Start with 5 litre jug.

Step 1: Fill 5L jug      -> (0, 5)
Step 2: Pour into 3L jug -> (3, 2)
Step 3: Empty 3L jug     -> (0, 2)
Step 4: Pour remaining   -> (2, 0)
Step 5: Fill 5L jug      -> (2, 5)
Step 6: Pour into 3L jug -> (3, 4)

Now I have exactly 4 litres.
```

### Step 5: Why We Try Both Directions

```text
Sometimes pouring from smaller jug to larger jug takes fewer operations.
Sometimes pouring from larger jug to smaller jug is better.

So I always compute both and take the minimum.
```

## Examples

### Example 1

```text
Input:
m = 3, n = 5, d = 4

Output:
6
```

### Example 2

```text
Input:
m = 8, n = 56, d = 46

Output:
-1
```

### Example 3

```text
Input:
m = 2, n = 4, d = 3

Output:
-1
```

Reason:

```text
gcd(2, 4) = 2
3 % 2 != 0
So it is impossible.
```

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

## Notes & Optimizations

* Always check impossible cases first.
* Using GCD avoids unnecessary simulation.
* Trying both directions guarantees the minimum answer.
* This solution uses constant extra space.
* The implementation is efficient enough for all given constraints.

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
