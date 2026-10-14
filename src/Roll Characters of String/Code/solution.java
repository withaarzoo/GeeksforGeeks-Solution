class Solution {
    public String findRollOut(String s, int[] roll) {
        int n = s.length();
        int[] freq = new int[n + 1];
        for (int x : roll) freq[x]++;
        for (int i = n - 1; i >= 1; i--) freq[i] += freq[i + 1];
        char[] arr = s.toCharArray();
        for (int i = 0; i < n; i++) {
            int shift = freq[i + 1] % 26;
            arr[i] = (char)(((arr[i] - 'a' + shift) % 26) + 'a');
        }
        return new String(arr);
    }
}