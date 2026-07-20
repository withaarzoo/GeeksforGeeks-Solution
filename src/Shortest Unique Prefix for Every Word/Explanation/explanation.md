# Shortest Unique Prefix for Every Word

A clean and optimized Trie-based solution for the GeeksforGeeks problem **Shortest Unique Prefix for Every Word**. This repository explains the logic in a beginner-friendly way and includes solutions in multiple programming languages. The approach runs in linear time with respect to the total number of characters, making it an efficient solution for large inputs.

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

## Problem Summary

In this problem, we are given an array of distinct strings. For every word, we need to find the shortest prefix that uniquely identifies it among all the other words.

A prefix is considered unique if no other word shares the same prefix.

For example, if the words are `dog`, `duck`, and `dove`, then:

- `dog` is identified by `dog`
- `duck` is identified by `du`
- `dove` is identified by `dov`

The goal is to return the shortest unique prefix for every word while keeping the solution as efficient as possible.

This problem is a classic **Trie Data Structure** problem and is frequently asked in coding interviews and competitive programming contests.

## Constraints

| Constraint | Value |
|------------|-------|
| Number of words | 1 ≤ n |
| Length of each word | ≤ 1000 |
| No word is a prefix of another word | Guaranteed |

## Intuition

My first idea was to compare every word with every other word and find the point where they become different. Although this works, it quickly becomes too slow when the number of words grows.

Then I noticed that words sharing common prefixes naturally form a tree-like structure. That is exactly what a Trie is designed for.

If every Trie node stores how many words pass through it, then while reading a word again, the first node whose count becomes one immediately tells me that the current prefix is unique.

This avoids unnecessary comparisons and makes the solution much faster.

## Approach

I solve the problem in two passes.

First, I insert every word into a Trie.

While inserting:

1. Move one character at a time.
2. Create a new node if needed.
3. Increase the frequency of every visited node.

After all words have been inserted, every node knows how many words share that prefix.

Next, I process every word again.

1. Start from the Trie root.
2. Keep adding characters to the current prefix.
3. Stop as soon as the current node has a frequency of one.
4. Store that prefix as the answer.

Since every character is processed only twice, the solution stays very efficient.

## Data Structures Used

### Trie

The Trie stores every word character by character.

It allows common prefixes to share the same path, making prefix-related operations extremely efficient.

### Trie Node

Each node stores:

- An array of child pointers or references
- A frequency counter showing how many words share that prefix

### Result Array

Stores the final shortest unique prefix for every word.

## Operations & Behavior Summary

The algorithm works in the following order:

1. Create an empty Trie.
2. Insert every word into the Trie.
3. Update the frequency of every visited node.
4. Traverse every word again.
5. Build its prefix character by character.
6. Stop when the node frequency becomes one.
7. Save the collected prefix.
8. Return the final list of prefixes.

## Complexity

| Operation | Complexity | Explanation |
|----------|------------|-------------|
| Time Complexity | O(n × k) | `n` is the number of words and `k` is the average length of each word. Every character is visited once during insertion and once during searching. |
| Space Complexity | O(n × k) | The Trie stores all characters from all words in the worst case. |

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // Trie node
    struct TrieNode {
        TrieNode* child[26];
        int freq;
        
        // Constructor
        TrieNode() {
            freq = 0;
            
            // Initially no children exist
            for(int i = 0; i < 26; i++)
                child[i] = NULL;
        }
    };
    
    vector<string> findPrefixes(vector<string>& arr) {
        
        // Create root of Trie
        TrieNode* root = new TrieNode();
        
        // Insert every word into Trie
        for(string &word : arr) {
            
            TrieNode* node = root;
            
            for(char ch : word) {
                
                int idx = ch - 'a';
                
                // Create new node if needed
                if(node->child[idx] == NULL)
                    node->child[idx] = new TrieNode();
                
                // Move to next node
                node = node->child[idx];
                
                // Increase number of words passing through this prefix
                node->freq++;
            }
        }
        
        vector<string> ans;
        
        // Find shortest unique prefix for every word
        for(string &word : arr) {
            
            TrieNode* node = root;
            string prefix = "";
            
            for(char ch : word) {
                
                int idx = ch - 'a';
                
                // Move to next node
                node = node->child[idx];
                
                // Add current character to prefix
                prefix += ch;
                
                // Frequency 1 means this prefix is unique
                if(node->freq == 1)
                    break;
            }
            
            ans.push_back(prefix);
        }
        
        return ans;
    }
};
```

### Java

```java
class Solution {

    // Trie node
    class TrieNode {
        TrieNode[] child = new TrieNode[26];
        int freq = 0;
    }

    public ArrayList<String> findPrefixes(ArrayList<String> arr) {

        // Create Trie root
        TrieNode root = new TrieNode();

        // Insert all words
        for (String word : arr) {

            TrieNode node = root;

            for (char ch : word.toCharArray()) {

                int idx = ch - 'a';

                // Create node if it does not exist
                if (node.child[idx] == null)
                    node.child[idx] = new TrieNode();

                // Move to next node
                node = node.child[idx];

                // Increase prefix frequency
                node.freq++;
            }
        }

        ArrayList<String> ans = new ArrayList<>();

        // Find unique prefix for every word
        for (String word : arr) {

            TrieNode node = root;
            StringBuilder prefix = new StringBuilder();

            for (char ch : word.toCharArray()) {

                int idx = ch - 'a';

                // Move forward
                node = node.child[idx];

                // Add character to answer
                prefix.append(ch);

                // Stop once prefix becomes unique
                if (node.freq == 1)
                    break;
            }

            ans.add(prefix.toString());
        }

        return ans;
    }
}
```

### JavaScript

```javascript
class TrieNode {
    constructor() {
        // Store children
        this.child = new Array(26).fill(null);

        // Number of words sharing this prefix
        this.freq = 0;
    }
}

class Solution {
    findPrefixes(arr) {

        // Create Trie root
        let root = new TrieNode();

        // Insert every word
        for (let word of arr) {

            let node = root;

            for (let ch of word) {

                let idx = ch.charCodeAt(0) - 97;

                // Create node if needed
                if (node.child[idx] === null)
                    node.child[idx] = new TrieNode();

                // Move forward
                node = node.child[idx];

                // Increase prefix frequency
                node.freq++;
            }
        }

        let ans = [];

        // Find shortest unique prefix
        for (let word of arr) {

            let node = root;
            let prefix = "";

            for (let ch of word) {

                let idx = ch.charCodeAt(0) - 97;

                // Move to next node
                node = node.child[idx];

                // Add character
                prefix += ch;

                // Prefix is now unique
                if (node.freq === 1)
                    break;
            }

            ans.push(prefix);
        }

        return ans;
    }
}
```

### Python3

```python
class TrieNode:
    def __init__(self):
        # Store children of current node
        self.child = [None] * 26

        # Number of words sharing this prefix
        self.freq = 0


class Solution:
    def findPrefixes(self, arr):

        # Create Trie root
        root = TrieNode()

        # Insert every word into Trie
        for word in arr:

            node = root

            for ch in word:

                idx = ord(ch) - ord('a')

                # Create node if it does not exist
                if node.child[idx] is None:
                    node.child[idx] = TrieNode()

                # Move to child node
                node = node.child[idx]

                # Increase prefix frequency
                node.freq += 1

        ans = []

        # Find shortest unique prefix for every word
        for word in arr:

            node = root
            prefix = ""

            for ch in word:

                idx = ord(ch) - ord('a')

                # Move forward
                node = node.child[idx]

                # Add current character
                prefix += ch

                # Stop once prefix becomes unique
                if node.freq == 1:
                    break

            ans.append(prefix)

        return ans
```

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The overall logic is exactly the same in every language.

The implementation only differs because of language syntax.

First, a Trie node is created. Every node stores its children and a frequency counter.

During insertion, each character is processed one by one. Whenever a child node does not exist, a new node is created. After moving to that node, its frequency is increased because another word now shares that prefix.

Once all words are inserted, the Trie contains complete information about every shared prefix.

Next, every word is processed again.

Starting from the root, characters are added one at a time.

After moving to the corresponding node, its frequency is checked.

If the frequency is greater than one, it means multiple words still share that prefix, so the traversal continues.

When the frequency becomes exactly one, the current prefix belongs to only one word.

At that point, there is no need to continue because the shortest unique prefix has already been found.

Finally, the prefix is added to the answer list.

Since every language follows the same sequence of operations, the output remains identical across C++, Java, JavaScript, and Python.

## Examples

### Example 1

**Input**

```text
["zebra", "dog", "duck", "dove"]
```

**Output**

```text
["z", "dog", "du", "dov"]
```

**Trace**

- `zebra` becomes unique at `z`
- `dog` shares `d` and `do`, so `dog` is needed
- `duck` becomes unique at `du`
- `dove` becomes unique at `dov`

---

### Example 2

**Input**

```text
["geeksgeeks", "geeksquiz", "geeksforgeeks"]
```

**Output**

```text
["geeksg", "geeksq", "geeksf"]
```

**Trace**

All three words share the prefix `geeks`.

The first different character determines the shortest unique prefix for each word.

---

### Example 3

**Input**

```text
["apple", "apply", "apt"]
```

**Output**

```text
["apple", "apply", "apt"]
```

**Trace**

- `apple` and `apply` share almost the entire word.
- `apt` becomes unique after `apt`.
- The remaining two become unique only after their final different character.

## How to Use / Run Locally

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project directory.

```bash
cd <repository-folder>
```

### C++

Compile:

```bash
g++ solution.cpp -o solution
```

Run:

```bash
./solution
```

### Java

Compile:

```bash
javac Solution.java
```

Run:

```bash
java Solution
```

### JavaScript

Run using Node.js:

```bash
node solution.js
```

### Python3

Run:

```bash
python solution.py
```

## Notes & Optimizations

- A Trie is the best choice for this problem because it is designed for prefix operations.
- Comparing every pair of words would result in a much slower solution.
- Storing the frequency inside every Trie node removes the need for additional comparisons.
- The solution visits every character only twice, making it suitable for large inputs.
- The problem guarantees that no word is a prefix of another word, which ensures that every word will eventually reach a unique Trie node.
- Another possible approach is sorting the words and comparing only neighboring strings, but the Trie solution is more natural for prefix-related problems and matches the expected optimal complexity.

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
