class Solution {
    public static ArrayList<Integer> findUnion(int[] a, int[] b) {
        
        // HashSet automatically stores only unique elements
        HashSet<Integer> set = new HashSet<>();
        
        // Insert elements from array a
        for(int num : a) {
            set.add(num);
        }
        
        // Insert elements from array b
        for(int num : b) {
            set.add(num);
        }
        
        // Convert set to ArrayList
        return new ArrayList<>(set);
    }
}