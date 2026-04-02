import { YardOrnamentProvider } from "../../decoration/interfaces/YardOrnamentProvider";

export class ChristmasYardOrnamentProvider implements YardOrnamentProvider {
  getOrnament(): string {
    return "snowman";
  }
}
