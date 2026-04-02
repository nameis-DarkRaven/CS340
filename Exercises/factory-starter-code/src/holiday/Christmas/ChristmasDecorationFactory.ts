import { HolidayDecorationFactory } from "../../decoration/interfaces/HolidayDecorationFactory";
import { YardOrnamentProvider } from "../../decoration/interfaces/YardOrnamentProvider";
import { WallHangingProvider } from "../../decoration/interfaces/WallHangingProvider";
import { TableclothPatternProvider } from "../../decoration/interfaces/TableclothPatternProvider";

import { ChristmasYardOrnamentProvider } from "./ChristmasYardOrnamentProvider";
import { ChristmasWallHangingProvider } from "./ChristmasWallHangingProvider";
import { ChristmasTableclothPatternProvider } from "./ChristmasTableclothPatternProvider";

export class ChristmasDecorationFactory implements HolidayDecorationFactory {
  createYardOrnamentProvider(): YardOrnamentProvider {
    return new ChristmasYardOrnamentProvider();
  }

  createWallHangingProvider(): WallHangingProvider {
    return new ChristmasWallHangingProvider();
  }

  createTableclothPatternProvider(): TableclothPatternProvider {
    return new ChristmasTableclothPatternProvider();
  }
}
