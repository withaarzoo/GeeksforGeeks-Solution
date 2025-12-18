import java.util.*;

class Solution {
    public void sortIt(int[] arr) {
        List<Integer> odd = new ArrayList<>();
        List<Integer> even = new ArrayList<>();

        // Separate odd and even numbers
        for (int x : arr) {
            if (x % 2 != 0)
                odd.add(x);
            else
                even.add(x);
        }

        // Sort odd in descending order
        Collections.sort(odd, Collections.reverseOrder());

        // Sort even in ascending order
        Collections.sort(even);

        // Merge back into original array
        int idx = 0;
        for (int x : odd)
            arr[idx++] = x;
        for (int x : even)
            arr[idx++] = x;
    }
}
