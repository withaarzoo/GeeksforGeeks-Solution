/**
 * @param {number[]} files
 * @return {number}
 */
class Solution {
    minComputation(files) {
        const pq = new MinPriorityQueue();
        for (const f of files) pq.enqueue(f);
        let cost = 0;
        while (pq.size() > 1) {
            const a = pq.dequeue().element;
            const b = pq.dequeue().element;
            const sum = a + b;
            cost += sum;
            pq.enqueue(sum);
        }
        return cost;
    }
}