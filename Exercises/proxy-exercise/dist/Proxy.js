"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyArray2D = void 0;
const RealArray2D_1 = require("./RealArray2D");
class ProxyArray2D {
    array2D = null;
    filename;
    constructor(filename) {
        this.filename = filename;
    }
    set(row, col, value) {
        this.loadArray();
        this.array2D.set(row, col, value);
    }
    get(row, col) {
        this.loadArray();
        return this.array2D.get(row, col);
    }
    save(filename) {
        this.loadArray();
        this.array2D.save(filename);
    }
    loadArray() {
        if (this.array2D === null) {
            this.array2D = new RealArray2D_1.RealArray2D(undefined, undefined, this.filename);
        }
    }
}
exports.ProxyArray2D = ProxyArray2D;
//# sourceMappingURL=Proxy.js.map