# Buildings with Sunlight

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
  * Go
* Step-by-step Detailed Explanation
* Examples
* How to use / Run locally
* Notes & Optimizations
* Author

## Problem Summary

Given an array `arr[]` representing heights of buildings placed next to each other, sunlight falls from the left side.

A building can receive sunlight if there is **no taller building to its left**.

Return the total number of buildings that can receive sunlight.

## Constraints

* 1 ≤ arr.size() ≤ 10^5
* 1 ≤ arr[i] ≤ 10^5

## Intuition

I thought about how sunlight comes strictly from the left side. So, any building will only receive sunlight if no taller building blocks it from the left.

This means I need to keep track of the tallest building seen so far while traversing from left to right.

If the current building is taller than or equal to that maximum height, it will receive sunlight.

## Approach

1. Start from the first building.
2. Assume the first building always gets sunlight.
3. Maintain a variable `maxHeight`.
4. Traverse the array from left to right.
5. If current building height ≥ `maxHeight`:

   * Increment count
   * Update `maxHeight`
6. Return the count.

## Data Structures Used

* Only variables (no extra data structures)
* `maxHeight` to track tallest building so far
* `count` to track visible buildings

## Operations & Behavior Summary

* Single pass traversal
* Compare current height with max so far
* Update when condition satisfies

## Complexity

* Time Complexity: O(n)

  * We traverse the array once
* Space Complexity: O(1)

  * No extra space is used

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    int visibleBuildings(vector<int>& arr) {
        int count = 1;
        int maxHeight = arr[0];
        
        for(int i = 1; i < arr.size(); i++) {
            if(arr[i] >= maxHeight) {
                count++;
                maxHeight = arr[i];
            }
        }
        
        return count;
    }
};
```

### Java

```java
class Solution {
    public int visibleBuildings(int arr[]) {
        int count = 1;
        int maxHeight = arr[0];
        
        for(int i = 1; i < arr.length; i++) {
            if(arr[i] >= maxHeight) {
                count++;
                maxHeight = arr[i];
            }
        }
        
        return count;
    }
}
```

### JavaScript

```javascript
class Solution {
    visibleBuildings(arr) {
        let count = 1;
        let maxHeight = arr[0];
        
        for(let i = 1; i < arr.length; i++) {
            if(arr[i] >= maxHeight) {
                count++;
                maxHeight = arr[i];
            }
        }
        
        return count;
    }
}
```

### Python3

```python
class Solution:
    def visibleBuildings(self, arr):
        count = 1
        maxHeight = arr[0]
        
        for i in range(1, len(arr)):
            if arr[i] >= maxHeight:
                count += 1
                maxHeight = arr[i]
        
        return count
```

### Go

```go
package main

func visibleBuildings(arr []int) int {
    count := 1
    maxHeight := arr[0]

    for i := 1; i < len(arr); i++ {
        if arr[i] >= maxHeight {
            count++
            maxHeight = arr[i]
        }
    }

    return count
}
```

## Step-by-step Detailed Explanation

1. Initialize `count = 1` because the first building always gets sunlight.
2. Set `maxHeight = arr[0]`.
3. Start looping from index 1.
4. For each building:

   * Compare it with `maxHeight`.
   * If it is greater than or equal:

     * Increment count
     * Update `maxHeight`
5. Continue till the end.
6. Return count.

This works because we ensure that no taller building exists before the current one.

## Examples

Input: [6, 2, 8, 4, 11, 13]
Output: 4

Explanation:
Visible buildings are 6, 8, 11, 13

Input: [2, 5, 1, 8, 3]
Output: 3

Explanation:
Visible buildings are 2, 5, 8

Input: [3, 3, 3, 1]
Output: 3

Explanation:
First three buildings are visible

## How to use / Run locally

1. Copy the code into your preferred language file
2. Compile and run:

C++:

```
g++ file.cpp -o output
./output
```

Java:

```
javac Solution.java
java Solution
```

Python:

```
python3 file.py
```

JavaScript:

```
node file.js
```

Go:

```
go run file.go
```

## Notes & Optimizations

* No need for extra space
* Greedy approach works best
* Always track max from left
* Works efficiently for large constraints

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
