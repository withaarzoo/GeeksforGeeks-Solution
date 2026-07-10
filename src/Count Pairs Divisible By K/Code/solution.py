class Solution:
    def countKdivPairs(self, arr, k):
        # freq[r] stores how many previous numbers have remainder r
        freq = [0] * k

        # answer stores the total number of valid pairs found
        answer = 0

        # I process each number once from left to right
        for num in arr:
            # I only need the remainder of the current number
            remainder = num % k

            # This remainder is needed to make the sum divisible by k
            needed = (k - remainder) % k

            # Every previous number with this remainder forms a valid pair
            answer += freq[needed]

            # I store the current remainder for numbers processed later
            freq[remainder] += 1

        # I return the total number of valid pairs
        return answer