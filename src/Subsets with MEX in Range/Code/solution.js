/**
 * @param {number[]} arr
 * @param {number} l
 * @param {number} r
 * @returns {number}
 */
class Solution {
    modpow(base, exp, mod) {
        let res = 1n;
        base %= mod;
        while (exp > 0n) {
            if (exp & 1n) res = res * base % mod;
            base = base * base % mod;
            exp >>= 1n;
        }
        return res;
    }
    cntSubsets(arr, l, r) {
        const MOD = 1000000007n;
        const n = arr.length;
        const freq = new Array(n + 1).fill(0);
        for (const x of arr) if (x <= n) freq[x]++;
        const p2 = new Array(n + 1);
        p2[0] = 1n;
        for (let i = 1; i <= n; i++) p2[i] = p2[i - 1] * 2n % MOD;
        let ans = 0n, cur_prod = 1n, cum = 0n;
        for (let k = 0; k <= r; k++) {
            if (k > 0) {
                if (freq[k - 1] === 0) cur_prod = 0n;
                else cur_prod = cur_prod * (p2[freq[k - 1]] - 1n + MOD) % MOD;
            }
            cum += BigInt(freq[k]);
            if (cur_prod !== 0n) {
                const free = p2[n] * this.modpow(p2[Number(cum)], MOD - 2n, MOD) % MOD;
                const ways = cur_prod * free % MOD;
                if (k >= l) ans = (ans + ways) % MOD;
            }
        }
        return Number(ans);
    }
}