
class Solution
{
public:
    int maxProduct(vector<int> &arr, int k)
    {
        // Sort the array so I can access the smallest and largest
        // elements using two pointers.
        sort(arr.begin(), arr.end());

        int n = arr.size();

        // If I need only one element, the largest element gives
        // the maximum possible product.
        if (k == 1)
        {
            return arr[n - 1];
        }

        // If every element is non-positive and k is odd,
        // the product cannot be made positive.
        // I take the k largest elements because they give
        // the maximum product in this case.
        if (arr[n - 1] <= 0 && k % 2 == 1)
        {
            int product = 1;

            // The last k elements are the largest elements.
            for (int i = n - k; i < n; ++i)
            {
                product *= arr[i];
            }

            return product;
        }

        int left = 0;      // Points to the two smallest available elements.
        int right = n - 1; // Points to the two largest available elements.
        int product = 1;   // Stores the product of the selected elements.

        // If k is odd, I must select one element first.
        // The largest element is the best choice.
        if (k % 2 == 1)
        {
            product *= arr[right];
            --right;
            --k;
        }

        // Now k is even, so I select elements in pairs.
        while (k > 0)
        {
            // Product of the two smallest available elements.
            // Two negative values can produce a large positive product.
            int leftProduct = arr[left] * arr[left + 1];

            // Product of the two largest available elements.
            int rightProduct = arr[right - 1] * arr[right];

            // Take whichever pair gives the larger product.
            if (leftProduct > rightProduct)
            {
                product *= leftProduct;
                left += 2; // Remove the two elements used from the left.
            }
            else
            {
                product *= rightProduct;
                right -= 2; // Remove the two elements used from the right.
            }

            // Two elements have been selected.
            k -= 2;
        }

        return product;
    }
};
