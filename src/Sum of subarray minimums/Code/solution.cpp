class Solution {
  public:
    int sumSubMins(vector<int> &arr) {
        int n = arr.size();
        
        vector<int> left(n), right(n);
        stack<int> st;

        // Find distance to Previous Less Element
        for(int i = 0; i < n; i++){
            while(!st.empty() && arr[st.top()] > arr[i])
                st.pop();

            if(st.empty())
                left[i] = i + 1;
            else
                left[i] = i - st.top();

            st.push(i);
        }

        // Clear stack for next computation
        while(!st.empty()) st.pop();

        // Find distance to Next Less Element
        for(int i = n - 1; i >= 0; i--){
            while(!st.empty() && arr[st.top()] >= arr[i])
                st.pop();

            if(st.empty())
                right[i] = n - i;
            else
                right[i] = st.top() - i;

            st.push(i);
        }

        long long ans = 0;

        for(int i = 0; i < n; i++){
            ans += (long long)arr[i] * left[i] * right[i];
        }

        return ans;
    }
};