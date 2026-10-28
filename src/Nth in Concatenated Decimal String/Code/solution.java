class Solution {
    public char nthCharacter(int n) {
        long digits = 1;
        long count = 9;
        long start = 1;
        
        while (n > digits * count) {
            n -= digits * count;
            digits++;
            count *= 10;
            start *= 10;
        }
        
        long num = start + (n - 1) / digits;
        String s = Long.toString(num);
        return s.charAt((int)((n - 1) % digits));
    }
}