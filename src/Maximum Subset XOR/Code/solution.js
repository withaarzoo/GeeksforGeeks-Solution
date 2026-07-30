class Solution {
    maxSubsetXOR(arr) {

        const n = arr.length;

        // Position for storing the next basis element
        let index = 0;

        // Process bits from highest to lowest
        for (let bit = 31; bit >= 0; bit--) {

            let maxIndex = -1;

            // Find an element containing the current bit
            for (let i = index; i < n; i++) {
                if ((arr[i] & (1 << bit)) !== 0) {
                    maxIndex = i;
                    break;
                }
            }

            // Skip if no element has this bit
            if (maxIndex === -1)
                continue;

            // Swap the selected element into the basis position
            [arr[index], arr[maxIndex]] = [arr[maxIndex], arr[index]];

            // Eliminate the current bit from all other elements
            for (let i = 0; i < n; i++) {
                if (i !== index && ((arr[i] & (1 << bit)) !== 0)) {
                    arr[i] ^= arr[index];
                }
            }

            index++;
        }

        // Greedily build the largest XOR
        let ans = 0;

        for (let i = 0; i < index; i++) {
            ans = Math.max(ans, ans ^ arr[i]);
        }

        return ans;
    }
}