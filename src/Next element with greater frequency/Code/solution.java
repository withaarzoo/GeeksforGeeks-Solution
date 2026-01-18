class Solution {
    public ArrayList<Integer> nextFreqGreater(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> result = new ArrayList<>();
        for (int i = 0; i < n; i++)
            result.add(-1);

        // Step 1: Frequency map
        HashMap<Integer, Integer> freq = new HashMap<>();
        for (int x : arr) {
            freq.put(x, freq.getOrDefault(x, 0) + 1);
        }

        // Step 2: Stack for indices
        Stack<Integer> st = new Stack<>();

        // Step 3: Traverse array
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && freq.get(arr[i]) > freq.get(arr[st.peek()])) {
                result.set(st.pop(), arr[i]);
            }
            st.push(i);
        }

        return result;
    }
}
