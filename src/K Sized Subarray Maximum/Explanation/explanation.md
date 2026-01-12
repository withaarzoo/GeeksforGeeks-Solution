# K Sized Subarray Maximum

## Table of Contents

* Problem Summary
* Constraints
* Intuition
* Approach
* Data Structures Used
* Operations & Behavior Summary
* Complexity
* Multi-language Solutions

  * C++
  * Java
  * JavaScript
  * Python3
* Step-by-step Detailed Explanation
* Examples
* How to Use / Run Locally
* Notes & Optimizations
* Author

---

## Problem Summary

Given an array of integers `arr[]` and an integer `k`, I have to find the **maximum element in every contiguous subarray of size k**.

The output should be a list of maximum values, one for each window of size k.

This problem is commonly asked in interviews to test **sliding window optimization** and **data structure knowledge**.

---

## Constraints

* 1 ≤ arr.size() ≤ 10⁶
* 1 ≤ k ≤ arr.size()
* 0 ≤ arr[i] ≤ 10⁹

The constraints are large, so an inefficient solution will fail.

---

## Intuition

When I first thought about this problem, the brute force idea came naturally.
For every window of size k, loop again and find the maximum.

But I quickly realized this approach is too slow for large inputs.

So I asked myself
Do I really need to re-check all elements again and again?

The answer was no.

I needed a way to **remember useful elements** and **discard useless ones**.
That is when I decided to use a **Deque** to track maximum values efficiently.

---

## Approach

I used the **Sliding Window + Deque** technique.

Here is how I solved it step by step:

1. I maintain a deque that stores **indexes**, not values.
2. The deque always keeps elements in **decreasing order of their values**.
3. The front of the deque always represents the **maximum element** of the current window.
4. While adding a new element:

   * I remove smaller elements from the back.
   * I remove elements from the front if they go out of the window.
5. Once the window size reaches `k`, I record the front element as the answer.

This ensures every element is processed only once.

---

## Data Structures Used

* **Deque (Double Ended Queue)**
  Used to efficiently insert and remove elements from both ends.

* **Array / List**
  Used to store the final result.

---

## Operations & Behavior Summary

* Push elements into deque while maintaining decreasing order.
* Pop elements that fall outside the current window.
* Always take the front element of the deque as the maximum.
* Slide the window one step at a time.

---

## Complexity

**Time Complexity:**
O(n)
Where n is the size of the array.
Each element is added and removed from the deque only once.

**Space Complexity:**
O(k)
The deque stores at most k elements.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> maxOfSubarrays(vector<int>& arr, int k) {
        deque<int> dq;
        vector<int> result;

        for (int i = 0; i < arr.size(); i++) {

            if (!dq.empty() && dq.front() == i - k)
                dq.pop_front();

            while (!dq.empty() && arr[dq.back()] <= arr[i])
                dq.pop_back();

            dq.push_back(i);

            if (i >= k - 1)
                result.push_back(arr[dq.front()]);
        }
        return result;
    }
};
```

---

### Java

```java
class Solution {
    public ArrayList<Integer> maxOfSubarrays(int[] arr, int k) {
        Deque<Integer> dq = new ArrayDeque<>();
        ArrayList<Integer> result = new ArrayList<>();

        for (int i = 0; i < arr.length; i++) {

            if (!dq.isEmpty() && dq.peekFirst() == i - k)
                dq.pollFirst();

            while (!dq.isEmpty() && arr[dq.peekLast()] <= arr[i])
                dq.pollLast();

            dq.addLast(i);

            if (i >= k - 1)
                result.add(arr[dq.peekFirst()]);
        }
        return result;
    }
}
```

---

### JavaScript

```javascript
class Solution {
    maxOfSubarrays(arr, k) {
        let dq = [];
        let result = [];

        for (let i = 0; i < arr.length; i++) {

            if (dq.length && dq[0] === i - k)
                dq.shift();

            while (dq.length && arr[dq[dq.length - 1]] <= arr[i])
                dq.pop();

            dq.push(i);

            if (i >= k - 1)
                result.push(arr[dq[0]]);
        }
        return result;
    }
}
```

---

### Python3

```python
from collections import deque

class Solution:
    def maxOfSubarrays(self, arr, k):
        dq = deque()
        result = []

        for i in range(len(arr)):

            if dq and dq[0] == i - k:
                dq.popleft()

            while dq and arr[dq[-1]] <= arr[i]:
                dq.pop()

            dq.append(i)

            if i >= k - 1:
                result.append(arr[dq[0]])

        return result
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

* I loop through the array from left to right.
* I remove elements from the front of the deque if they are out of range.
* I remove smaller elements from the back because they can never be the maximum.
* I push the current index into the deque.
* Once the window size becomes k, I take the front value as the answer.

This logic is exactly the same in all four languages.

---

## Examples

**Input**
arr = [1, 2, 3, 1, 4, 5, 2, 3, 6]
k = 3

**Output**
[3, 3, 4, 5, 5, 5, 6]

**Explanation**
Each value represents the maximum element of a subarray of size 3.

---

## How to Use / Run Locally

1. Clone the repository
2. Choose your preferred language file
3. Compile or run using the respective compiler or interpreter
4. Provide input as required by the platform or driver code

---

## Notes & Optimizations

* Brute force solutions will fail due to time limits.
* This approach is optimal and interview-approved.
* Works efficiently even for very large arrays.
* Always use deque for sliding window maximum problems.

---

## Author

* [Md Aarzoo Islam](https://bento.me/withaarzoo)
