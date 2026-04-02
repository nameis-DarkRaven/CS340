"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealArray2D = void 0;
const fs = require("fs");
class RealArray2D {
    array = [];
    constructor(rows, columns, filename) {
        if (rows && columns) {
            this.array = new Array(rows);
            for (let x = 0; x < rows; x++) {
                this.array[x] = new Array(columns);
            }
        }
        else if (filename) {
            this.load(filename);
        }
    }
    set(row, col, value) {
        this.inBounds(row, col);
        this.array[row][col] = value;
    }
    get(row, col) {
        this.inBounds(row, col);
        return this.array[row][col];
    }
    inBounds(row, col) {
        if (row >= this.array.length) {
            throw new Error(`row: ${row} out of bounds`);
        }
        if (col >= this.array[0].length) {
            throw new Error(`column: ${col} out of bounds`);
        }
    }
    load(filename) {
        const contents = fs.readFileSync(filename, "utf-8");
        this.array = JSON.parse(contents);
    }
    save(filename) {
        const contents = JSON.stringify(this.array);
        fs.writeFileSync(filename, contents);
    }
}
exports.RealArray2D = RealArray2D;
//# sourceMappingURL=RealArray2D.js.map