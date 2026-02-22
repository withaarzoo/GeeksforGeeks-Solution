class Solution
{
public:
    long subarrayXor(vector<int> &arr, int k)
    {

        unordered_map<int, long> freq; // stores frequency of prefix XOR
        long count = 0;
        int prefixXor = 0;

        // Important: prefix XOR 0 has frequency 1
        freq[0] = 1;

        for (int i = 0; i < arr.size(); i++)
        {

            // Update prefix XOR
            prefixXor ^= arr[i];

            // If (prefixXor ^ k) exists, add its frequency
            if (freq.find(prefixXor ^ k) != freq.end())
            {
                count += freq[prefixXor ^ k];
            }

            // Store current prefix XOR
            freq[prefixXor]++;
        }

        return count;
    }
};