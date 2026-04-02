import type { Array2D } from "./Array2D";
import { RealArray2D } from "./RealArray2D";

export class ProxyArray2D implements Array2D {
  private array2D: RealArray2D | null = null;
  private filename: string;

  public constructor(filename: string) {
    this.filename = filename;
  }

  set(row: number, col: number, value: number): void {
    this.loadArray();
    this.array2D!.set(row, col, value);
  }
  get(row: number, col: number): number {
    this.loadArray();
    return this.array2D!.get(row, col);
  }

  save(filename: string) {
    this.loadArray();
    this.array2D!.save(filename);
  }

  loadArray() {
    if (this.array2D === null) {
      this.array2D = new RealArray2D(undefined, undefined, this.filename);
    }
  }
}
