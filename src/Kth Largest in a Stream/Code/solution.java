class Solution {
    static ArrayList<Integer> kthLargest(int[] arr, int k) {
        // PriorityQueue in Java is a min-heap by default
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        ArrayList<Integer> result = new ArrayList<>();

        for (int num : arr) {
            minHeap.offer(num); // insert current element into the heap

            // trim the heap if it exceeds size k
            // we only want the k largest, so smallest must go
            if (minHeap.size() > k) {
                minHeap.poll();
            }

            // not enough elements yet to determine kth largest
            if (minHeap.size() < k) {
                result.add(-1);
            } else {
                // heap top is the smallest of the k largest = kth largest
                result.add(minHeap.peek());
            }
        }

        return result;
    }
}