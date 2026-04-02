import type { Array2D } from "./Array2D";
export declare class RealArray2D implements Array2D {
    private array;
    constructor(rows?: number, columns?: number, filename?: string);
    set(row: number, col: number, value: number): void;
    get(row: number, col: number): number;
    private inBounds;
    private load;
    save(filename: string): void;
}
//# sourceMappingURL=RealArray2D.d.ts.map