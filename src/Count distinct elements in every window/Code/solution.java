class Solution {
    ArrayList<Integer> countDistinct(int arr[], int k) {
        HashMap<Integer, Integer> freq = new HashMap<>();
        ArrayList<Integer> result = new ArrayList<>();

        // First window
        for (int i = 0; i < k; i++) {
            freq.put(arr[i], freq.getOrDefault(arr[i], 0) + 1);
        }

        result.add(freq.size());

        // Sliding window
        for (int i = k; i < arr.length; i++) {
            // Remove old element
            freq.put(arr[i - k], freq.get(arr[i - k]) - 1);
            if (freq.get(arr[i - k]) == 0) {
                freq.remove(arr[i - k]);
            }

            // Add new element
            freq.put(arr[i], freq.getOrDefault(arr[i], 0) + 1);

            result.add(freq.size());
        }

        return result;
    }
}
