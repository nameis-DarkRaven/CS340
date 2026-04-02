import { TableclothPatternProvider } from "../../decoration/interfaces/TableclothPatternProvider";

export class HalloweenTableclothPatternProvider implements TableclothPatternProvider {
  getTablecloth(): string {
    return "ghosts and skeletons";
  }
}
