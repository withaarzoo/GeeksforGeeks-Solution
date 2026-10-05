# Your Social Network - GeeksforGeeks DSA Solution

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

Geek is building a social networking site called Geeksbook. There are n users numbered from 1 to n. Every user i (from 2 to n) has exactly one friend, and that friend always has a smaller user number. User 1 has no friend.

The friends of users 2 to n are given in an array arr of size n-1:
- arr[0] is the friend of user 2
- arr[1] is the friend of user 3
- and so on

The friendship is one-way. From any user you can keep following the friend links to reach other users with smaller numbers.

For every user i from 2 to n, find all users j (1 ≤ j < i) that can be reached from i. For each reachable pair create a triple [i, j, k] where:
- i is the starting user
- j is the reachable user
- k is the number of links you must follow to go from i to j

Return all such triples in a specific order:
1. Process users i from 2 to n
2. For each i, list the reachable j values in increasing order
3. Only include a triple if j is actually reachable from i

This is a classic graph traversal problem on a special kind of tree (or collection of paths) that appears often in competitive programming and DSA practice.

## Constraints

- 2 ≤ arr.size() ≤ 500
- 1 ≤ arr[i] ≤ 500
- Expected Time Complexity: O(n²)
- Expected Auxiliary Space: O(n²)

## Intuition

The first thing that stood out is that every user points to exactly one person with a smaller number. That means there are no cycles. From any user you can simply walk upward by following the single friend link and you will eventually reach user 1.

So the people reachable from i are exactly the people you meet while walking up that unique path. Because n is at most a few hundred, walking the path for every starting user is perfectly fine under the given time limits. The only extra care needed is to list the reachable users in increasing order of their numbers, not in the order you meet them on the path.

## Approach

I start by building a simple parent array. parent[i] stores the single friend of user i. parent[1] is set to a special value that means “no parent”.

Then I loop over every possible starting user i from 2 to n. For each i I begin at that user and keep following parent links, counting the number of steps. Every time I land on a new user I record that user together with the current distance.

After the walk finishes I sort the collected pairs by user number so they appear in increasing order. Finally I push the finished triples [i, j, k] into the answer list.

This produces exactly the 2-D list the problem asks for and stays comfortably inside the O(n²) limit.

## Data Structures Used

- Parent array (size n+1): stores the single outgoing friend link for every user. Chosen because the graph is extremely simple — each node has out-degree 1.
- Temporary list of pairs: holds the reachable users and their distances while walking the path from one starting user. Sorted later so the final output order is correct.
- Result list of triples: stores every [i, j, k] that must be returned.

No adjacency lists or queues are needed because we never need to explore children; we only ever walk upward.

## Operations & Behavior Summary

1. Compute total users n = length of arr + 1.
2. Create parent array and fill parent[i] = arr[i-2] for every i ≥ 2.
3. For each starting user i from 2 to n:
   - Walk from i toward user 1 by repeatedly following parent links.
   - Record every user met and the distance so far.
   - Sort those recorded users by their numbers.
   - Append the sorted triples to the final answer.
4. Return the complete list of triples.

## Complexity

| Aspect            | Complexity | Explanation |
|-------------------|------------|-------------|
| Time Complexity   | O(n²)      | For each of the n users we may walk a path of length up to n and then sort O(n) ancestors. Overall quadratic, which matches the expected complexity. |
| Space Complexity  | O(n²)      | The answer itself can contain up to O(n²) triples. Temporary parent array and path lists use only linear extra space. |

## Multi-language Solutions

### C++
```cpp
class Solution {
  public:
    vector<vector<int>> socialNetwork(vector<int>& arr) {
        int n = arr.size() + 1;
        vector<int> parent(n + 1, -1);
        for (int i = 2; i <= n; i++) {
            parent[i] = arr[i - 2];
        }
        vector<vector<int>> res;
        for (int i = 2; i <= n; i++) {
            vector<pair<int, int>> reaches;
            int curr = i;
            int dist = 0;
            while (parent[curr] != -1) {
                curr = parent[curr];
                dist++;
                reaches.push_back({curr, dist});
            }
            sort(reaches.begin(), reaches.end());
            for (auto &p : reaches) {
                res.push_back({i, p.first, p.second});
            }
        }
        return res;
    }
};
```

### Java
```java
class Solution {
    public ArrayList<ArrayList<Integer>> socialNetwork(int[] arr) {
        int n = arr.length + 1;
        int[] parent = new int[n + 1];
        Arrays.fill(parent, -1);
        for (int i = 2; i <= n; i++) {
            parent[i] = arr[i - 2];
        }
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        for (int i = 2; i <= n; i++) {
            ArrayList<int[]> reaches = new ArrayList<>();
            int curr = i;
            int dist = 0;
            while (parent[curr] != -1) {
                curr = parent[curr];
                dist++;
                reaches.add(new int[]{curr, dist});
            }
            reaches.sort((a, b) -> Integer.compare(a[0], b[0]));
            for (int[] p : reaches) {
                ArrayList<Integer> triple = new ArrayList<>();
                triple.add(i);
                triple.add(p[0]);
                triple.add(p[1]);
                res.add(triple);
            }
        }
        return res;
    }
}
```

### JavaScript
```javascript
class Solution {
    socialNetwork(arr) {
        let n = arr.length + 1;
        let parent = new Array(n + 1).fill(-1);
        for (let i = 2; i <= n; i++) {
            parent[i] = arr[i - 2];
        }
        let res = [];
        for (let i = 2; i <= n; i++) {
            let reaches = [];
            let curr = i;
            let dist = 0;
            while (parent[curr] !== -1) {
                curr = parent[curr];
                dist++;
                reaches.push([curr, dist]);
            }
            reaches.sort((a, b) => a[0] - b[0]);
            for (let p of reaches) {
                res.push([i, p[0], p[1]]);
            }
        }
        return res;
    }
}
```

### Python3
```python
class Solution:
    def socialNetwork(self, arr):
        n = len(arr) + 1
        parent = [-1] * (n + 1)
        for i in range(2, n + 1):
            parent[i] = arr[i - 2]
        res = []
        for i in range(2, n + 1):
            reaches = []
            curr = i
            dist = 0
            while parent[curr] != -1:
                curr = parent[curr]
                dist += 1
                reaches.append((curr, dist))
            reaches.sort()
            for j, k in reaches:
                res.append([i, j, k])
        return res
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic is identical across all four languages; only the syntax changes.

First I calculate n. The given array only stores friends for users 2 through n, so the real number of users is one larger than the array length.

I allocate a parent array of size n+1 and initialize every entry to a sentinel value that means “no parent”. Then I fill parent[i] = arr[i-2] for i from 2 to n. After this step, following parent links is trivial.

The outer loop runs over every possible starting user i. Inside that loop I create a temporary collection that will hold pairs (reachable user, distance). I set a current pointer to i and a distance counter to zero.

While the current user still has a parent, I move the pointer to that parent and increase the distance. Each time I land on a new user I store the pair. Because every parent number is strictly smaller, the walk is guaranteed to terminate at user 1 and never enter a cycle.

After the walk finishes, the temporary collection contains every reachable ancestor, but in decreasing order. I therefore sort it by the user number so the later output will have increasing j values.

Finally I walk through the sorted pairs and push the finished triples [i, j, k] into the main result list.

When the outer loop ends, the result already contains every required triple in the exact order demanded by the problem, so I simply return it.

Edge cases are handled naturally: user 2 always reaches only user 1 with distance 1; a user whose parent is already 1 produces a single triple; the longest possible path is still O(n) and stays inside the time limit.

## Examples

**Example 1**  
Input: arr = [1, 2]  
Users: 1 ← 2 ← 3  
Output: [[2, 1, 1], [3, 1, 2], [3, 2, 1]]  

Trace:  
- From 2: walk to 1 (distance 1) → [2, 1, 1]  
- From 3: walk to 2 (distance 1), then to 1 (distance 2). After sorting by j we get [3, 1, 2] then [3, 2, 1].

**Example 2**  
Input: arr = [1, 1]  
Users: 1 ← 2 and 1 ← 3  
Output: [[2, 1, 1], [3, 1, 1]]  

Trace:  
- From 2: walk to 1 (distance 1)  
- From 3: walk to 1 (distance 1)

**Example 3**  
Input: arr = [1, 2, 1]  
Users: 1 ← 2 ← 3 and 1 ← 4  
Output: [[2, 1, 1], [3, 1, 2], [3, 2, 1], [4, 1, 1]]  

Trace follows the same upward walks and sorting rule.

## How to Use / Run Locally

**C++**  
1. Copy the C++ code into a file named `main.cpp`.  
2. Compile: `g++ -std=c++17 main.cpp -o social`  
3. Run: `./social`  
4. Feed the input according to the problem’s input format (or hard-code a test case inside main).

**Java**  
1. Save the code as `Solution.java`.  
2. Compile: `javac Solution.java`  
3. Run: `java Solution`  
4. Provide input through standard input or test harness.

**JavaScript**  
1. Save the code as `solution.js`.  
2. Run with Node: `node solution.js`  
3. You can call the method directly from a small test script.

**Python3**  
1. Save the code as `solution.py`.  
2. Run: `python3 solution.py`  
3. Instantly test by calling the method with sample arrays.

All four versions expect the same input format described on GeeksforGeeks and return a 2-D list of triples.

## Notes & Optimizations

- Because every node has out-degree 1 and edges always go to smaller numbers, the graph is a collection of paths leading to user 1. This is why a simple parent walk is enough; no BFS or DFS from children is required.
- Sorting the ancestors of each starting user is necessary to satisfy the “increasing j” requirement. If the problem had accepted any order, the sort could be skipped and the solution would become pure O(n²) without the log factor.
- For n ≤ 500 the quadratic solution is optimal under the stated constraints. Building an explicit adjacency list of children and then computing depths would also work but adds unnecessary code and memory.
- Watch the indexing carefully: arr[0] belongs to user 2, arr[1] belongs to user 3, etc. Off-by-one errors here are the most common source of wrong answers.

## Author
[Md Aarzoo Islam](https://www.instagram.com/codewithaarzoo.in/)