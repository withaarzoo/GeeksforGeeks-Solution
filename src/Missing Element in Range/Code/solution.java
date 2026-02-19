import java.util.ArrayList;
import java.util.HashSet;

class Solution {
    public ArrayList<Integer> missingRange(int[] arr, int low, int high) {
        ArrayList<Integer> result = new ArrayList<>();
        HashSet<Integer> present = new HashSet<>();

        // Store only those elements within [low, high]
        for (int x : arr) {
            if (x >= low && x <= high)
                present.add(x);
        }

        // Check every number in the range and add missing ones
        for (int v = low; v <= high; ++v) {
            if (!present.contains(v))
                result.add(v);
        }
        return result;
    }
}
