class kQueues {
  constructor(n, k) {
    this.arr = new Array(n);
    this.next = new Array(n);
    this.front = new Array(k).fill(-1);
    this.rear = new Array(k).fill(-1);

    for (let i = 0; i < n - 1; i++) {
      this.next[i] = i + 1;
    }
    this.next[n - 1] = -1;

    this.freeSpot = 0;
  }

  enqueue(x, i) {
    if (this.freeSpot === -1) return;

    let index = this.freeSpot;
    this.freeSpot = this.next[index];

    if (this.front[i] === -1) {
      this.front[i] = index;
    } else {
      this.next[this.rear[i]] = index;
    }

    this.next[index] = -1;
    this.rear[i] = index;
    this.arr[index] = x;
  }

  dequeue(i) {
    if (this.front[i] === -1) return -1;

    let index = this.front[i];
    this.front[i] = this.next[index];

    this.next[index] = this.freeSpot;
    this.freeSpot = index;

    return this.arr[index];
  }

  isEmpty(i) {
    return this.front[i] === -1;
  }

  isFull() {
    return this.freeSpot === -1;
  }
}
