/*
class Node
{
    constructor(x){
        this.key=x;
        this.left=null;
        this.right=null;
    }
}
*/
/**
 * @param {Node} root
 * @return {number}
 */
class Solution {
    maxPathSum(root) {
        let res = -Infinity;
        const helper = (node) => {
            if (!node) return 0;
            if (!node.left && !node.right) return node.key;
            
            let left = helper(node.left);
            let right = helper(node.right);
            
            if (node.left && node.right) {
                res = Math.max(res, left + right + node.key);
                return Math.max(left, right) + node.key;
            }
            return (node.left ? left : right) + node.key;
        };
        helper(root);
        return res === -Infinity ? -1 : res;
    }
}