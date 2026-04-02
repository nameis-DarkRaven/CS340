import { WallHangingProvider } from "../../decoration/interfaces/WallHangingProvider";

export class HalloweenWallHangingProvider implements WallHangingProvider {
  getHanging(): string {
    return "spider-web";
  }
}
