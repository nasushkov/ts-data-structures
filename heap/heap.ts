type Comparator<T> = (a: T, b: T) => number;

class Heap<T> {
    private comp: Comparator<T>;
    private heap: (T | null)[];
    private sz: number;

    constructor(size: number, arr: T[], comp: Comparator<T>) {
        this.comp = comp;
        this.sz = 0;
        this.heap = new Array<T | null>(size + 1).fill(null);
        arr.forEach(el => this.push(el));
    }

    private less(i: number, j: number): boolean {
        return this.comp(this.heap[i]!, this.heap[j]!) < 0;
    }

    private exch(i: number, j: number) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    private sink(k: number) {
        while(2 * k <= this.sz) {
            let j = 2 * k;
            if (j < this.sz && this.less(j, j + 1)) {
                j += 1;
            }

            if (this.less(k, j)) {
                this.exch(k, j);
                k = j
            } else {
                break;
            }
        }
    }

    private swim(k: number) {
        let pp = Math.floor(k / 2);

        while(k > 1 && this.less(pp, k)) {
            this.exch(pp, k);
            k = pp;
            pp = Math.floor(k / 2);
        }
    }

    get length(): number {
        return this.sz;
    }

    push(el: T) {
        this.sz += 1;
        this.heap[this.sz] = el;
        this.swim(this.sz);
    }

    pop(): T | null {
        if (this.sz === 0) {
            return null;
        }

        const te = this.heap[1];
        this.heap[1] = this.heap[this.sz];
        this.heap[this.sz] = null;
        this.sz -= 1;
        this.sink(1);

        return te;
    }

    peek(): T | null {
        return this.heap.length > 1 ? this.heap[1] : null;
    }

    toArray(): T[] {
        const res: T[] = [];
        
        for (let i = 1; i <= this.sz; i += 1) {
            res.push(this.heap[i]);
        }
        
        return res;
    }
}