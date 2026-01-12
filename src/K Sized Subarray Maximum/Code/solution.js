class Solution {
    maxOfSubarrays(arr, k) {
        let dq = [];
        let result = [];

        for (let i = 0; i < arr.length; i++) {

            // Remove out-of-window index
            if (dq.length && dq[0] === i - k) {
                dq.shift();
            }

            // Remove smaller elements
            while (dq.length && arr[dq[dq.length - 1]] <= arr[i]) {
                dq.pop();
            }

            dq.push(i);

            if (i >= k - 1) {
                result.push(arr[dq[0]]);
            }
        }
        return result;
    }
}
