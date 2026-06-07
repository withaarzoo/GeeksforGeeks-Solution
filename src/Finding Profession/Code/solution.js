/**
 * @param {number} level
 * @param {number} pos
 * @return {string}
 */
class Solution {
    profession(level, pos) {

        // Convert position to zero-based indexing
        let x = pos - 1;

        // Count set bits
        let cnt = 0;
        while (x > 0) {
            cnt += (x & 1); // Add if current bit is set
            x >>= 1;        // Move to next bit
        }

        // Even flips => Engineer, Odd flips => Doctor
        return (cnt % 2 === 0) ? "Engineer" : "Doctor";
    }
};