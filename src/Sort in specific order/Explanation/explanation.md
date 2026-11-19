# Sort in Specific Order - GeeksforGeeks Solution

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

You are given an array of non-negative integers. The task is to rearrange the array so that all odd numbers appear first, sorted in descending order, followed by all even numbers sorted in ascending order.

In simple words, the final array should look like this: largest odd, next largest odd, ..., smallest odd, then smallest even, next smallest even, ..., largest even.

This is a classic array rearrangement problem often seen in coding interviews and on platforms like GeeksforGeeks under the title “Sort in Specific Order”.

## Constraints

- 1 ≤ array size ≤ 10^5
- 0 ≤ each array element ≤ 10^9

These limits mean a solution must run in O(n log n) time or better and should avoid using large amounts of extra memory.

## Intuition

When I first read the problem I noticed two independent groups inside the same array: the odd numbers and the even numbers.  

The odds need their own sorting rule (descending) and the evens need a different rule (ascending). At the same time the odds must stay completely to the left of the evens.  

My first instinct was to separate the two groups, sort each group, and then merge them back. That works, but it needs extra space.  

Because the array can be as large as 100 000 elements, I preferred an in-place approach. The cleanest way is a single custom sort that already understands both the parity rule and the order rule.

## Approach

I sort the entire array once using a custom comparison (or a key function in Python).  

The comparison decides the relative order of any two numbers a and b with three simple rules:

1. If both numbers are odd, the larger one comes first.  
2. If both numbers are even, the smaller one comes first.  
3. If one is odd and the other is even, the odd number always comes before the even number.

After this single sort finishes, every odd number sits in front of every even number, the odds are in descending order, and the evens are in ascending order. No extra arrays or second passes are required.

## Data Structures Used

- The input array itself (vector in C++, int[] in Java, Array in JavaScript and Python).  
  Everything happens in-place on this array. No additional lists, stacks or maps are created by the algorithm.

## Operations & Behavior Summary

1. Receive the input array.  
2. Call the language’s built-in sort with a custom rule.  
3. For every pair of elements the custom rule checks their parity.  
4. Odds are forced left and ordered from large to small.  
5. Evens are forced right and ordered from small to large.  
6. When the sort ends the array already satisfies the required order.  
7. Return (or simply leave) the modified array.

## Complexity

| Complexity       | Value     | Explanation                                                                 |
|------------------|-----------|-----------------------------------------------------------------------------|
| Time Complexity  | O(n log n)| One call to a standard comparison-based sort on n elements.                 |
| Space Complexity | O(1)      | No extra arrays are allocated by the algorithm (language sort may use a small amount of stack space). |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    void sortIt(vector<int>& arr) {
        sort(arr.begin(), arr.end(), [](int a, int b) {
            bool aOdd = a % 2 != 0;
            bool bOdd = b % 2 != 0;
            if (aOdd && bOdd) return a > b;
            if (!aOdd && !bOdd) return a < b;
            return aOdd;
        });
    }
};
```

### Java
```java
class Solution {
    public void sortIt(int[] arr) {
        Integer[] temp = new Integer[arr.length];
        for (int i = 0; i < arr.length; i++) temp[i] = arr[i];
        Arrays.sort(temp, (a, b) -> {
            boolean aOdd = a % 2 != 0;
            boolean bOdd = b % 2 != 0;
            if (aOdd && bOdd) return b - a;
            if (!aOdd && !bOdd) return a - b;
            return aOdd ? -1 : 1;
        });
        for (int i = 0; i < arr.length; i++) arr[i] = temp[i];
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} arr
 * @returns {void}
 */

class Solution {
    sortIt(arr) {
        arr.sort((a, b) => {
            const aOdd = a % 2 !== 0;
            const bOdd = b % 2 !== 0;
            if (aOdd && bOdd) return b - a;
            if (!aOdd && !bOdd) return a - b;
            return aOdd ? -1 : 1;
        });
    }
}
```

### Python3
```python
class Solution:
    def sortIt(self, arr):
        arr.sort(key=lambda x: (x % 2 == 0, -x if x % 2 else x))
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

**Common idea across all languages**  
The heart of the solution is a comparison that looks at two numbers and decides which one should appear earlier. The decision is based only on whether the numbers are odd or even and on their actual values.

**C++**  
I pass a lambda to `std::sort`. Inside the lambda I first test the parity of both numbers with the modulo operator.  
- Both odd → return whether the first is larger.  
- Both even → return whether the first is smaller.  
- Different parity → return true only when the first number is odd.  

This forces the exact order required by the problem while staying completely in-place.

**Java**  
Java’s `Arrays.sort` on a primitive `int[]` does not accept a custom comparator, so I first copy the values into an `Integer[]`.  
I then supply a lambda that follows the same three rules as the C++ version. After sorting I copy the values back into the original array.  
The temporary array is required by the language, not by the algorithm logic.

**JavaScript**  
JavaScript arrays can be sorted directly with a comparator function.  
The comparator returns a negative number, zero, or a positive number according to the same three rules.  
Because JavaScript numbers are already objects, no extra conversion is needed.

**Python3**  
Python’s `list.sort` accepts a key function.  
I return a two-element tuple:  
`(x % 2 == 0, -x if x % 2 else x)`  

The first element is False for odds and True for evens, so all odds appear before all evens.  
The second element is the negated value for odds (so larger odds come first) and the plain value for evens (so smaller evens come first).  
Python’s tuple comparison does the rest automatically.

**Edge cases handled by the same logic**  
- Zero is treated as even, which is correct.  
- Arrays that contain only odds or only evens still produce the right order.  
- Duplicate values are stable under the comparison.

## Examples

**Example 1**  
Input: `[1, 2, 3, 5, 4, 7, 10]`  
- Odds: 1, 3, 5, 7 → sorted descending → 7, 5, 3, 1  
- Evens: 2, 4, 10 → sorted ascending → 2, 4, 10  
Output: `[7, 5, 3, 1, 2, 4, 10]`

**Example 2**  
Input: `[0, 4, 5, 3, 7, 2, 1]`  
- Odds: 5, 3, 7, 1 → sorted descending → 7, 5, 3, 1  
- Evens: 0, 4, 2 → sorted ascending → 0, 2, 4  
Output: `[7, 5, 3, 1, 0, 2, 4]`

**Example 3**  
Input: `[2, 4, 6]`  
- No odd numbers.  
- Evens stay in ascending order.  
Output: `[2, 4, 6]`

## How to Use / Run Locally

**C++**  
1. Copy the C++ code into a file named `main.cpp`.  
2. Compile: `g++ -std=c++17 main.cpp -o main`  
3. Run: `./main`  
4. Feed the array size and elements through standard input (or hard-code a test case).

**Java**  
1. Put the Java code inside a class file named `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`  
4. Create a small driver method that builds an array and calls `sortIt`.

**JavaScript**  
1. Save the code in a file `solution.js`.  
2. Run with Node: `node solution.js`  
3. Call the method on any array you create inside the file.

**Python3**  
1. Save the code in `solution.py`.  
2. Run: `python3 solution.py`  
3. Create a list, call the method, and print the list to see the result.

## Notes & Optimizations

- The solution already meets the expected O(n log n) time and O(1) extra space.  
- An alternative approach is to partition the array into odds and evens first (two-pointer style) and then sort each half separately. That also works and can be slightly more cache-friendly, but the single custom sort is simpler to write and maintain.  
- Because the constraints allow values up to 10^9, using a modulo-2 check is safe and fast.  
- If the problem ever required stable sorting among equal elements, the current comparator already preserves relative order for equal numbers of the same parity.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
