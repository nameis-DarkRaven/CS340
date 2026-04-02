import { WallHangingProvider } from "../../decoration/interfaces/WallHangingProvider";

export class ChristmasWallHangingProvider implements WallHangingProvider {
  getHanging(): string {
    return "felt tree";
  }
}
