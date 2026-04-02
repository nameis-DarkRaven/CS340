import type { Array2D } from "./Array2D";
export declare class ProxyArray2D implements Array2D {
    private array2D;
    private filename;
    constructor(filename: string);
    set(row: number, col: number, value: number): void;
    get(row: number, col: number): number;
    save(filename: string): void;
    loadArray(): void;
}
//# sourceMappingURL=Proxy.d.ts.map