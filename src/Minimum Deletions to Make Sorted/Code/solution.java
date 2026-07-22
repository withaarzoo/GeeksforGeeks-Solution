class Solution {
    public int minDeletions(int[] arr) {

        // Stores the smallest possible ending values
        // of increasing subsequences.
        ArrayList<Integer> lis = new ArrayList<>();

        // Process every element.
        for (int num : arr) {

            // If the current number extends the sequence,
            // simply append it.
            if (lis.isEmpty() || num > lis.get(lis.size() - 1)) {
                lis.add(num);
            } else {

                // Binary search to find the first element
                // greater than or equal to the current number.
                int left = 0;
                int right = lis.size() - 1;

                while (left <= right) {
                    int mid = left + (right - left) / 2;

                    if (lis.get(mid) >= num)
                        right = mid - 1;
                    else
                        left = mid + 1;
                }

                // Replace that element.
                lis.set(left, num);
            }
        }

        // Remaining elements are the deletions.
        return arr.length - lis.size();
    }
}