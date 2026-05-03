class Solution {
    void sortBySetBitCount(int[] arr) {
        // I create 32 buckets so each possible set-bit count has its own place.
        ArrayList<Integer>[] buckets = new ArrayList[32];
        for (int i = 0; i < 32; i++) {
            buckets[i] = new ArrayList<>();
        }

        // I push each number into the bucket that matches its set-bit count.
        // Appending in order keeps the sort stable for equal counts.
        for (int num : arr) {
            buckets[Integer.bitCount(num)].add(num);
        }

        // I write the values back from the highest bucket to the lowest bucket.
        // This directly updates the original array in the required order.
        int idx = 0;
        for (int bits = 31; bits >= 0; bits--) {
            for (int num : buckets[bits]) {
                arr[idx++] = num;
            }
        }
    }
}