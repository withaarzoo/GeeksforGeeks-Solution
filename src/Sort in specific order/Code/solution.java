class Solution {
    public void sortIt(int[] arr) {
        Integer[] temp = new Integer[arr.length];
        for (int i = 0; i < arr.length; i++) temp[i] = arr[i];
        Arrays.sort(temp, (a, b) -> {
            boolean aOdd = a % 2 != 0;
            boolean bOdd = b % 2 != 0;
            if (aOdd && bOdd) return b - a;
            if (!aOdd && !bOdd) return a - b;
            return aOdd ? -1 : 1;
        });
        for (int i = 0; i < arr.length; i++) arr[i] = temp[i];
    }
}