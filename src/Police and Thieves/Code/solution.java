class Solution {
    public int catchThieves(char[] arr, int k) {
        ArrayList<Integer> police = new ArrayList<>();
        ArrayList<Integer> thieves = new ArrayList<>();

        // Store positions
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == 'P')
                police.add(i);
            else
                thieves.add(i);
        }

        int i = 0, j = 0, count = 0;

        // Two pointer approach
        while (i < police.size() && j < thieves.size()) {
            if (Math.abs(police.get(i) - thieves.get(j)) <= k) {
                count++;
                i++;
                j++;
            } else if (thieves.get(j) < police.get(i)) {
                j++;
            } else {
                i++;
            }
        }

        return count;
    }
}
