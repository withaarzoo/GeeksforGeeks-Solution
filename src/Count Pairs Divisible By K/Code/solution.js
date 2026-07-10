class Solution {
    countKdivPairs(arr, k) {
        // freq[r] stores how many previous numbers have remainder r
        const freq = new Array(k).fill(0);

        // answer stores the total number of valid pairs found
        let answer = 0;

        // I process each number once from left to right
        for (const num of arr) {
            // I only need the remainder of the current number
            const remainder = num % k;

            // This remainder is needed to make the sum divisible by k
            const needed = (k - remainder) % k;

            // Every previous number with this remainder forms a valid pair
            answer += freq[needed];

            // I store the current remainder for numbers processed later
            freq[remainder]++;
        }

        // I return the total number of valid pairs
        return answer;
    }
}