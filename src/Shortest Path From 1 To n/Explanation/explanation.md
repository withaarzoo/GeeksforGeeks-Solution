# Shortest Path From 1 To n | Minimum Steps in Directed Graph

## Table of Contents
- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary

We are given a directed graph where the vertices are numbered from 1 to n.  
From any vertex i there are only two possible edges:  
- one going to i + 1  
- one going to 3 * i (if that value stays within the range)

The task is to find the shortest path from vertex 1 to vertex n. In other words, we need the minimum number of edges required to reach n starting from 1.

Input is a single integer n.  
Output is a single integer — the length of the shortest path.

This is a classic competitive programming problem that appears on GeeksforGeeks and is often asked in interviews at companies like Morgan Stanley, Samsung, and Cisco.

## Constraints

- 1 ≤ n ≤ 10^8

Because n can be as large as one hundred million, any solution that uses BFS or builds the full graph will be too slow. We need an O(log n) approach.

## Intuition

When n is huge, exploring the graph forward from 1 becomes impossible.  
I noticed that the reverse direction is much easier to handle.  

From any number x I can always come from x - 1 (by an add-1 move).  
If x is divisible by 3, I can also come from x / 3 (by a multiply-by-3 move).  

Working backwards from n to 1 and always preferring the divide-by-3 move whenever it is possible gives the shortest path. This greedy reverse strategy is the key insight that makes the solution both correct and fast.

## Approach

Start at n and keep reducing it until it becomes 1.  
Count every reduction as one step.

While the current number is greater than 1:  
- If the number is divisible by 3, replace it with number / 3.  
- Otherwise simply subtract 1.  

Each of these operations corresponds to one edge in the original path.  
When we finally reach 1, the step counter holds the answer.

This works because multiplying by 3 is the most powerful move available. By taking the reverse of that move whenever we can, we jump backwards as far as possible and therefore need fewer total steps.

## Data Structures Used

No special data structures are required.  
We only need a few integer variables to store the current value of n and the step counter.  

This keeps the extra memory usage constant, which is perfect for the given constraints.

## Operations & Behavior Summary

1. Initialize a counter to zero.  
2. While n is still greater than 1:  
   - Check whether n is divisible by 3.  
   - If yes, replace n by n / 3.  
   - If no, replace n by n - 1.  
   - Increase the counter by one.  
3. When the loop ends, n equals 1 and the counter is the minimum number of edges.

The algorithm never builds a graph or uses a queue. It simply rewrites the number itself until it becomes 1.

## Complexity

| Type              | Complexity | Explanation |
|-------------------|------------|-------------|
| Time Complexity   | O(log n)   | Every time we divide by 3 the number shrinks by a factor of three. Between divisions we perform at most two subtractions. Overall the number of operations is proportional to the number of times we can divide n by 3. |
| Space Complexity  | O(1)       | Only a constant number of integer variables are used. No arrays, maps or queues are allocated. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int minimumStep(int n) {
        int steps = 0;
        while (n > 1) {
            if (n % 3 == 0)
                n /= 3;
            else
                n--;
            steps++;
        }
        return steps;
    }
};
```

### Java
```java
class Solution {
    public int minimumStep(int n) {
        int steps = 0;
        while (n > 1) {
            if (n % 3 == 0)
                n /= 3;
            else
                n--;
            steps++;
        }
        return steps;
    }
}

```

### JavaScript
```javascript
/**
 * @param {number} n
 * @return {number}
 */
class Solution {
    minimumStep(n) {
        let steps = 0;
        while (n > 1) {
            if (n % 3 === 0)
                n = Math.floor(n / 3);
            else
                n--;
            steps++;
        }
        return steps;
    }
}
```

### Python3
```python
class Solution:
    def minimumStep (self, n):
        steps = 0
        while n > 1:
            if n % 3 == 0:
                n //= 3
            else:
                n -= 1
            steps += 1
        return steps
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in every language, so the explanation below applies to all four versions.

We begin with a variable that will count the steps. It starts at zero.

Then we enter a loop that continues as long as the current value is bigger than 1.  
Inside the loop we look at the remainder when the current value is divided by 3.

If the remainder is zero, the number is a multiple of 3. In that case the reverse of a multiply-by-3 edge is available, so we replace the number by its integer division by 3. This is the longest possible jump backwards and is therefore preferred.

If the remainder is not zero, no multiply-by-3 edge could have produced the current number. The only legal reverse move is a subtract-1, so we decrease the number by one.

After either change we add one to the step counter because we have just used one edge.

The loop eventually stops when the number becomes 1. At that moment the counter contains the exact length of the shortest path from 1 to the original n.

Edge-case handling is automatic:  
- When n = 1 the loop never runs and we correctly return 0.  
- When n is already a power of 3 the algorithm performs pure divisions and finishes in the fewest possible steps.

Because the same sequence of operations is performed in C++, Java, JavaScript and Python3, the results are identical across languages.

## Examples

Example 1  
Input: n = 4  
Output: 2  

Trace:  
4 is not divisible by 3 → 4 becomes 3 (1 step)  
3 is divisible by 3 → 3 becomes 1 (2 steps)  
We have reached 1, so the answer is 2.  
One possible shortest path is 1 → 3 → 4.

Example 2  
Input: n = 9  
Output: 2  

Trace:  
9 ÷ 3 = 3 (1 step)  
3 ÷ 3 = 1 (2 steps)  
Answer is 2.  
Path: 1 → 3 → 9.

Example 3  
Input: n = 15  
Output: 4  

Trace:  
15 ÷ 3 = 5 (1 step)  
5 is not divisible by 3 → 5 becomes 4 (2 steps)  
4 is not divisible by 3 → 4 becomes 3 (3 steps)  
3 ÷ 3 = 1 (4 steps)  
Answer is 4.  
Path: 1 → 3 → 4 → 5 → 15.

## How to Use / Run Locally

C++  
1. Copy the C++ code into a file named `solution.cpp`.  
2. Compile with `g++ solution.cpp -o solution`.  
3. Run with `./solution` and enter the value of n when prompted (or modify the main function to hard-code a test value).

Java  
1. Copy the Java code into a file named `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution`.

JavaScript  
1. Copy the JavaScript code into a file named `solution.js`.  
2. Run with `node solution.js` (you may need to add a small driver that calls the method and prints the result).

Python3  
1. Copy the Python code into a file named `solution.py`.  
2. Run with `python3 solution.py`.

In all languages you can wrap the core function with a simple main / driver that reads an integer from standard input and prints the returned value.

## Notes & Optimizations

- The greedy reverse strategy is optimal for this particular set of operations. Trying to subtract first even when the number is divisible by 3 produces longer paths.  
- Because consecutive subtractions happen at most twice between divisions, the algorithm never degrades to linear time.  
- An alternative BFS approach works for small n but fails the 10^8 constraint both in time and memory.  
- The same idea can be extended to other multiply-and-add problems; always consider the reverse operations first when the target is large.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
