import { HolidayDecorationFactory } from "./interfaces/HolidayDecorationFactory";

export class DecorationPlacer {
  private yardOrnament;
  private wallHanging;
  private tableclothPattern;

  constructor(factory: HolidayDecorationFactory) {
    this.yardOrnament = factory.createYardOrnamentProvider();
    this.wallHanging = factory.createWallHangingProvider();
    this.tableclothPattern = factory.createTableclothPatternProvider();
  }

  placeDecorations(): string {
    return (
      "Everything was ready for the party. The " +
      this.yardOrnament.getOrnament() +
      " was in front of the house, the " +
      this.wallHanging.getHanging() +
      " was hanging on the wall, and the tablecloth with " +
      this.tableclothPattern.getTablecloth() +
      " was spread over the table."
    );
  }
}
