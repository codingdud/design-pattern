class Rangenum {
    start;
    end;
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        return {
            next() {
                if (current < end)
                    return { value: current++, done: false };
                else
                    return { value: undefined, done: true };
            }
        };
    }
}
const obj = new Rangenum(1, 3);
for (let i of obj)
    console.log(i);
