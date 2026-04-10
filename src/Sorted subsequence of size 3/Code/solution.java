class Solution {
    public ArrayList<Integer> find3Numbers(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> ans = new ArrayList<>();

        // If size is less than 3, answer is not possible
        if (n < 3)
            return ans;

        // rightMax[i] stores maximum value from i to end
        int[] rightMax = new int[n];
        rightMax[n - 1] = arr[n - 1];

        // Fill from right side
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.max(arr[i], rightMax[i + 1]);
        }

        // Smallest value seen so far from left
        int leftMin = arr[0];

        // Try every element as middle element
        for (int i = 1; i < n - 1; i++) {

            if (leftMin < arr[i] && arr[i] < rightMax[i + 1]) {
                ans.add(leftMin);
                ans.add(arr[i]);
                ans.add(rightMax[i + 1]);
                return ans;
            }

            leftMin = Math.min(leftMin, arr[i]);
        }

        return ans;
    }
}