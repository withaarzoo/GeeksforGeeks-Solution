class Solution {
    atMostK(s, k) {
        if (k < 0) return 0;

        const freq = new Array(26).fill(0);
        let left = 0, distinct = 0, count = 0;

        for (let right = 0; right < s.length; right++) {
            const r = s.charCodeAt(right) - 97;
            if (freq[r] === 0) distinct++;
            freq[r]++;

            while (distinct > k) {
                const l = s.charCodeAt(left) - 97;
                freq[l]--;
                if (freq[l] === 0) distinct--;
                left++;
            }

            count += (right - left + 1);
        }

        return count;
    }

    countSubstr(s, k) {
        return this.atMostK(s, k) - this.atMostK(s, k - 1);
    }
}
