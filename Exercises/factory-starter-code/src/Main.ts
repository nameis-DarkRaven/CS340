import { DecorationPlacer } from "./decoration/DecorationPlacer";
import { HalloweenDecorationFactory } from "./holiday/Halloween/HalloweenDecorationFactory";
import { ChristmasDecorationFactory } from "./holiday/Christmas/ChristmasDecorationFactory";

main();

function main(): void {
  let factory = new HalloweenDecorationFactory();
  let decorationPlacer = new DecorationPlacer(factory);

  console.log(decorationPlacer.placeDecorations());

  factory = new ChristmasDecorationFactory();
  decorationPlacer = new DecorationPlacer(factory);

  console.log(decorationPlacer.placeDecorations());
}
