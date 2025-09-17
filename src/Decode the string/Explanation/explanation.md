# Decode the String (GeeksforGeeks)

## Problem Statement  

Given an encoded string `s`, decode it by expanding the pattern `k[substring]`, where the substring inside brackets is written `k` times.  
Return the final decoded string.  

- `k` is guaranteed to be a positive integer.  
- Encoded string contains only lowercase English alphabets.  
- The test cases are generated so that the length of the output string will never exceed **10⁵**.  

### Examples

**Input:**  
`s = "3[b2[ca]]"`  
**Output:**  
`"bcacabcacabcaca"`  

**Input:**  
`s = "3[ab]"`  
**Output:**  
`"ababab"`  

---

## Intuition  

When I first saw this problem, I thought:  
“Okay, this looks like those nested brackets puzzles.”  

The trick is that whenever I see something like `3[ab]`, it means `"ab"` repeated 3 times → `"ababab"`.  
But the real challenge is **nested encoding** like `3[b2[ca]]`. That means I have to decode from the **innermost brackets first** and move outward.  

So I realized — I can use a **stack**. Stacks are perfect for these kinds of “last-in, first-out” problems because I need to handle inner substrings before outer ones.  

---

## Approach  

1. Use two stacks:  
   - **countStack** → stores numbers (like `3`, `2`).  
   - **stringStack** → stores the decoded part before encountering `[`.

2. Keep two helpers:  
   - **currStr** → builds the current substring.  
   - **currNum** → holds the repeat count for the substring.  

3. Iterate character by character:  
   - If it’s a **digit** → build the full number (handles multiple-digit cases).  
   - If it’s `[` → push the current number and string into stacks, reset them.  
   - If it’s `]` → pop from both stacks, repeat the substring, and join with the previous part.  
   - If it’s a **letter** → just add it to the current string.  

4. At the end, `currStr` contains the decoded result.  

---

## Complexity  

- **Time Complexity:** `O(n)`  
  We scan each character once. Repeating strings is efficient because the final length is capped at 10⁵.  

- **Space Complexity:** `O(n)`  
  We use stacks proportional to input size (worst case fully nested).  

---

## Code (JavaScript)

```js
/**
 * @param {string} s
 * @return {string}
 */
class Solution {
    decodedString(s) {
        let countStack = [];   // stack to store repetition counts
        let stringStack = [];  // stack to store strings before '['
        let currStr = "";      // current building string
        let currNum = 0;       // current number (multiplier)

        for (let char of s) {
            if (!isNaN(char)) {
                // If char is a digit, build the full number
                currNum = currNum * 10 + parseInt(char);
            } else if (char === "[") {
                // Push current state to stacks
                countStack.push(currNum);
                stringStack.push(currStr);
                // Reset for new substring
                currNum = 0;
                currStr = "";
            } else if (char === "]") {
                // Pop from stacks and build the repeated string
                let repeatTimes = countStack.pop();
                let prevStr = stringStack.pop();
                currStr = prevStr + currStr.repeat(repeatTimes);
            } else {
                // If it's a normal character, just add to current string
                currStr += char;
            }
        }

        return currStr;
    }
}
````

---

## Step-by-Step Detailed Explanation

1. **Initialize Stacks**

   ```js
   let countStack = [];
   let stringStack = [];
   let currStr = "";
   let currNum = 0;
   ```

   - `countStack` stores repeat numbers.
   - `stringStack` stores strings before brackets.
   - `currStr` builds the active substring.
   - `currNum` stores the multiplier.

2. **Traverse Each Character**

   - If it’s a digit, accumulate it into `currNum`.
   - If it’s `"["`, push `currNum` and `currStr` into stacks, then reset.
   - If it’s `"]"`, pop from stacks, repeat substring, and merge.
   - If it’s a letter, add it directly to `currStr`.

3. **Final Result**
   After the loop ends, `currStr` contains the decoded full string.

---

## Example Walkthrough

### Input: `3[b2[ca]]`

- Read `3` → `currNum = 3`.
- See `[` → push `(3, "")`.
- Read `b` → `currStr = "b"`.
- Read `2` → `currNum = 2`.
- See `[` → push `(2, "b")`.
- Read `"ca"` → `currStr = "ca"`.
- See `]` → pop `(2, "b")`. New string = `"b" + "ca".repeat(2)` = `"bcaca"`.
- See `]` → pop `(3, "")`. New string = `"" + "bcaca".repeat(3)` = `"bcacabcacabcaca"`.

✅ Final Answer: `"bcacabcacabcaca"`

---

### Input: `3[ab]`

- Read `3` → `currNum = 3`.
- See `[` → push `(3, "")`.
- Read `"ab"` → `currStr = "ab"`.
- See `]` → pop `(3, "")`. New string = `"" + "ab".repeat(3)` = `"ababab"`.

✅ Final Answer: `"ababab"`
