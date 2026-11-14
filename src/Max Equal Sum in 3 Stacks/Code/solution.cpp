class Solution {
  public:
    int maxEqualSum(vector<int> &s1, vector<int> &s2, vector<int> &s3) {
        long long sum1 = 0, sum2 = 0, sum3 = 0;
        for (int x : s1) sum1 += x;
        for (int x : s2) sum2 += x;
        for (int x : s3) sum3 += x;
        int i = 0, j = 0, k = 0;
        int n1 = s1.size(), n2 = s2.size(), n3 = s3.size();
        while (true) {
            if (sum1 == sum2 && sum2 == sum3) return (int)sum1;
            if (sum1 >= sum2 && sum1 >= sum3) {
                if (i == n1) return 0;
                sum1 -= s1[i++];
            } else if (sum2 >= sum1 && sum2 >= sum3) {
                if (j == n2) return 0;
                sum2 -= s2[j++];
            } else {
                if (k == n3) return 0;
                sum3 -= s3[k++];
            }
        }
    }
};