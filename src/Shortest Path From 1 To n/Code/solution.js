/**
 * @param {number} n
 * @return {number}
 */
class Solution {
    minimumStep(n) {
        let steps = 0;
        while (n > 1) {
            if (n % 3 === 0)
                n = Math.floor(n / 3);
            else
                n--;
            steps++;
        }
        return steps;
    }
}