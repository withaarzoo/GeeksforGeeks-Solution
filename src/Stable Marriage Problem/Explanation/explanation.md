# Stable Marriage Problem

## Table of Contents

* [Problem Summary](#problem-summary)
* [Constraints](#constraints)
* [Intuition](#intuition)
* [Approach](#approach)
* [Data Structures Used](#data-structures-used)
* [Operations & Behavior Summary](#operations--behavior-summary)
* [Complexity](#complexity)
* [Multi-language Solutions](#multi-language-solutions)

  * [C++](#c)
  * [Java](#java)
  * [JavaScript](#javascript)
  * [Python3](#python3)
* [Step-by-step Detailed Explanation](#step-by-step-detailed-explanation)
* [Examples](#examples)
* [How to use / Run locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

I am given two arrays:

* `men[i]` contains the preference list of the `i-th` man.
* `women[i]` contains the preference list of the `i-th` woman.

The goal is to create `n` stable pairs such that:

* Every man is matched with exactly one woman.
* Every woman is matched with exactly one man.
* There should not exist any pair `(man, woman)` who both prefer each other more than their current partners.

I need to return an array where:

```text
result[i] = woman matched with man i
```

---

## Constraints

```text
2 ≤ n ≤ 10^3
0 ≤ men[i][j] < n
0 ≤ women[i][j] < n
```

---

## Intuition

I thought about this problem as a proposal process.

Each man starts proposing to women based on his preference list.

* If a woman is free, she accepts.
* If she is already matched, she compares her current partner with the new man.
* If she likes the new man more, she changes her partner.
* Otherwise, she rejects the new man.

This is exactly the Gale-Shapley Stable Marriage Algorithm.

The best part is that this algorithm always guarantees a stable matching.

---

## Approach

1. Store the ranking of every man for each woman.
2. Keep all men initially free.
3. Let every free man propose to the next woman in his preference list.
4. If the woman is free, match them.
5. If she already has a partner:

   * Compare both men.
   * Keep the one she prefers more.
6. Continue until all men are matched.
7. Build the final result array.

---

## Data Structures Used

* `rank[n][n]`

  * Stores how much a woman prefers a man.
  * Lower rank means higher preference.

* `womanPartner[n]`

  * Stores the current partner of each woman.

* `result[n]`

  * Stores the woman matched with each man.

* `nextProposal[n]`

  * Stores the next woman index each man should propose to.

* Queue / List of free men

  * Helps process unmatched men.

---

## Operations & Behavior Summary

| Operation           | Description                            |
| ------------------- | -------------------------------------- |
| Build ranking table | Precompute women's preference order    |
| Track free men      | Keep unmatched men in queue/list       |
| Proposal            | A man proposes to next preferred woman |
| Accept proposal     | If woman is free                       |
| Replace partner     | If woman prefers new man               |
| Reject proposal     | If woman prefers current partner       |
| Final matching      | Continue until everyone is matched     |

---

## Complexity

* **Time Complexity:** `O(n^2)`

  * Every man can propose to every woman at most once.

* **Space Complexity:** `O(n^2)`

  * Because of the ranking matrix.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    vector<int> stableMarriage(vector<vector<int>> &men, vector<vector<int>> &women) {
        int n = men.size();

        vector<vector<int>> rank(n, vector<int>(n));

        for (int w = 0; w < n; w++) {
            for (int pos = 0; pos < n; pos++) {
                rank[w][women[w][pos]] = pos;
            }
        }

        vector<int> womanPartner(n, -1);
        vector<int> result(n, -1);
        vector<int> nextProposal(n, 0);

        queue<int> freeMen;

        for (int i = 0; i < n; i++) {
            freeMen.push(i);
        }

        while (!freeMen.empty()) {
            int man = freeMen.front();
            freeMen.pop();

            int woman = men[man][nextProposal[man]];
            nextProposal[man]++;

            if (womanPartner[woman] == -1) {
                womanPartner[woman] = man;
                result[man] = woman;
            } else {
                int currentMan = womanPartner[woman];

                if (rank[woman][man] < rank[woman][currentMan]) {
                    womanPartner[woman] = man;
                    result[man] = woman;

                    result[currentMan] = -1;
                    freeMen.push(currentMan);
                } else {
                    freeMen.push(man);
                }
            }
        }

        return result;
    }
};
```

### Java

```java
class Solution {
    public int[] stableMarriage(int[][] men, int[][] women) {
        int n = men.length;

        int[][] rank = new int[n][n];

        for (int w = 0; w < n; w++) {
            for (int pos = 0; pos < n; pos++) {
                rank[w][women[w][pos]] = pos;
            }
        }

        int[] womanPartner = new int[n];
        int[] result = new int[n];
        int[] nextProposal = new int[n];

        Arrays.fill(womanPartner, -1);
        Arrays.fill(result, -1);

        Queue<Integer> freeMen = new LinkedList<>();

        for (int i = 0; i < n; i++) {
            freeMen.offer(i);
        }

        while (!freeMen.isEmpty()) {
            int man = freeMen.poll();

            int woman = men[man][nextProposal[man]];
            nextProposal[man]++;

            if (womanPartner[woman] == -1) {
                womanPartner[woman] = man;
                result[man] = woman;
            } else {
                int currentMan = womanPartner[woman];

                if (rank[woman][man] < rank[woman][currentMan]) {
                    womanPartner[woman] = man;
                    result[man] = woman;

                    result[currentMan] = -1;
                    freeMen.offer(currentMan);
                } else {
                    freeMen.offer(man);
                }
            }
        }

        return result;
    }
}
```

### JavaScript

```javascript
class Solution {
    stableMarriage(men, women) {
        const n = men.length;

        const rank = Array.from({ length: n }, () => Array(n).fill(0));

        for (let w = 0; w < n; w++) {
            for (let pos = 0; pos < n; pos++) {
                rank[w][women[w][pos]] = pos;
            }
        }

        const womanPartner = Array(n).fill(-1);
        const result = Array(n).fill(-1);
        const nextProposal = Array(n).fill(0);

        const freeMen = [];

        for (let i = 0; i < n; i++) {
            freeMen.push(i);
        }

        while (freeMen.length > 0) {
            const man = freeMen.shift();

            const woman = men[man][nextProposal[man]];
            nextProposal[man]++;

            if (womanPartner[woman] === -1) {
                womanPartner[woman] = man;
                result[man] = woman;
            } else {
                const currentMan = womanPartner[woman];

                if (rank[woman][man] < rank[woman][currentMan]) {
                    womanPartner[woman] = man;
                    result[man] = woman;

                    result[currentMan] = -1;
                    freeMen.push(currentMan);
                } else {
                    freeMen.push(man);
                }
            }
        }

        return result;
    }
}
```

### Python3

```python
class Solution:
    def stableMarriage(self, men, women):
        n = len(men)

        rank = [[0] * n for _ in range(n)]

        for w in range(n):
            for pos in range(n):
                rank[w][women[w][pos]] = pos

        womanPartner = [-1] * n
        result = [-1] * n
        nextProposal = [0] * n

        freeMen = list(range(n))

        while freeMen:
            man = freeMen.pop(0)

            woman = men[man][nextProposal[man]]
            nextProposal[man] += 1

            if womanPartner[woman] == -1:
                womanPartner[woman] = man
                result[man] = woman
            else:
                currentMan = womanPartner[woman]

                if rank[woman][man] < rank[woman][currentMan]:
                    womanPartner[woman] = man
                    result[man] = woman

                    result[currentMan] = -1
                    freeMen.append(currentMan)
                else:
                    freeMen.append(man)

        return result
```

---

## Step-by-step Detailed Explanation

### C++

1. Build the `rank` matrix.
2. Store all men in a queue.
3. Pick a free man.
4. Let him propose to the next woman.
5. If she is free, match them.
6. If she already has a partner, compare preferences.
7. Replace the partner if needed.
8. Continue until all men are matched.

### Java

1. Create ranking matrix for women.
2. Use a queue to track free men.
3. Every free man proposes.
4. Women either accept, reject, or replace current partner.
5. Store the final matched pairs.

### JavaScript

1. Precompute women's ranking.
2. Track unmatched men.
3. Process proposals one by one.
4. Always keep the best partner for each woman.
5. Continue until no free man remains.

### Python3

1. Build ranking table.
2. Keep a list of free men.
3. Take one free man.
4. Propose to next preferred woman.
5. If rejected, try next woman later.
6. If accepted, update the matching.
7. Continue until everyone gets matched.

---

## Examples

### Example 1

```text
Input:
n = 2
men = [[0,1],[0,1]]
women = [[0,1],[0,1]]

Output:
[0,1]
```

Explanation:

* Man 0 gets Woman 0.
* Man 1 gets Woman 1.

### Example 2

```text
Input:
n = 3
men = [[0,1,2],[0,1,2],[0,1,2]]
women = [[2,1,0],[2,1,0],[2,1,0]]

Output:
[2,1,0]
```

Explanation:

* Man 0 gets Woman 2.
* Man 1 gets Woman 1.
* Man 2 gets Woman 0.

---

## How to use / Run locally

### C++

```bash
g++ solution.cpp -o solution
./solution
```

### Java

```bash
javac Solution.java
java Solution
```

### JavaScript

```bash
node solution.js
```

### Python3

```bash
python solution.py
```

---

## Notes & Optimizations

* Using a ranking matrix helps compare two men in `O(1)` time.
* Every proposal happens only once.
* The algorithm guarantees a stable matching.
* This is the optimal solution for the Stable Marriage Problem.
* The result is stable from the men's perspective because men are the ones proposing.

---

## Author

* [Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
