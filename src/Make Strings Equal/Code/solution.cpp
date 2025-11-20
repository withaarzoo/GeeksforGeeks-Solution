#include <bits/stdc++.h>
using namespace std;

class Solution {
  public:
    int minCost(string &s, string &t, vector<vector<char>> &transform, vector<int> &cost) {
        const int ALPHA = 26;
        const int INF = 1e9;
        // dist[u][v] = minimum cost to transform char 'a'+u -> 'a'+v
        vector<vector<int>> dist(ALPHA, vector<int>(ALPHA, INF));
        for (int i = 0; i < ALPHA; ++i) dist[i][i] = 0;
        
        // add given direct transforms
        for (size_t i = 0; i < transform.size(); ++i) {
            char a = transform[i][0];
            char b = transform[i][1];
            int u = a - 'a';
            int v = b - 'a';
            dist[u][v] = min(dist[u][v], cost[i]);
        }
        
        // Floyd-Warshall to compute all-pairs shortest transformation costs
        for (int k = 0; k < ALPHA; ++k)
            for (int i = 0; i < ALPHA; ++i)
                if (dist[i][k] < INF)
                    for (int j = 0; j < ALPHA; ++j)
                        if (dist[k][j] < INF)
                            dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
        
        if (s.size() != t.size()) return -1; // safety check
        long long ans = 0;
        for (size_t i = 0; i < s.size(); ++i) {
            if (s[i] == t[i]) continue;
            int u = s[i] - 'a';
            int v = t[i] - 'a';
            int best = INF;
            // try all possible target characters
            for (int c = 0; c < ALPHA; ++c) {
                if (dist[u][c] < INF && dist[v][c] < INF) {
                    best = min(best, dist[u][c] + dist[v][c]);
                }
            }
            if (best == INF) return -1;
            ans += best;
            // if ans might overflow int, return accordingly (here we return int per signature)
            if (ans > INT_MAX) return -1; // or clamp/handle as needed
        }
        return (int)ans;
    }
};
