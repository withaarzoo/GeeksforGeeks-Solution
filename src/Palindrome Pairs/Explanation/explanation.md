# Palindrome Pairs

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
* [Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)](#step-by-step-detailed-explanation-c-java-javascript-python3)
* [Examples](#examples)
* [How to Use / Run Locally](#how-to-use--run-locally)
* [Notes & Optimizations](#notes--optimizations)
* [Author](#author)

---

## Problem Summary

The Palindrome Pairs problem asks whether there exists any pair of different indices `(i, j)` such that:

```text
arr[i] + arr[j]
```

forms a palindrome.

A palindrome is a string that reads the same forward and backward.

We are given an array of strings, and the goal is to efficiently determine whether at least one valid palindrome pair exists.

This is a popular string algorithm and hash map based DSA problem often asked in coding interviews and competitive programming contests.

### Input

* An array of strings

### Output

* Return `true` if any palindrome pair exists
* Otherwise return `false`

---

## Constraints

| Constraint            | Value                      |
| --------------------- | -------------------------- |
| Number of strings     | `1 <= n <= 2 * 10^4`       |
| Length of each string | `1 <= arr[i].length <= 10` |

---

## Intuition

My first instinct was to try every possible pair of strings and check whether their concatenation forms a palindrome.

That works, but it becomes slow when the number of strings grows large.

Then I noticed something important.

If part of a word is already a palindrome, then I only need to find the reverse of the remaining part somewhere else in the array.

That observation changes the problem from brute force string matching into a much faster hash map lookup problem.

Instead of checking every pair directly, I can:

* split each word into two parts
* check whether one part is palindrome
* search for the reverse of the other part

This makes the solution efficient and scalable for larger inputs.

---

## Approach

I used a hash map to store every string and its index for fast lookup.

Then for every word in the array:

1. Try every possible split position
2. Divide the word into:

   * left part
   * right part
3. Check two conditions

### Case 1

If the left part is palindrome:

* reverse the right part
* search for it inside the hash map
* if found, a palindrome pair exists

### Case 2

If the right part is palindrome:

* reverse the left part
* search for it inside the hash map
* if found, a palindrome pair exists

If any valid pair is found, return `true`.

Otherwise return `false` after checking all strings.

This approach is commonly used in optimized palindrome pair solutions and interview-level string problems.

---

## Data Structures Used

| Data Structure        | Why It Was Used                        |
| --------------------- | -------------------------------------- |
| Hash Map / Dictionary | Fast lookup for reversed strings       |
| Strings / Substrings  | Used for splitting and reversing words |

The hash map is the most important part of the solution because it reduces lookup time from linear search to nearly constant time.

---

## Operations & Behavior Summary

The algorithm works in these stages:

1. Store all words inside a hash map
2. Traverse each word one by one
3. Try every possible split position
4. Separate the word into left and right parts
5. Check whether the left side is palindrome
6. If yes, search for reverse of the right side
7. Check whether the right side is palindrome
8. If yes, search for reverse of the left side
9. Return `true` immediately if a valid pair is found
10. Return `false` if no pair exists

This creates an optimized palindrome detection approach using hashing and string manipulation.

---

## Complexity

| Type             | Complexity   |
| ---------------- | ------------ |
| Time Complexity  | `O(n * k^2)` |
| Space Complexity | `O(n * k)`   |

### Explanation

* `n` = number of strings
* `k` = maximum string length

For every word, all split positions are checked, and palindrome validation may take up to `O(k)` time.

Extra space is used for the hash map storing all strings.

---

## Multi-language Solutions

### C++

```cpp
class Solution {
  public:
    
    // Function to check whether a string is palindrome
    bool isPalindrome(string &s, int left, int right) {
        
        // Compare characters from both ends
        while(left < right) {
            
            // If mismatch found, not palindrome
            if(s[left] != s[right]) {
                return false;
            }
            
            left++;
            right--;
        }
        
        return true;
    }
    
    bool palindromePair(vector<string>& arr) {
        
        // Store every string with its index
        unordered_map<string, int> mp;
        
        for(int i = 0; i < arr.size(); i++) {
            mp[arr[i]] = i;
        }
        
        // Traverse every word
        for(int i = 0; i < arr.size(); i++) {
            
            string word = arr[i];
            int n = word.length();
            
            // Try every possible split
            for(int j = 0; j <= n; j++) {
                
                // Left and right parts
                string left = word.substr(0, j);
                string right = word.substr(j);
                
                // CASE 1:
                // If left part is palindrome
                if(isPalindrome(word, 0, j - 1)) {
                    
                    // Reverse the right part
                    string revRight = right;
                    reverse(revRight.begin(), revRight.end());
                    
                    // Check if reversed right exists
                    if(mp.count(revRight) && mp[revRight] != i) {
                        return true;
                    }
                }
                
                // CASE 2:
                // Avoid duplicate checking when right is empty
                if(j != n && isPalindrome(word, j, n - 1)) {
                    
                    // Reverse the left part
                    string revLeft = left;
                    reverse(revLeft.begin(), revLeft.end());
                    
                    // Check if reversed left exists
                    if(mp.count(revLeft) && mp[revLeft] != i) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
};
```

### Java

```java
class Solution {
    
    // Function to check palindrome
    private boolean isPalindrome(String s, int left, int right) {
        
        // Compare both ends
        while(left < right) {
            
            // Mismatch means not palindrome
            if(s.charAt(left) != s.charAt(right)) {
                return false;
            }
            
            left++;
            right--;
        }
        
        return true;
    }
    
    public boolean palindromePair(String[] arr) {
        
        // Store strings with index
        HashMap<String, Integer> map = new HashMap<>();
        
        for(int i = 0; i < arr.length; i++) {
            map.put(arr[i], i);
        }
        
        // Traverse all words
        for(int i = 0; i < arr.length; i++) {
            
            String word = arr[i];
            int n = word.length();
            
            // Try every split position
            for(int j = 0; j <= n; j++) {
                
                String left = word.substring(0, j);
                String right = word.substring(j);
                
                // CASE 1
                if(isPalindrome(word, 0, j - 1)) {
                    
                    // Reverse right part
                    String revRight = new StringBuilder(right).reverse().toString();
                    
                    // Check existence
                    if(map.containsKey(revRight) && map.get(revRight) != i) {
                        return true;
                    }
                }
                
                // CASE 2
                if(j != n && isPalindrome(word, j, n - 1)) {
                    
                    // Reverse left part
                    String revLeft = new StringBuilder(left).reverse().toString();
                    
                    // Check existence
                    if(map.containsKey(revLeft) && map.get(revLeft) != i) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
}
```

### JavaScript

```javascript
class Solution {
    
    // Function to check palindrome
    isPalindrome(str, left, right) {
        
        // Compare both ends
        while(left < right) {
            
            // Mismatch means not palindrome
            if(str[left] !== str[right]) {
                return false;
            }
            
            left++;
            right--;
        }
        
        return true;
    }
    
    palindromePair(arr) {
        
        // Store all strings with index
        let mp = new Map();
        
        for(let i = 0; i < arr.length; i++) {
            mp.set(arr[i], i);
        }
        
        // Traverse every word
        for(let i = 0; i < arr.length; i++) {
            
            let word = arr[i];
            let n = word.length;
            
            // Try all split positions
            for(let j = 0; j <= n; j++) {
                
                let left = word.substring(0, j);
                let right = word.substring(j);
                
                // CASE 1
                if(this.isPalindrome(word, 0, j - 1)) {
                    
                    // Reverse right part
                    let revRight = right.split("").reverse().join("");
                    
                    // Check existence
                    if(mp.has(revRight) && mp.get(revRight) !== i) {
                        return true;
                    }
                }
                
                // CASE 2
                if(j !== n && this.isPalindrome(word, j, n - 1)) {
                    
                    // Reverse left part
                    let revLeft = left.split("").reverse().join("");
                    
                    // Check existence
                    if(mp.has(revLeft) && mp.get(revLeft) !== i) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
}
```

### Python3

```python
class Solution:
    
    # Function to check palindrome
    def isPalindrome(self, s, left, right):
        
        # Compare both ends
        while left < right:
            
            # Mismatch means not palindrome
            if s[left] != s[right]:
                return False
            
            left += 1
            right -= 1
        
        return True
    
    def palindromePair(self, arr):
        
        # Store all strings with index
        mp = {}
        
        for i, word in enumerate(arr):
            mp[word] = i
        
        # Traverse every word
        for i, word in enumerate(arr):
            
            n = len(word)
            
            # Try every split position
            for j in range(n + 1):
                
                # Left and right parts
                left = word[:j]
                right = word[j:]
                
                # CASE 1
                # If left part is palindrome
                if self.isPalindrome(word, 0, j - 1):
                    
                    # Reverse right part
                    revRight = right[::-1]
                    
                    # Check if it exists
                    if revRight in mp and mp[revRight] != i:
                        return True
                
                # CASE 2
                # Avoid duplicate checking
                if j != n and self.isPalindrome(word, j, n - 1):
                    
                    # Reverse left part
                    revLeft = left[::-1]
                    
                    # Check if it exists
                    if revLeft in mp and mp[revLeft] != i:
                        return True
        
        return False
```

---

## Step-by-step Detailed Explanation (C++, Java, JavaScript, Python3)

The logic stays almost identical across all languages.

The only difference is syntax and how strings or hash maps are handled internally.

### Step 1 — Store all strings in a hash map

The first thing the algorithm does is create a hash map.

The map stores:

* key = string
* value = index

This allows fast searching for reversed words later.

Without a hash map, every lookup would require scanning the entire array again, making the solution much slower.

---

### Step 2 — Traverse every word

Now the algorithm processes each string one by one.

For every word:

* get its length
* try all possible split positions

For example:

```text
word = "abcd"
```

Possible splits:

```text
"" | "abcd"
"a" | "bcd"
"ab" | "cd"
"abc" | "d"
"abcd" | ""
```

Every split gives two separate parts to analyze.

---

### Step 3 — Check if left side is palindrome

If the left side is already palindrome, then only the reverse of the right side is needed.

Example:

```text
left = "aa"
right = "xyz"
```

Since `"aa"` is palindrome:

```text
reverse("xyz") = "zyx"
```

If `"zyx"` exists in the array:

```text
"zyx" + "aaxyz"
```

becomes palindrome.

So the algorithm searches for the reversed right substring.

---

### Step 4 — Check if right side is palindrome

The same logic is applied in reverse.

If the right side is palindrome:

* reverse the left side
* search for it

Example:

```text
left = "abc"
right = "aa"
```

Since `"aa"` is palindrome:

```text
reverse("abc") = "cba"
```

If `"cba"` exists:

```text
"abc" + "cba"
```

forms palindrome.

---

### Step 5 — Avoid matching the same index

The problem clearly says:

```text
i != j
```

So even if the reversed string exists, the algorithm checks whether it belongs to a different index.

This avoids invalid self-pairing.

---

### Step 6 — Return result immediately

The moment a valid palindrome pair is found:

* return `true`

There is no need to continue searching.

If the loop finishes completely:

* return `false`

That means no palindrome pair exists in the given string array.

---

## Examples

### Example 1

### Input

```text
["geekf", "geeks", "or", "keeg", "abc", "bc"]
```

### Output

```text
true
```

### Explanation

```text
"geekf" + "keeg"
= "geekfkeeg"
```

This forms a palindrome pair.

---

### Example 2

### Input

```text
["abc", "xyxcba", "geekst", "or", "bc"]
```

### Output

```text
true
```

### Explanation

```text
"abc" + "xyxcba"
= "abcxyxcba"
```

This string becomes palindrome.

---

### Example 3

### Input

```text
["aa"]
```

### Output

```text
false
```

### Explanation

Only one string exists, so no pair of different indices can be formed.

---

## How to Use / Run Locally

### C++

Compile:

```bash
g++ filename.cpp -o output
```

Run:

```bash
./output
```

---

### Java

Compile:

```bash
javac Main.java
```

Run:

```bash
java Main
```

---

### JavaScript

Run using Node.js:

```bash
node filename.js
```

---

### Python3

Run:

```bash
python filename.py
```

---

### C #

Compile:

```bash
csc Program.cs
```

Run:

```bash
Program.exe
```

---

## Notes & Optimizations

* Using brute force pair checking would take much longer for large inputs.
* Hash maps make reversed string lookup extremely fast.
* Splitting every word at every index is the key optimization.
* The solution works efficiently because string length is small.
* Avoid duplicate checks when the right substring becomes empty.
* This is a common interview problem related to:

  * string algorithms
  * palindrome checking
  * hashing
  * substring handling
  * optimized lookup problems

An alternative approach could use Trie data structures, but the hash map solution is simpler and easier to implement during coding interviews.

---

## Author

[Md Aarzoo Islam](https://www.instagram.com/code.with.aarzoo/)
