/**
 * @param {String} s
 * @return {number}
 */

class Solution {
    maxIndexDifference(s) {

        // Store the farthest reachable ending index for each letter.
        const best = new Array(26).fill(-1);

        let ans = -1;

        // Traverse from right to left.
        for (let i = s.length - 1; i >= 0; i--) {

            // Character index.
            const c = s.charCodeAt(i) - 97;

            let reach;

            // 'z' cannot move further.
            if (c === 25) {
                reach = i;
            }
            // Reuse the already computed answer of the next character.
            else if (best[c + 1] !== -1) {
                reach = best[c + 1];
            }
            // No valid jump.
            else {
                reach = i;
            }

            // Update the best reachable ending index.
            best[c] = Math.max(best[c], reach);

            // Update answer for 'a'.
            if (c === 0) {
                ans = Math.max(ans, reach - i);
            }
        }

        return ans;
    }
}