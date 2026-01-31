class kQueues {
    int[] arr, front, rear, next;
    int freeSpot, n, k;

    kQueues(int n, int k) {
        this.n = n;
        this.k = k;

        arr = new int[n];
        next = new int[n];
        front = new int[k];
        rear = new int[k];

        for (int i = 0; i < k; i++) {
            front[i] = rear[i] = -1;
        }

        for (int i = 0; i < n - 1; i++) {
            next[i] = i + 1;
        }
        next[n - 1] = -1;

        freeSpot = 0;
    }

    void enqueue(int x, int i) {
        if (freeSpot == -1) return;

        int index = freeSpot;
        freeSpot = next[index];

        if (front[i] == -1) {
            front[i] = index;
        } else {
            next[rear[i]] = index;
        }

        next[index] = -1;
        rear[i] = index;
        arr[index] = x;
    }

    int dequeue(int i) {
        if (front[i] == -1) return -1;

        int index = front[i];
        front[i] = next[index];

        next[index] = freeSpot;
        freeSpot = index;

        return arr[index];
    }

    boolean isEmpty(int i) {
        return front[i] == -1;
    }

    boolean isFull() {
        return freeSpot == -1;
    }
}
