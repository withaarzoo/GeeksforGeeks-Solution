import java.util.*;

class Solution {
    private static final String[] DIGIT_TO_CHARS = {
        "",    // 0
        "",    // 1
        "abc", // 2
        "def", // 3
        "ghi", // 4
        "jkl", // 5
        "mno", // 6
        "pqrs",// 7
        "tuv", // 8
        "wxyz" // 9
    };

    public ArrayList<String> possibleWords(int[] arr) {
        ArrayList<String> res = new ArrayList<>();
        if (arr == null || arr.length == 0) return res;
        backtrack(arr, 0, new StringBuilder(), res);
        return res;
    }

    private void backtrack(int[] arr, int idx, StringBuilder cur, ArrayList<String> res) {
        if (idx == arr.length) {
            if (cur.length() > 0) res.add(cur.toString());
            return;
        }
        int d = arr[idx];
        if (d < 0 || d > 9) return;
        String letters = DIGIT_TO_CHARS[d];
        if (letters.isEmpty()) {
            backtrack(arr, idx + 1, cur, res); // skip 0 and 1
            return;
        }
        for (int i = 0; i < letters.length(); i++) {
            cur.append(letters.charAt(i));
            backtrack(arr, idx + 1, cur, res);
            cur.deleteCharAt(cur.length() - 1);
        }
    }
}
