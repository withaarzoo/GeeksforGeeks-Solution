class Solution {

    private static void backtrack(int[] arr, boolean[] used,
            ArrayList<Integer> curr,
            ArrayList<ArrayList<Integer>> result) {

        if (curr.size() == arr.length) {
            result.add(new ArrayList<>(curr));
            return;
        }

        for (int i = 0; i < arr.length; i++) {
            if (used[i])
                continue;

            used[i] = true;
            curr.add(arr[i]);

            backtrack(arr, used, curr, result);

            // Backtrack
            curr.remove(curr.size() - 1);
            used[i] = false;
        }
    }

    public static ArrayList<ArrayList<Integer>> permuteDist(int[] arr) {
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        boolean[] used = new boolean[arr.length];

        backtrack(arr, used, new ArrayList<>(), result);
        return result;
    }
}
