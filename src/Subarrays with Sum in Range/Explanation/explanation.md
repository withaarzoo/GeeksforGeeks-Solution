# Subarrays with Sum in Range | Sliding Window Solution (C++, Java, JavaScript, Python)

A beginner-friendly solution for the GeeksforGeeks **Subarrays with Sum in Range** problem using the **Sliding Window** technique. This repository explains the intuition, approach, complexity analysis, worked examples, and provides solutions in **C++, Java, JavaScript, and Python**.

The solution runs in **O(n)** time by taking advantage of the fact that all array elements are positive.

---

## Table of Contents

- [Problem Summary](#problem-summary)
- [Constraints](#constraints)
- [Intuition](#intuition)
- [Approach](#approach)
- [Data Structures Used](#data-structures-used)
- [Operations & Behavior Summary](#operations--behavior-summary)
- [Complexity](#complexity)
- [Multi-language Solutions](#multi-language-solutions)
- [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
- [Examples](#examples)
- [How to Use / Run Locally](#how-to-use--run-locally)
- [Notes & Optimizations](#notes--optimizations)
- [Author](#author)

---

## Problem Summary

Given an array of positive integers and two integers **l** and **r**, the goal is to count how many contiguous subarrays have a sum that lies within the inclusive range **[l, r]**.

A subarray must contain consecutive elements from the original array.

The challenge is to solve this efficiently because the array size can be as large as **100,000**. A simple brute-force approach that checks every possible subarray would be far too slow.

This problem is a classic example of using the **Sliding Window algorithm** on arrays containing only positive integers.

---

## Constraints

| Constraint | Value |
| ------------ | ------- |
| Array Size | 1 ≤ n ≤ 10<sup>5</sup> |
| Array Element | 1 ≤ arr[i] ≤ 10<sup>4</sup> |
| Range | 1 ≤ l ≤ r ≤ 10<sup>9</sup> |

---

## Intuition

The first thing I noticed was that every element in the array is positive.

That single observation completely changes the problem.

Since every new element increases the current sum, I can safely use a sliding window. Instead of directly counting subarrays whose sums fall inside **[l, r]**, I count:

- all subarrays with sum less than or equal to **r**
- all subarrays with sum less than or equal to **l − 1**

The difference between these two counts gives exactly the number of subarrays whose sums lie inside the required range.

This makes the solution much simpler while keeping it very efficient.

---

## Approach

I solve the problem in two steps.

First, I write a helper function that counts how many subarrays have a sum less than or equal to a given limit.

Inside this helper function:

1. Start with two pointers representing a sliding window.
2. Expand the window by moving the right pointer.
3. Keep adding elements to the current window sum.
4. If the sum becomes greater than the limit, move the left pointer until the window becomes valid again.
5. Every valid window contributes multiple valid subarrays ending at the current index.
6. Add those subarrays to the final answer.

Finally, calculate:

```
Count(sum ≤ r) − Count(sum ≤ l − 1)
```

That difference is the required answer.

---

## Data Structures Used

| Data Structure | Purpose |
| --------------- | --------- |
| Array | Stores the input elements |
| Integer Variables | Store pointers, running sum, and answer |

No additional arrays, hash maps, stacks, queues, or trees are required.

---

## Operations & Behavior Summary

The algorithm performs the following operations:

1. Create a helper function that counts subarrays whose sum is at most a given limit.
2. Maintain a sliding window using two pointers.
3. Expand the window one element at a time.
4. Shrink the window whenever its sum becomes too large.
5. Count every valid subarray ending at the current position.
6. Repeat the process twice:
   - once for **r**
   - once for **l − 1**
7. Return the difference between the two counts.

Because each pointer only moves forward, the entire algorithm runs in linear time.

---

## Complexity

| Complexity | Value | Explanation |
|------------|-------|-------------|
| Time Complexity | O(n) | Each element enters and leaves the sliding window at most once. |
| Space Complexity | O(1) | Only a few variables are used. No extra data structures are required. |

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // Returns the number of subarrays whose sum is <= limit
    long long countAtMost(vector<int>& arr, int limit) {
        
        // If limit is negative, no positive subarray can satisfy it
        if (limit < 0)
            return 0;
        
        int left = 0;
        long long sum = 0;
        long long ans = 0;
        
        // Expand the window one element at a time
        for (int right = 0; right < arr.size(); right++) {
            
            // Include current element
            sum += arr[right];
            
            // Shrink window until sum becomes valid
            while (sum > limit) {
                sum -= arr[left];
                left++;
            }
            
            // Every subarray ending at right is valid
            ans += (right - left + 1);
        }
        
        return ans;
    }
    
    int countSubarray(vector<int>& arr, int l, int r) {
        
        // Required answer
        return countAtMost(arr, r) - countAtMost(arr, l - 1);
    }
};
```

### Java

```java
class Solution {
    
    // Returns number of subarrays having sum <= limit
    private long countAtMost(int[] arr, int limit) {
        
        // No valid subarray if limit is negative
        if (limit < 0)
            return 0;
        
        int left = 0;
        long sum = 0;
        long ans = 0;
        
        // Move right pointer through the array
        for (int right = 0; right < arr.length; right++) {
            
            // Add current element into window
            sum += arr[right];
            
            // Remove elements until window becomes valid
            while (sum > limit) {
                sum -= arr[left];
                left++;
            }
            
            // Count all valid subarrays ending at right
            ans += (right - left + 1);
        }
        
        return ans;
    }
    
    public int countSubarray(int[] arr, int l, int r) {
        
        // Difference gives subarrays inside [l, r]
        return (int)(countAtMost(arr, r) - countAtMost(arr, l - 1));
    }
}
```

### JavaScript

```javascript
class Solution {
    
    // Returns number of subarrays with sum <= limit
    countAtMost(arr, limit) {
        
        // Positive numbers cannot produce negative sums
        if (limit < 0)
            return 0;
        
        let left = 0;
        let sum = 0;
        let ans = 0;
        
        // Expand window
        for (let right = 0; right < arr.length; right++) {
            
            // Add current element
            sum += arr[right];
            
            // Shrink while sum is too large
            while (sum > limit) {
                sum -= arr[left];
                left++;
            }
            
            // Count all valid subarrays ending at right
            ans += (right - left + 1);
        }
        
        return ans;
    }
    
    countSubarray(arr, l, r) {
        
        // Required answer
        return this.countAtMost(arr, r) - this.countAtMost(arr, l - 1);
    }
};
```

### Python3

```python
class Solution:
    
    # Returns number of subarrays whose sum is <= limit
    def countAtMost(self, arr, limit):
        
        # No positive subarray can have negative sum
        if limit < 0:
            return 0
        
        left = 0
        current_sum = 0
        ans = 0
        
        # Expand the window
        for right in range(len(arr)):
            
            # Include current element
            current_sum += arr[right]
            
            # Shrink window until it becomes valid
            while current_sum > limit:
                current_sum -= arr[left]
                left += 1
            
            # Every subarray ending at right is valid
            ans += right - left + 1
        
        return ans
    
    def countSubarray(self, arr: list[int], l: int, r: int) -> int:
        # Count subarrays inside the required range
        return self.countAtMost(arr, r) - self.countAtMost(arr, l - 1)
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic remains exactly the same in all four programming languages.

First, the solution creates a helper function that counts subarrays with sums less than or equal to a specific limit.

A sliding window is maintained using two pointers.

The right pointer keeps expanding the window by including new elements.

Whenever the current sum becomes larger than the allowed limit, the left pointer moves forward until the window becomes valid again.

Since every array element is positive, removing elements from the left always decreases the current sum. This property is the reason the sliding window works perfectly for this problem.

Once the window becomes valid, every subarray ending at the current right index and starting anywhere between the left and right pointers is also valid.

Instead of checking each subarray individually, the algorithm counts all of them together in constant time.

After obtaining the count of subarrays with sums less than or equal to **r**, the same process is repeated for **l − 1**.

Subtracting these two values removes every subarray whose sum is smaller than **l**, leaving only the subarrays whose sums fall inside the required range.

Although the syntax differs slightly across C++, Java, JavaScript, and Python, the algorithm and execution flow remain identical.

---

## Examples

### Example 1

**Input**

```
arr = [1, 4, 6]
l = 3
r = 8
```

**Output**

```
3
```

**Explanation**

Valid subarrays are:

```
[1,4]
[4]
[6]
```

Answer = **3**

---

### Example 2

**Input**

```
arr = [2,3,5,8]
l = 4
r = 13
```

**Output**

```
6
```

**Explanation**

Valid subarrays are:

```
[2,3]
[2,3,5]
[3,5]
[5]
[5,8]
[8]
```

Answer = **6**

---

### Example 3

**Input**

```
arr = [5]
l = 1
r = 5
```

**Output**

```
1
```

**Explanation**

The only subarray is `[5]`, and its sum lies inside the required range.

---

## How to Use / Run Locally

Clone the repository.

```bash
git clone https://github.com/your-username/subarrays-with-sum-in-range.git
```

Move into the project directory.

```bash
cd subarrays-with-sum-in-range
```

### C++

Compile

```bash
g++ solution.cpp -o solution
```

Run

```bash
./solution
```

---

### Java

Compile

```bash
javac Solution.java
```

Run

```bash
java Solution
```

---

### JavaScript

Run

```bash
node solution.js
```

---

### Python3

Run

```bash
python solution.py
```

---

## Notes & Optimizations

- This solution works only because every array element is positive.
- If negative numbers were allowed, the sliding window technique would no longer be valid.
- A brute-force solution would require O(n²) time and would exceed the time limit for large inputs.
- Using the "count at most" idea is a common optimization for solving range-based subarray problems.
- The algorithm uses constant extra memory, making it suitable for very large arrays.
- This is one of the most useful Sliding Window patterns to learn for competitive programming and coding interviews.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
