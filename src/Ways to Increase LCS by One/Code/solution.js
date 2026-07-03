class Solution {
  waysToIncreaseLCSBy1(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    // Prefix LCS DP
    const pref = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    // Build prefix table
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (s1[i - 1] === s2[j - 1]) pref[i][j] = pref[i - 1][j - 1] + 1;
        else pref[i][j] = Math.max(pref[i - 1][j], pref[i][j - 1]);
      }
    }

    const lcs = pref[n][m];

    // Suffix LCS DP
    const suff = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    // Build suffix table
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        if (s1[i] === s2[j]) suff[i][j] = suff[i + 1][j + 1] + 1;
        else suff[i][j] = Math.max(suff[i + 1][j], suff[i][j + 1]);
      }
    }

    let ans = 0;

    // Try every insertion position
    for (let pos = 0; pos <= n; pos++) {
      // Try every lowercase character
      for (let c = 0; c < 26; c++) {
        const ch = String.fromCharCode(97 + c);
        let ok = false;

        // Check every occurrence in s2
        for (let j = 0; j < m && !ok; j++) {
          if (s2[j] !== ch) continue;

          if (pref[pos][j] + 1 + suff[pos][j + 1] === lcs + 1) ok = true;
        }

        if (ok) ans++;
      }
    }

    return ans;
  }
}
