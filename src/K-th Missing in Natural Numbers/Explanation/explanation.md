# K-th Missing in Natural Numbers - GeeksforGeeks Solution

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

You are given an array of distinct positive integers and a positive integer k. Imagine the infinite sequence of natural numbers starting from 1 (1, 2, 3, 4, ...). Your task is to remove every number that appears in the given array from this sequence. After removal, you need to find the k-th smallest number that still remains in the sequence.

In simple words, the array punches holes in the natural number line, and you have to return the k-th number that was never punched.

This is a classic competitive programming problem that tests your ability to handle missing numbers efficiently without extra space.

## Constraints

- 1 ≤ arr.size() ≤ 10^5
- 1 ≤ arr[i], k ≤ 10^6
- All elements of arr are distinct

## Intuition

The first thing I noticed is that the natural numbers are ordered, so the missing numbers are also ordered. If I sort the given array, the gaps between consecutive numbers become easy to count.  

Once the array is sorted, I can walk from left to right and keep track of how many numbers are missing in each gap. As soon as the remaining k falls inside a gap, I know the exact answer. If k is still left after the last element, the answer simply continues after the largest number in the array.  

This approach feels natural because it turns an infinite sequence problem into a finite gap-counting problem.

## Approach

1. Sort the array in increasing order.  
2. Start with a variable that remembers the previous number (initially 0).  
3. For every number in the sorted array, calculate how many integers are missing between the previous number and the current number.  
4. If the remaining k is smaller than or equal to the size of this gap, the answer is previous + k.  
5. Otherwise subtract the gap size from k and move the previous pointer forward.  
6. After processing the entire array, if any k is still left, add it to the last number.

The whole process uses only a few integer variables and works in linear time after sorting.

## Data Structures Used

- Array / Vector: The input itself. We sort it in place so no extra array is required.  
- A few integer variables (prev, missing, k): Used to track the last seen number and the remaining count of missing numbers we still need.

No sets, maps, or extra lists are needed. This keeps the auxiliary space constant.

## Operations & Behavior Summary

- Sort the input array.  
- Initialize previous number as 0.  
- For each number in the sorted array:  
  - Compute the gap size = current - previous - 1.  
  - If k ≤ gap size → return previous + k.  
  - Else reduce k by the gap size and set previous = current.  
- After the loop, return previous + remaining k.

This is essentially a single pass over the sorted numbers while maintaining a running count of missing values.

## Complexity

| Type              | Complexity   | Explanation                                      |
|-------------------|--------------|--------------------------------------------------|
| Time Complexity   | O(n log n)   | Dominated by sorting. The later scan is O(n).    |
| Space Complexity  | O(1)         | Only a constant number of extra integer variables are used. Sorting is done in place. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int findKthSmall(vector<int>& arr, int k) {
        sort(arr.begin(), arr.end());
        int prev = 0;
        for (int num : arr) {
            int missing = num - prev - 1;
            if (k <= missing) {
                return prev + k;
            }
            k -= missing;
            prev = num;
        }
        return prev + k;
    }
};
```

### Java
```java
class Solution {
    public int findKthSmall(int[] arr, int k) {
        Arrays.sort(arr);
        int prev = 0;
        for (int num : arr) {
            int missing = num - prev - 1;
            if (k <= missing) {
                return prev + k;
            }
            k -= missing;
            prev = num;
        }
        return prev + k;
    }
}
```

### JavaScript
```javascript
class Solution {
    findKthSmall(arr, k) {
        arr.sort((a, b) => a - b);
        let prev = 0;
        for (let num of arr) {
            let missing = num - prev - 1;
            if (k <= missing) {
                return prev + k;
            }
            k -= missing;
            prev = num;
        }
        return prev + k;
    }
}
```

### Python3
```python
class Solution:
    def findKthSmall(self, arr, k):
        arr.sort()
        prev = 0
        for num in arr:
            missing = num - prev - 1
            if k <= missing:
                return prev + k
            k -= missing
            prev = num
        return prev + k
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages. Here is the reasoning behind each major step:

- Sorting is the foundation. Without sorted order we cannot measure consecutive gaps correctly.  
- Starting previous at 0 lets the first gap correctly cover the numbers from 1 up to the smallest array element.  
- The formula `current - previous - 1` counts exactly the integers that sit strictly between two consecutive values.  
- The early-return check (`if k ≤ missing`) is important for correctness and also for speed: as soon as we know the answer we stop.  
- Subtracting the gap from k is safe because we have already verified that k is larger than the gap.  
- Updating previous after each step ensures the next gap starts from the correct position.  
- The final `previous + k` handles the case when the k-th missing number lies after the largest element of the array.

Edge cases handled naturally:
- When the array starts with 1, the first gap is zero.  
- When k is larger than all gaps inside the array, the answer continues after the last element.  
- When the array is empty (though constraints guarantee size ≥ 1), the answer would simply be k.

## Examples

**Example 1**  
Input: arr = [1, 9, 5, 2], k = 6  

Sorted: [1, 2, 5, 9]  
- Gap before 1: 0 → k stays 6  
- Gap between 1 and 2: 0 → k stays 6  
- Gap between 2 and 5: 2 (3 and 4) → k becomes 4  
- Gap between 5 and 9: 3 (6, 7, 8) → k becomes 1  
- After 9 we still need 1 more → answer = 9 + 1 = 10  

Output: 10

**Example 2**  
Input: arr = [1, 2, 3, 4], k = 1  

Sorted: [1, 2, 3, 4]  
All early gaps are zero. After the last element we still need 1 → answer = 4 + 1 = 5  

Output: 5

**Example 3**  
Input: arr = [4, 7, 9], k = 3  

Sorted: [4, 7, 9]  
- Gap before 4: 3 (1, 2, 3) → k = 3 ≤ 3 → answer = 0 + 3 = 3  

Output: 3

## How to Use / Run Locally

**C++**  
1. Save the code in a file named `solution.cpp`.  
2. Compile: `g++ -std=c++17 solution.cpp -o solution`  
3. Run: `./solution`  
(You will need to add a small main function that reads input and prints the result.)

**Java**  
1. Save the code in `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`  
(Add a main method that creates an instance and calls the function.)

**JavaScript**  
1. Save the code in `solution.js`.  
2. Run with Node: `node solution.js`  
(Add a few console.log statements at the bottom to test the function.)

**Python3**  
1. Save the code in `solution.py`.  
2. Run: `python3 solution.py`  
(Add a simple if __name__ == "__main__" block to read input and print the answer.)

## Notes & Optimizations

- The solution already meets the expected O(n log n) time and O(1) auxiliary space.  
- Because the array elements are distinct, we never have to worry about duplicate gaps.  
- An alternative binary-search-on-answer approach also works and can be useful when the array is already sorted, but the linear scan after sorting is simpler and equally efficient for the given constraints.  
- Be careful with integer overflow in languages where int is 32-bit if k and arr[i] are both close to 10^6; using long (or 64-bit integers) is safer in those cases.  
- The problem statement requires O(1) auxiliary space, which this solution satisfies by sorting in place and using only a constant amount of extra memory.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
