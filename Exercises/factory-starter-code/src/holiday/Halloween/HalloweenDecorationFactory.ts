import { HolidayDecorationFactory } from "../../decoration/interfaces/HolidayDecorationFactory";
import { YardOrnamentProvider } from "../../decoration/interfaces/YardOrnamentProvider";
import { WallHangingProvider } from "../../decoration/interfaces/WallHangingProvider";
import { TableclothPatternProvider } from "../../decoration/interfaces/TableclothPatternProvider";

import { HalloweenYardOrnamentProvider } from "./HalloweenYardOrnamentProvider";
import { HalloweenWallHangingProvider } from "./HalloweenWallHangingProvider";
import { HalloweenTableclothPatternProvider } from "./HalloweenTableclothPatternProvider";

export class HalloweenDecorationFactory implements HolidayDecorationFactory {
  createYardOrnamentProvider(): YardOrnamentProvider {
    return new HalloweenYardOrnamentProvider();
  }

  createWallHangingProvider(): WallHangingProvider {
    return new HalloweenWallHangingProvider();
  }

  createTableclothPatternProvider(): TableclothPatternProvider {
    return new HalloweenTableclothPatternProvider();
  }
}
