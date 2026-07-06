class Solution
{
public:
    int maxPathSum(vector<int> &a, vector<int> &b)
    {
        // i moves through a, while j moves through b.
        int i = 0;
        int j = 0;

        // These store the sums between two common elements.
        int sumA = 0;
        int sumB = 0;

        // This stores the best total path sum.
        int answer = 0;

        // I compare both arrays until one of them ends.
        while (i < a.size() && j < b.size())
        {
            if (a[i] < b[j])
            {
                // This value belongs only to the current path in a.
                sumA += a[i];
                i++;
            }
            else if (a[i] > b[j])
            {
                // This value belongs only to the current path in b.
                sumB += b[j];
                j++;
            }
            else
            {
                // At a common element, I choose the better previous path.
                answer += max(sumA, sumB);

                // The common element must be counted only once.
                answer += a[i];

                // A new segment starts after this common element.
                sumA = 0;
                sumB = 0;

                // Both pointers move because the common value was processed.
                i++;
                j++;
            }
        }

        // If a still has elements, they belong to its final segment.
        while (i < a.size())
        {
            sumA += a[i];
            i++;
        }

        // If b still has elements, they belong to its final segment.
        while (j < b.size())
        {
            sumB += b[j];
            j++;
        }

        // I finish by choosing the better remaining path.
        answer += max(sumA, sumB);

        return answer;
    }
};