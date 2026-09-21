/*
Structure of binary tree Node
class Node {
    constructor(data) {
        this.data = data;
        this.left = this.right = null;
    }
}
*/
/**
 * @param {Node} root1
 * @param {Node} root2
 * @return {boolean}
 */
class Solution {
    areAnagrams(root1, root2) {
        if (!root1 && !root2) return true;
        if (!root1 || !root2) return false;
        let q1 = [root1], q2 = [root2];
        while (q1.length && q2.length) {
            let sz1 = q1.length, sz2 = q2.length;
            if (sz1 !== sz2) return false;
            let a = [], b = [];
            for (let i = 0; i < sz1; i++) {
                let n1 = q1.shift();
                let n2 = q2.shift();
                a.push(n1.data);
                b.push(n2.data);
                if (n1.left) q1.push(n1.left);
                if (n1.right) q1.push(n1.right);
                if (n2.left) q2.push(n2.left);
                if (n2.right) q2.push(n2.right);
            }
            a.sort((x, y) => x - y);
            b.sort((x, y) => x - y);
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) return false;
            }
        }
        return q1.length === 0 && q2.length === 0;
    }
}