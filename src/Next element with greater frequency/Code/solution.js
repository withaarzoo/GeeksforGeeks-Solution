class Solution {
    nextFreqGreater(arr) {
        const n = arr.length;
        const result = Array(n).fill(-1);

        // Step 1: Frequency map
        const freq = {};
        for (const x of arr) {
            freq[x] = (freq[x] || 0) + 1;
        }

        // Step 2: Stack for indices
        const stack = [];

        // Step 3: Traverse array
        for (let i = 0; i < n; i++) {
            while (
                stack.length &&
                freq[arr[i]] > freq[arr[stack[stack.length - 1]]]
            ) {
                result[stack.pop()] = arr[i];
            }
            stack.push(i);
        }

        return result;
    }
}
