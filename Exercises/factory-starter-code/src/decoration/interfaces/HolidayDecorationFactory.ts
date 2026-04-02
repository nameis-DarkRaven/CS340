import { YardOrnamentProvider } from "./YardOrnamentProvider";
import { WallHangingProvider } from "./WallHangingProvider";
import { TableclothPatternProvider } from "./TableclothPatternProvider";

export interface HolidayDecorationFactory {
  createYardOrnamentProvider(): YardOrnamentProvider;
  createWallHangingProvider(): WallHangingProvider;
  createTableclothPatternProvider(): TableclothPatternProvider;
}
