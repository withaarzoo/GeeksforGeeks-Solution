# Max Equal Sum in 3 Stacks - GeeksforGeeks Solution

## Table of Contents
- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations &amp; Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
  - [C++](#c)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Python3](#python3)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes &amp; Optimizations](#notes--optimizations)
- [Author](#author)

## Problem Summary

We are given three stacks. Each stack is shown as an array, and the first element of the array is the top of that stack.

The task is to make the sum of the remaining elements in all three stacks equal by removing zero or more elements from the top of each stack. We want the largest possible equal sum. If it is impossible to make the three sums equal, we return 0.

This is a classic greedy problem on stacks that asks for the maximum equal sum after removing prefixes from three arrays.

## Constraints

- 1 ≤ size of s1, s2, s3 ≤ 5 × 10<sup>5</sup>
- 1 ≤ every element in the three arrays ≤ 10<sup>3</sup>

The large size of the arrays means any solution slower than linear time will time out.

## Intuition

The key observation is that we can only remove elements from the front of each array. That means the remaining part of every stack is always a suffix of the original array.

So the possible sums for one stack are the total sum minus some prefix sum. I need the largest number that can appear as a remaining sum in all three stacks at the same time.

My first thought was: keep subtracting the current top of the stack that has the biggest sum. Keep doing this until the three sums become equal or one stack becomes empty. This greedy choice works because reducing the largest sum is the only way the other two can ever catch up.

## Approach

1. Calculate the full sum of each of the three stacks.
2. Keep three index variables that point to the current top of each stack (they start at 0).
3. While the sums are not equal:
   - Find which sum is currently the largest.
   - If that stack is already empty, return 0.
   - Otherwise subtract the value at its current top and move the index forward by one.
4. When the three sums finally become equal, return that common value.

Because we always reduce the largest sum, the values keep getting closer. The first time they meet is the maximum possible equal sum.

## Data Structures Used

- Simple arrays / vectors / lists – the input stacks themselves.
- Three integer variables for the running sums.
- Three integer indices that act as pointers to the current tops.

No extra arrays, sets, or maps are needed. Everything stays in constant extra space.

## Operations &amp; Behavior Summary

- Compute total sum of s1, s2 and s3.
- Initialise three pointers i = j = k = 0.
- Loop:
  - If sum1 == sum2 == sum3 → return that value.
  - Else if sum1 is the largest → subtract s1[i] and i++.
  - Else if sum2 is the largest → subtract s2[j] and j++.
  - Else → subtract s3[k] and k++.
  - If any pointer reaches the end of its array → return 0.

This is essentially a linear scan that never looks at any element more than once.

## Complexity

| Type              | Complexity          | Explanation                                                                 |
|-------------------|---------------------|-----------------------------------------------------------------------------|
| Time Complexity   | O(n1 + n2 + n3)     | Each element is examined at most a constant number of times while the three pointers move from left to right. |
| Space Complexity  | O(1)                | Only a few integer variables are used. No extra data structures grow with input size. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int maxEqualSum(vector<int> &s1, vector<int> &s2, vector<int> &s3) {
        long long sum1 = 0, sum2 = 0, sum3 = 0;
        for (int x : s1) sum1 += x;
        for (int x : s2) sum2 += x;
        for (int x : s3) sum3 += x;
        int i = 0, j = 0, k = 0;
        int n1 = s1.size(), n2 = s2.size(), n3 = s3.size();
        while (true) {
            if (sum1 == sum2 && sum2 == sum3) return (int)sum1;
            if (sum1 >= sum2 && sum1 >= sum3) {
                if (i == n1) return 0;
                sum1 -= s1[i++];
            } else if (sum2 >= sum1 && sum2 >= sum3) {
                if (j == n2) return 0;
                sum2 -= s2[j++];
            } else {
                if (k == n3) return 0;
                sum3 -= s3[k++];
            }
        }
    }
};
```

### Java
```java
class Solution {
    public int maxEqualSum(ArrayList<Integer> s1, ArrayList<Integer> s2,
                           ArrayList<Integer> s3) {
        long sum1 = 0, sum2 = 0, sum3 = 0;
        for (int x : s1) sum1 += x;
        for (int x : s2) sum2 += x;
        for (int x : s3) sum3 += x;
        int i = 0, j = 0, k = 0;
        int n1 = s1.size(), n2 = s2.size(), n3 = s3.size();
        while (true) {
            if (sum1 == sum2 && sum2 == sum3) return (int)sum1;
            if (sum1 >= sum2 && sum1 >= sum3) {
                if (i == n1) return 0;
                sum1 -= s1.get(i++);
            } else if (sum2 >= sum1 && sum2 >= sum3) {
                if (j == n2) return 0;
                sum2 -= s2.get(j++);
            } else {
                if (k == n3) return 0;
                sum3 -= s3.get(k++);
            }
        }
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} s1
 * @param {number[]} s2
 * @param {number[]} s3
 * @returns {number}
 */

class Solution {
    maxEqualSum(s1, s2, s3) {
        let sum1 = 0, sum2 = 0, sum3 = 0;
        for (let x of s1) sum1 += x;
        for (let x of s2) sum2 += x;
        for (let x of s3) sum3 += x;
        let i = 0, j = 0, k = 0;
        let n1 = s1.length, n2 = s2.length, n3 = s3.length;
        while (true) {
            if (sum1 === sum2 && sum2 === sum3) return sum1;
            if (sum1 >= sum2 && sum1 >= sum3) {
                if (i === n1) return 0;
                sum1 -= s1[i++];
            } else if (sum2 >= sum1 && sum2 >= sum3) {
                if (j === n2) return 0;
                sum2 -= s2[j++];
            } else {
                if (k === n3) return 0;
                sum3 -= s3[k++];
            }
        }
    }
}
```

### Python3
```python
class Solution:
    def maxEqualSum(self, s1: list[int], s2: list[int], s3: list[int]) -> int:
        sum1 = sum(s1)
        sum2 = sum(s2)
        sum3 = sum(s3)
        i = j = k = 0
        n1, n2, n3 = len(s1), len(s2), len(s3)
        while True:
            if sum1 == sum2 == sum3:
                return sum1
            if sum1 >= sum2 and sum1 >= sum3:
                if i == n1:
                    return 0
                sum1 -= s1[i]
                i += 1
            elif sum2 >= sum1 and sum2 >= sum3:
                if j == n2:
                    return 0
                sum2 -= s2[j]
                j += 1
            else:
                if k == n3:
                    return 0
                sum3 -= s3[k]
                k += 1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical in all four languages; only the syntax changes.

First we compute the three full sums. This gives us the starting remaining sums.

Then we create three index variables. They tell us which element is currently sitting at the top of each stack. At the beginning they are all zero because the first element of each array is the top.

Inside the main loop we first check whether the three sums have become equal. If they have, that common value is the answer.

If they are not equal we compare them. The largest one must be reduced, otherwise the other two can never catch up. We therefore look at the stack that currently holds the largest sum.

For that stack we test whether its index has already reached the end of the array. If it has, there is nothing left to remove, so it is impossible and we return 0.

Otherwise we subtract the value that is at the current top and then move the index one position forward. That single subtraction is exactly the same as popping the top element.

Because every iteration either returns an answer or reduces one of the sums by a positive amount, the loop cannot run forever. When it finally stops with equal sums, those sums are the largest possible equal value, because we never reduced a sum that was already smaller than the others.

Edge cases handled automatically:
- One or more stacks already empty → immediate return 0.
- All three stacks have the same sum from the start → return that sum without removing anything.
- No common non-zero sum exists → the pointers eventually reach the end and we return 0.

## Examples

**Example 1**  
Input: s1 = [3, 2, 1, 1, 1], s2 = [4, 3, 2], s3 = [2, 5, 4, 1]  
Output: 5  

Trace:  
- Initial sums: 8, 9, 12  
- Remove 2 from s3 → sums become 8, 9, 10  
- Remove 4 from s2 → sums become 8, 5, 10  
- Remove 3 from s1 → sums become 5, 5, 10  
- Remove 5 from s3 → sums become 5, 5, 5  
- Equal sum found → return 5

**Example 2**  
Input: s1 = [4, 7], s2 = [10], s3 = [1, 2, 3]  
Output: 0  

Trace:  
- Initial sums: 11, 10, 6  
- Keep reducing the largest sum. Eventually one of the stacks becomes empty while the other two still have different remaining sums → return 0.

**Example 3**  
Input: s1 = [1, 2, 3], s2 = [1, 2, 3], s3 = [1, 2, 3]  
Output: 6  

No removals needed. All three sums are already equal.

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `main.cpp`.  
2. Compile: `g++ -o main main.cpp`  
3. Run: `./main`  
(You will need to add a small driver that reads the three arrays and calls the function.)

**Java**  
1. Save the code in a file named `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`  
(Add a main method that creates the ArrayLists and prints the result.)

**JavaScript**  
1. Save the code in a file named `solution.js`.  
2. Run with Node: `node solution.js`  
(Add a few console.log statements that call the method with sample arrays.)

**Python3**  
1. Save the code in a file named `solution.py`.  
2. Run: `python3 solution.py`  
(Add a small if __name__ == "__main__" block that creates the lists and prints the answer.)

## Notes &amp; Optimizations

- The solution runs in strict linear time and constant extra space, which is optimal for the given constraints.
- An alternative approach stores all possible suffix sums of two stacks in a set and then walks the third stack looking for a common value. That also works but uses O(n) extra space, which is unnecessary here.
- Because elements are positive, the sums only decrease. This guarantees that the first equal value we find is the maximum one.
- Watch out for integer overflow when the arrays are large. In C++ and Java it is safer to use 64-bit integers for the running sums.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
