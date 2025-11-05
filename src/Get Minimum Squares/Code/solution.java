class Solution {
    private boolean isSquare(int x) {
        int r = (int) Math.sqrt(x);
        return r * r == x;
    }

    public int minSquares(int n) {
        // 1) Perfect square?
        if (isSquare(n))
            return 1;

        // 2) Sum of two squares?
        int limit = (int) Math.sqrt(n);
        for (int a = 1; a <= limit; a++) {
            if (isSquare(n - a * a))
                return 2;
        }

        // 3) Remove factors of 4, then check 7 (mod 8)
        int m = n;
        while (m % 4 == 0)
            m /= 4;
        if (m % 8 == 7)
            return 4;

        // 4) Otherwise 3
        return 3;
    }
}
