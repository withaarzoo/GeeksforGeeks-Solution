# At Least K Occurrences - GeeksforGeeks Solution

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

We are given an array of integers and a number k. The task is to find the first element in the array that appears at least k times.

If more than one element reaches the count of k, we must return the one whose k-th occurrence comes earliest in the array. In other words, we care about the position of the k-th appearance, not just the total frequency.

If no element appears k or more times, the answer is -1.

This is a classic frequency counting problem often seen on GeeksforGeeks and other competitive programming platforms. It tests how well you can track counts while scanning the array only once.

## Constraints

- 1 ≤ arr.size() ≤ 10^6
- 0 ≤ arr[i] ≤ 10^6
- 1 ≤ k ≤ 10^3

The large size of the array (up to one million elements) means any solution slower than linear time will time out. We need an O(n) approach.

## Intuition

The key observation is that we do not need the final frequencies of all elements. We only need to know the moment when any element first reaches the count k.

If I walk from left to right and keep a running count of each number, the first time any count hits k is exactly the answer the problem wants. There is no reason to continue after that point.

This single-pass idea immediately points to using a hash map for frequency tracking.

## Approach

I create an empty frequency map.

I start scanning the array from the leftmost index.

For every number I see, I increase its count in the map by one.

Immediately after updating the count, I check whether that count has become equal to k.

If yes, I return the number right away. This is the earliest possible k-th occurrence.

If I finish the entire array without any count reaching k, I return -1.

This method guarantees both correctness and optimal time.

## Data Structures Used

- Hash Map (unordered_map in C++, HashMap in Java, Map in JavaScript, dict in Python)

I chose a hash map because the array elements can be as large as 10^6 and the number of distinct values is unknown. A fixed-size array of size 10^6 + 1 would waste memory when few distinct numbers appear. A hash map only stores the numbers that actually occur and gives average O(1) access time.

## Operations & Behavior Summary

1. Initialize an empty frequency map.
2. Iterate through each element of the array from left to right.
3. For the current element, increment its frequency by 1.
4. After the increment, test if the frequency is now equal to k.
5. If the test succeeds, return the current element immediately.
6. If the loop ends without any early return, return -1.

The algorithm never looks ahead or goes back. Everything is decided in one forward pass.

## Complexity

| Type              | Value | Explanation |
|-------------------|-------|-------------|
| Time Complexity   | O(n)  | We examine each of the n elements exactly once. Each map operation is average O(1). |
| Space Complexity  | O(n)  | In the worst case the map stores every element as a unique key. In practice the space is proportional to the number of distinct values. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int firstElementKTime(vector<int>& arr, int k) {
        unordered_map<int, int> freq;
        for (int num : arr) {
            freq[num]++;
            if (freq[num] == k) {
                return num;
            }
        }
        return -1;
    }
};
```

### Java
```java
class Solution {
    public int firstElementKTime(int[] arr, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int num : arr) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
            if (freq.get(num) == k) {
                return num;
            }
        }
        return -1;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */

class Solution {
    firstElementKTime(arr, k) {
        const freq = new Map();
        for (const num of arr) {
            freq.set(num, (freq.get(num) || 0) + 1);
            if (freq.get(num) === k) {
                return num;
            }
        }
        return -1;
    }
}
```

### Python3
```python
class Solution:
    def firstElementKTime(self, arr: list[int], k: int) -> int:
        freq = {}
        for num in arr:
            freq[num] = freq.get(num, 0) + 1
            if freq[num] == k:
                return num
        return -1
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages. Only the syntax for maps and loops changes.

I declare a frequency map that starts empty.

I loop over every integer in the input array.

Inside the loop I update the count of the current number. In C++ this is done with the [] operator, in Java with getOrDefault, in JavaScript with the || 0 pattern, and in Python with the get method.

Right after the update I compare the new count with k. Equality means this is the first time the element has appeared k times, so I return it at once.

If control reaches the end of the function, no element satisfied the condition and I return -1.

Edge cases are handled naturally:
- When k = 1 the first element of the array is returned immediately.
- When the array is empty or k is larger than the length of the array, the result is -1.
- Duplicate values that appear later never override an earlier answer because we return on the first hit.

## Examples

**Example 1**

Input: arr = [1, 7, 4, 3, 4, 8, 7], k = 2  
Output: 4

Trace:
- 1 → count 1  
- 7 → count 1  
- 4 → count 1  
- 3 → count 1  
- 4 → count 2 → return 4  

Both 4 and 7 eventually reach count 2, but 4 reaches it first.

**Example 2**

Input: arr = [3, 1, 3, 4, 5, 1, 3, 3, 5, 4], k = 3  
Output: 3

Trace:
- 3 appears at positions 0, 2, 6, 7  
- When the third 3 is seen (index 6), its count becomes 3 and we return 3.

**Example 3**

Input: arr = [10, 8, 2], k = 10  
Output: -1

No element appears even twice, so the answer is -1.

## How to Use / Run Locally

**C++**  
1. Copy the C++ code into a file named `main.cpp`.  
2. Compile with `g++ -std=c++17 main.cpp -o main`.  
3. Run with `./main`. You will need to add a simple driver that reads the array and k.

**Java**  
1. Place the code inside a class named `Solution` in a file `Solution.java`.  
2. Compile with `javac Solution.java`.  
3. Run with `java Solution` after adding a main method that supplies test cases.

**JavaScript**  
1. Save the code in a file `solution.js`.  
2. Run with Node.js: `node solution.js`. Add a few console.log statements to test.

**Python3**  
1. Save the code in `solution.py`.  
2. Run with `python3 solution.py`. Add a small test block under the class to verify the examples.

In all languages you can hard-code the sample inputs shown above to confirm the output.

## Notes & Optimizations

- The solution is already optimal for the given constraints. A second pass or sorting would only make it slower.
- If the problem ever restricted the range of values to a very small set, a plain array could replace the hash map and give slightly better constant factors. For the current constraints the hash map is the right choice.
- Watch out for the case k = 1; many people forget that the answer is simply the first element.
- Because we return as soon as the count hits k, the algorithm often finishes early and does not examine the whole array.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)
