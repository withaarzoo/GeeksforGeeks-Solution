class Solution
{
private:
    bool isSquare(int x)
    {
        int r = (int)std::sqrt(x);
        return r * r == x;
    }

public:
    int minSquares(int n)
    {
        // 1) If n itself is a perfect square -> 1
        if (isSquare(n))
            return 1;

        // 2) If n = a^2 + b^2 -> 2
        for (int a = 1; a * a <= n; ++a)
        {
            if (isSquare(n - a * a))
                return 2;
        }

        // 3) Reduce n by removing factors of 4
        int m = n;
        while (m % 4 == 0)
            m /= 4;
        // If m ≡ 7 (mod 8) -> needs 4 squares
        if (m % 8 == 7)
            return 4;

        // 4) Otherwise -> 3
        return 3;
    }
};
