import { TableclothPatternProvider } from "../../decoration/interfaces/TableclothPatternProvider";

export class ChristmasTableclothPatternProvider implements TableclothPatternProvider {
  getTablecloth(): string {
    return "snowflakes and mistletoe";
  }
}
