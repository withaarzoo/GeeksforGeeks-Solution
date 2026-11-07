/**
 * @param {string[]} arr
 * @returns {string[]}
 */
class Solution {
    generateUsernames(arr) {
        const reserved = new Set(arr);
        const assigned = new Set();
        const res = [];
        for (const name of arr) {
            if (!assigned.has(name)) {
                assigned.add(name);
                res.push(name);
            } else {
                let k = 1;
                while (true) {
                    const cand = name + k;
                    if (!assigned.has(cand) && !reserved.has(cand)) {
                        assigned.add(cand);
                        res.push(cand);
                        break;
                    }
                    k++;
                }
            }
        }
        return res;
    }
}