class Solution
{
public:
    // Trie node for binary representation
    struct Node
    {
        Node *child[2];
        int cnt; // how many numbers pass through this node
        Node()
        {
            child[0] = child[1] = nullptr;
            cnt = 0;
        }
    };

    // maximum bits needed: values <= 5*10^4 < 2^16
    static const int MAX_BIT = 15;

    // insert number 'x' into trie
    void insert(Node *root, int x)
    {
        Node *cur = root;
        for (int b = MAX_BIT; b >= 0; --b)
        {
            int bit = (x >> b) & 1;
            if (!cur->child[bit])
                cur->child[bit] = new Node();
            cur = cur->child[bit];
            cur->cnt++; // one more number passes here
        }
    }

    // count numbers 'y' already in trie such that (x XOR y) < k
    long long countLess(Node *root, int x, int k)
    {
        Node *cur = root;
        long long res = 0;
        for (int b = MAX_BIT; b >= 0 && cur; --b)
        {
            int bitX = (x >> b) & 1;
            int bitK = (k >> b) & 1;

            if (bitK == 1)
            {
                // option 1: (x xor y) bit = 0 < 1
                // y's bit must be bitX, all such numbers are valid
                Node *same = cur->child[bitX];
                if (same)
                    res += same->cnt;

                // option 2: (x xor y) bit = 1 == 1
                // need to continue with y's bit = 1 - bitX
                cur = cur->child[1 - bitX];
            }
            else
            {
                // bitK == 0: (x xor y) bit must be 0, so y's bit = bitX
                cur = cur->child[bitX];
            }
        }
        return res;
    }

    int cntPairs(vector<int> &arr, int k)
    {
        // if k == 0, no XOR can be < 0
        if (k == 0)
            return 0;

        Node *root = new Node();
        long long ans = 0;

        for (int x : arr)
        {
            // count pairs with previous numbers
            ans += countLess(root, x, k);
            // add current number to trie for future
            insert(root, x);
        }

        // answer fits in 32-bit int for given constraints,
        // but we used long long to be safe while calculating
        return (int)ans;
    }
};
