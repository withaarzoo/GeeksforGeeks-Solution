/**
 * @param {number[]} s1
 * @param {number[]} s2
 * @param {number[]} s3
 * @returns {number}
 */

class Solution {
    maxEqualSum(s1, s2, s3) {
        let sum1 = 0, sum2 = 0, sum3 = 0;
        for (let x of s1) sum1 += x;
        for (let x of s2) sum2 += x;
        for (let x of s3) sum3 += x;
        let i = 0, j = 0, k = 0;
        let n1 = s1.length, n2 = s2.length, n3 = s3.length;
        while (true) {
            if (sum1 === sum2 && sum2 === sum3) return sum1;
            if (sum1 >= sum2 && sum1 >= sum3) {
                if (i === n1) return 0;
                sum1 -= s1[i++];
            } else if (sum2 >= sum1 && sum2 >= sum3) {
                if (j === n2) return 0;
                sum2 -= s2[j++];
            } else {
                if (k === n3) return 0;
                sum3 -= s3[k++];
            }
        }
    }
}