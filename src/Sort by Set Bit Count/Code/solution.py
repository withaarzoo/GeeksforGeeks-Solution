class Solution:
    def sortBySetBitCount(self, arr):
        # I create 32 buckets so each possible set-bit count has a separate list.
        buckets = [[] for _ in range(32)]

        # I count set bits using the common trick of clearing the lowest set bit each time.
        # Appending in order keeps equal-bit elements in their original order.
        for num in arr:
            count = 0
            x = num
            while x:
                x &= x - 1
                count += 1
            buckets[count].append(num)

        # I write the values back from the highest count bucket to the lowest.
        idx = 0
        for bits in range(31, -1, -1):
            for num in buckets[bits]:
                arr[idx] = num
                idx += 1