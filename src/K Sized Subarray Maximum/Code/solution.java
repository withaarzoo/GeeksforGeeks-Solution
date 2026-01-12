class Solution {
    public ArrayList<Integer> maxOfSubarrays(int[] arr, int k) {
        Deque<Integer> dq = new ArrayDeque<>();
        ArrayList<Integer> result = new ArrayList<>();

        for (int i = 0; i < arr.length; i++) {

            // Remove out-of-window index
            if (!dq.isEmpty() && dq.peekFirst() == i - k) {
                dq.pollFirst();
            }

            // Remove smaller elements
            while (!dq.isEmpty() && arr[dq.peekLast()] <= arr[i]) {
                dq.pollLast();
            }

            dq.addLast(i);

            if (i >= k - 1) {
                result.add(arr[dq.peekFirst()]);
            }
        }
        return result;
    }
}
