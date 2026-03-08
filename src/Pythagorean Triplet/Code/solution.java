class Solution {
    boolean pythagoreanTriplet(int[] arr) {

        int maxVal = 0;

        // Find maximum value
        for (int num : arr)
            maxVal = Math.max(maxVal, num);

        boolean[] present = new boolean[maxVal + 1];

        for (int num : arr)
            present[num] = true;

        // Try every pair (a, b)
        for (int a = 1; a <= maxVal; a++) {

            if (!present[a])
                continue;

            for (int b = a; b <= maxVal; b++) {

                if (!present[b])
                    continue;

                int cSquare = a * a + b * b;

                int c = (int) Math.sqrt(cSquare);

                if (c <= maxVal && c * c == cSquare && present[c])
                    return true;
            }
        }

        return false;
    }
}