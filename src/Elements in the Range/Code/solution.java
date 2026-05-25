class Solution {
    public boolean checkElements(int start, int end, int[] arr) {
        
        // HashSet is used for fast searching
        HashSet<Integer> set = new HashSet<>();
        
        // Insert all array elements into the set
        for(int num : arr) {
            set.add(num);
        }
        
        // Check every number in the range
        for(int i = start; i <= end; i++) {
            
            // If number is missing, return false
            if(!set.contains(i)) {
                return false;
            }
        }
        
        // All numbers are present
        return true;
    }
}