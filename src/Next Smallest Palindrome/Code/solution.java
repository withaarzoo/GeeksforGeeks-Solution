class Solution {
    static int[] nextPalindrome(int[] num) {
        int n = num.length;

        // Case 1: If all digits are 9, answer is 100...001
        boolean allNine = true;
        for (int x : num) {
            if (x != 9) {
                allNine = false;
                break;
            }
        }
        if (allNine) {
            int[] ans = new int[n + 1];
            ans[0] = 1;
            ans[n] = 1;
            return ans;
        }

        // Step 1: Check whether left side is smaller than right side
        int i = (n - 1) / 2;
        int j = n / 2;

        while (i >= 0 && num[i] == num[j]) {
            i--;
            j++;
        }

        boolean leftSmaller = (i < 0 || num[i] < num[j]);

        // Step 2: Mirror left half to right half
        i = (n - 1) / 2;
        j = n / 2;
        while (i >= 0) {
            num[j] = num[i];
            i--;
            j++;
        }

        // Step 3: If left side was smaller, add 1 to the middle and handle carry
        if (leftSmaller) {
            int carry = 1;
            i = (n - 1) / 2;
            j = n / 2;

            while (i >= 0 && carry > 0) {
                int val = num[i] + carry;
                num[i] = val % 10;
                carry = val / 10;
                num[j] = num[i];
                i--;
                j++;
            }
        }

        return num;
    }
}