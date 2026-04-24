class Solution {
    public int visibleBuildings(int arr[]) {
        int n = arr.length;
        
        int count = 1;              // First building always visible
        int maxHeight = arr[0];
        
        for(int i = 1; i < n; i++) {
            if(arr[i] >= maxHeight) {
                count++;
                maxHeight = arr[i];
            }
        }
        
        return count;
    }
}