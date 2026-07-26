class Solution {
    public ArrayList<ArrayList<Integer>> levelSort(int[] arr) {

        // Store the final answer
        ArrayList<ArrayList<Integer>> ans = new ArrayList<>();

        // Current index in the array
        int index = 0;

        // Number of nodes expected at the current level
        int levelSize = 1;

        // Process all elements
        while (index < arr.length) {

            // Store one level
            ArrayList<Integer> level = new ArrayList<>();

            // Take at most levelSize elements
            for (int i = 0; i < levelSize && index < arr.length; i++) {
                level.add(arr[index]);
                index++;
            }

            // Sort the current level
            Collections.sort(level);

            // Save it
            ans.add(level);

            // Double the size for the next level
            levelSize *= 2;
        }

        // Return the final answer
        return ans;
    }
}