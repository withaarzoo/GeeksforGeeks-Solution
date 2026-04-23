class Solution {
    public boolean canSplit(int arr[]) {
        long total = 0;

        // Step 1: Calculate total sum
        for (int x : arr)
            total += x;

        // Step 2: Check odd
        if (total % 2 != 0)
            return false;

        long target = total / 2;
        long curr = 0;

        // Step 3: Traverse
        for (int i = 0; i < arr.length; i++) {
            curr += arr[i];

            if (curr == target)
                return true;
        }

        return false;
    }
}