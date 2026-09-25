# Box Stacking Problem Solution using Dynamic Programming

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

You are given three arrays that describe a set of boxes. Each box has a height, a width, and a length. Your job is to build the tallest possible stack of these boxes.

A few important rules apply. You can rotate any box so that any of its three sides becomes the height. You may also use multiple copies of the same box type. The only restriction is that you can place one box on top of another only when both sides of its base are strictly smaller than the corresponding sides of the box below it.

The function you need to write should return the maximum total height you can achieve under these rules. This is a classic dynamic programming problem often seen on platforms like GeeksforGeeks and is a variation of the longest increasing subsequence idea applied to three-dimensional boxes.

## Constraints

- 1 ≤ number of boxes (n) ≤ 100
- 1 ≤ height[i], width[i], length[i] ≤ 10⁶

## Intuition

The first thing I noticed is that rotation is allowed, so every box actually gives us three different ways to stand it up. Because we can reuse the same box type, those three orientations can appear together in one stack as long as their bases keep getting smaller.

Once all possible orientations exist, the problem starts looking a lot like finding the longest increasing subsequence, except instead of counting how many boxes we use we add up their heights. Sorting the orientations by base size first makes the comparison order clean and turns the rest of the work into a straightforward dynamic programming pass.

## Approach

I generate three rotations for every original box. For each rotation I force the longer base side to come first so comparisons stay consistent.

I put all these rotated boxes into one list and sort them so larger bases appear before smaller ones.

Then I create a DP array. For every rotated box i, dp[i] stores the tallest stack I can build when that box sits at the bottom. At the start, dp[i] is simply the height of box i itself.

I walk through the list. For each box i I look at every earlier box j. If both base sides of j are strictly larger than those of i, I can place i on top of the best stack that ends with j. I update dp[i] with the better of its current value and (dp[j] + height of i).

The largest value left in the DP array is the answer.

## Data Structures Used

- A list (or vector / array) of triples that stores every rotated box. Each triple holds the two base dimensions and the height.
- A one-dimensional DP array that records the maximum stack height achievable with each rotated box at the bottom.
- The built-in sort function of the language to order the boxes by decreasing base size.

These structures keep the code simple and give us the O(n²) solution that is fast enough under the given constraints.

## Operations & Behavior Summary

1. Create three orientations for every original box and store them.
2. Sort the entire collection so that larger bases come first.
3. Initialize a DP entry for each orientation with its own height.
4. For every orientation, examine all previous orientations and try to stack the current one on top of them when the base condition holds.
5. Keep track of the global maximum height found during the process.
6. Return that maximum height.

## Complexity

| Complexity       | Value   | Explanation |
|------------------|---------|-------------|
| Time Complexity  | O(n²)   | Generating rotations is O(n). Sorting is O(n log n). The nested loops over the 3n orientations cost O((3n)²) which is still O(n²). |
| Space Complexity | O(n)    | We store 3n rotated boxes and a DP array of the same size. Both are linear in the original number of boxes. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    int maxHeight(vector<int> &height, vector<int> &width, vector<int> &length) {
        int n = height.size();
        vector<vector<int>> boxes;
        for (int i = 0; i < n; i++) {
            int a = height[i], b = width[i], c = length[i];
            boxes.push_back({max(b, c), min(b, c), a});
            boxes.push_back({max(a, c), min(a, c), b});
            boxes.push_back({max(a, b), min(a, b), c});
        }
        sort(boxes.begin(), boxes.end(), [](const vector<int>& x, const vector<int>& y) {
            if (x[0] != y[0]) return x[0] > y[0];
            return x[1] > y[1];
        });
        int m = boxes.size();
        vector<int> dp(m);
        int ans = 0;
        for (int i = 0; i < m; i++) {
            dp[i] = boxes[i][2];
            for (int j = 0; j < i; j++) {
                if (boxes[j][0] > boxes[i][0] && boxes[j][1] > boxes[i][1]) {
                    dp[i] = max(dp[i], dp[j] + boxes[i][2]);
                }
            }
            ans = max(ans, dp[i]);
        }
        return ans;
    }
};
```

### Java
```java
class Solution {
    public int maxHeight(int[] height, int[] width, int[] length) {
        int n = height.length;
        int[][] boxes = new int[3 * n][3];
        int idx = 0;
        for (int i = 0; i < n; i++) {
            int a = height[i], b = width[i], c = length[i];
            boxes[idx++] = new int[]{Math.max(b, c), Math.min(b, c), a};
            boxes[idx++] = new int[]{Math.max(a, c), Math.min(a, c), b};
            boxes[idx++] = new int[]{Math.max(a, b), Math.min(a, b), c};
        }
        Arrays.sort(boxes, (x, y) -> {
            if (x[0] != y[0]) return Integer.compare(y[0], x[0]);
            return Integer.compare(y[1], x[1]);
        });
        int m = boxes.length;
        int[] dp = new int[m];
        int ans = 0;
        for (int i = 0; i < m; i++) {
            dp[i] = boxes[i][2];
            for (int j = 0; j < i; j++) {
                if (boxes[j][0] > boxes[i][0] && boxes[j][1] > boxes[i][1]) {
                    dp[i] = Math.max(dp[i], dp[j] + boxes[i][2]);
                }
            }
            ans = Math.max(ans, dp[i]);
        }
        return ans;
    }
}
```

### JavaScript
```javascript
/**
 * @param {number[]} height
 * @param {number[]} width
 * @param {number[]} length
 * @returns {number}
 */

class Solution {
    maxHeight(height, width, length) {
        const n = height.length;
        const boxes = [];
        for (let i = 0; i < n; i++) {
            const a = height[i], b = width[i], c = length[i];
            boxes.push([Math.max(b, c), Math.min(b, c), a]);
            boxes.push([Math.max(a, c), Math.min(a, c), b]);
            boxes.push([Math.max(a, b), Math.min(a, b), c]);
        }
        boxes.sort((x, y) => {
            if (x[0] !== y[0]) return y[0] - x[0];
            return y[1] - x[1];
        });
        const m = boxes.length;
        const dp = new Array(m);
        let ans = 0;
        for (let i = 0; i < m; i++) {
            dp[i] = boxes[i][2];
            for (let j = 0; j < i; j++) {
                if (boxes[j][0] > boxes[i][0] && boxes[j][1] > boxes[i][1]) {
                    dp[i] = Math.max(dp[i], dp[j] + boxes[i][2]);
                }
            }
            ans = Math.max(ans, dp[i]);
        }
        return ans;
    }
}
```

### Python3
```python
class Solution:
    def maxHeight(self, height: list[int], width: list[int], length: list[int]) -> int:
        n = len(height)
        boxes = []
        for i in range(n):
            a, b, c = height[i], width[i], length[i]
            boxes.append([max(b, c), min(b, c), a])
            boxes.append([max(a, c), min(a, c), b])
            boxes.append([max(a, b), min(a, b), c])
        boxes.sort(key=lambda x: (-x[0], -x[1]))
        m = len(boxes)
        dp = [0] * m
        ans = 0
        for i in range(m):
            dp[i] = boxes[i][2]
            for j in range(i):
                if boxes[j][0] > boxes[i][0] and boxes[j][1] > boxes[i][1]:
                    dp[i] = max(dp[i], dp[j] + boxes[i][2])
            ans = max(ans, dp[i])
        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall logic is identical in all four languages; only the syntax changes.

First we build the list of rotations. For a box with sides a, b and c we produce three triples:
- base (max(b,c), min(b,c)) with height a
- base (max(a,c), min(a,c)) with height b
- base (max(a,b), min(a,b)) with height c

This guarantees that the first base dimension is never smaller than the second, which makes later comparisons cleaner.

Next we sort the list. The comparison prefers a larger first base dimension; when those are equal it prefers a larger second dimension. After sorting, any box that could legally sit under another box will appear earlier in the list.

We allocate a DP array of the same length and set every entry to the height of its corresponding box. That covers the single-box stacks.

Then the nested loops begin. The outer loop picks the box we want to place at the bottom of a new stack. The inner loop tries every earlier box as a possible support. The strict-smaller check on both base sides decides whether stacking is legal. If it is, we take the maximum of the current DP value and the height obtained by stacking on that support.

While filling the DP table we also maintain a running maximum. That maximum becomes the final answer.

Edge cases are handled naturally. When n is 1 the answer is simply the tallest orientation of that single box. When no two boxes can be stacked the answer is the maximum single height among all orientations. Because we force the longer base side first, we never generate duplicate orientations that would waste time.

## Examples

**Example 1**

Input:  
height = [4, 1, 4, 10]  
width  = [6, 2, 5, 12]  
length = [7, 3, 6, 32]

Output: 60

One valid stack (bottom to top) uses the orientations  
(12,32,10) → (10,12,32) → (6,7,4) → (5,6,4) → (4,5,6) → (2,3,1) → (1,2,3).  
Their heights sum to 60. No taller combination exists.

**Example 2**

Input:  
height = [1, 4, 3]  
width  = [2, 5, 4]  
length = [3, 6, 1]

Output: 15

A possible stack is  
(5,6,4) → (4,5,6) → (3,4,1) → (2,3,1) → (1,2,3).  
Heights add up to 15.

**Example 3**

Input:  
height = [1]  
width  = [1]  
length = [1]

Output: 1

Only one box exists, so the tallest stack is just that box itself.

## How to Use / Run Locally

**C++**  
Save the code in a file named `box_stacking.cpp`.  
Compile with:  
`g++ -std=c++17 box_stacking.cpp -o box_stacking`  
Run with:  
`./box_stacking`

**Java**  
Save the code in a file named `Solution.java`.  
Compile with:  
`javac Solution.java`  
Run with:  
`java Solution`

**JavaScript**  
Save the code in a file named `boxStacking.js`.  
Run with Node.js:  
`node boxStacking.js`

**Python3**  
Save the code in a file named `box_stacking.py`.  
Run with:  
`python3 box_stacking.py`

In each case replace the driver code with the input you want to test, or wrap the solution function inside a main that reads from standard input if you prefer.

## Notes & Optimizations

Because n is at most 100, the O(n²) solution is more than fast enough. Generating only three rotations instead of six already removes redundant work.

An alternative would be to generate all six orientations and still sort by both base dimensions; the extra factor of two does not change the asymptotic complexity but wastes a little memory and time.

If the problem ever forbade reusing the same box type, we would need an extra bookkeeping structure to mark which original boxes have already been used. The current version allows unlimited copies, so that extra logic is unnecessary.

When two boxes have identical bases they can never be stacked on each other because the comparison is strict. The DP correctly leaves those boxes as independent single-box stacks.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)