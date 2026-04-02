import { YardOrnamentProvider } from "../../decoration/interfaces/YardOrnamentProvider";

export class HalloweenYardOrnamentProvider implements YardOrnamentProvider {
  getOrnament(): string {
    return "jack-o-lantern";
  }
}
