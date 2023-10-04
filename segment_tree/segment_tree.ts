class SegmentTree {
    private tree: number[];
    private arr: number[];

    private build(pos: number, l: number, r: number): number {
        if (l === r) {
            this.tree[pos] = this.arr[l];  
            return this.tree[pos];      
        }

        const mid = Math.floor((l + r) / 2);
        const ls = this.build(pos * 2, l, mid);
        const rs = this.build(pos * 2 + 1, mid + 1, r);
        this.tree[pos] = ls + rs;

        return this.tree[pos];
    }

    constructor(arr: number[]) {
        this.arr = arr;

        let ptwo = 0;
        let n = 1;

        while (n < arr.length) {
            n *= 2;
            ptwo += 1;
        }

        const tsz = n + Math.pow(2, ptwo - 1) + 1;   

        this.tree = new Array<number>(tsz);
        this.build(1, 0, this.arr.length - 1);
    }

    private queryTree(pos: number, lt: number, rt: number, l: number, r: number): number {
        if (lt > r || rt < l) {
            return 0;
        }

        if (lt >= l && rt <= r) {
            return this.tree[pos];
        }

        const mid = Math.floor((lt + rt) / 2);
        return this.queryTree(pos * 2, lt, mid, l, r) + this.queryTree(pos * 2 + 1, mid + 1, rt, l, r);
    }

    query(l: number, r: number): number {
        return this.queryTree(1, 0,  this.arr.length - 1, l, r);
    }
}