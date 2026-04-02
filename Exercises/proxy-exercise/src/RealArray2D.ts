import type { Array2D } from "./Array2D";
import * as fs from "fs";

export class RealArray2D implements Array2D {
  private array: number[][] = [];

  public constructor(rows?: number, columns?: number, filename?: string) {
    if (rows && columns) {
      this.array = new Array(rows);
      for (let x = 0; x < rows; x++) {
        this.array[x] = new Array(columns);
      }
    } else if (filename) {
      this.load(filename);
    }
  }

  public set(row: number, col: number, value: number): void {
    this.inBounds(row, col);
    this.array[row][col] = value;
  }

  public get(row: number, col: number): number {
    this.inBounds(row, col);
    return this.array[row][col];
  }

  private inBounds(row: number, col: number): void {
    if (row >= this.array.length) {
      throw new Error(`row: ${row} out of bounds`);
    }
    if (col >= this.array[0].length) {
      throw new Error(`column: ${col} out of bounds`);
    }
  }

  private load(filename: string) {
    const contents: string = fs.readFileSync(filename, "utf-8");
    this.array = JSON.parse(contents);
  }

  public save(filename: string) {
    const contents: string = JSON.stringify(this.array);
    fs.writeFileSync(filename, contents);
  }
}
