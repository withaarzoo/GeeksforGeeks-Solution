class Solution {
    public int countKdivPairs(int[] arr, int k) {
        // freq[r] stores how many previous numbers have remainder r
        int[] freq = new int[k];

        // answer stores the total number of valid pairs found
        int answer = 0;

        // I process each number once from left to right
        for (int num : arr) {
            // I only need the remainder of the current number
            int remainder = num % k;

            // This remainder is needed to make the sum divisible by k
            int needed = (k - remainder) % k;

            // Every previous number with this remainder forms a valid pair
            answer += freq[needed];

            // I store the current remainder for numbers processed later
            freq[remainder]++;
        }

        // I return the total number of valid pairs
        return answer;
    }
}