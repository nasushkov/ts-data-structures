class LRUNode {
    public key: number;
    public val: number;
    public prev: LRUNode | null = null;
    public next: LRUNode | null = null;

    constructor(key: number, val: number, prev: LRUNode | null, next: LRUNode | null) {
        this.key = key;
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

class LRUCache {    
    private map: Map<number, LRUNode>;
    private head: LRUNode | null;
    private tail: LRUNode | null;
    private capacity: number;
    private size: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.size = 0;
        this.map = new Map<number, LRUNode>();
        this.head = null;
        this.tail = null;
    }

    private delNode(node: LRUNode) {
        const prev = node.prev;
        const next = node.next;

        if (prev !== null) {
            prev.next = next;

            if (prev.next === null) {
                this.tail = prev;
            }
        }

        if (next !== null) {
            next.prev = node;
        } 

        node.prev = null;
        node.next = null;
    }

    get(key: number): number {
        if (!this.map.has(key)) {
            return -1;
        }

        const cn = this.map.get(key)!;
        this.delNode(cn);
        
        cn.next = this.head;
        
        if (this.head !== null) {
            this.head.prev = cn;
        }
    
        this.head = cn;        

        return cn.val;
    }

    put(key: number, value: number): void {
        let cn: LRUNode;

        if (this.map.has(key)) {
            cn = this.map.get(key)!;
            cn.val = value;
            this.delNode(cn);
        } else {
            cn = new LRUNode(key, value, null, null);
            this.map.set(key, cn);
            this.size += 1;            
        }

        cn.next = this.head;

        if (this.head !== null) {
            this.head.prev = cn;
        }

        this.head = cn;

        if (this.size > this.capacity && this.tail !== null) {
            const pn = this.tail.prev!;
            pn.next = null;
            this.map.delete(this.tail.key);       
            this.tail = pn;
            this.size -= 1;
        } 
        
        if (this.tail === null) {
            this.tail = cn;
        }
    }
}