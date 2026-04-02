import { ProxyArray2D } from "./Proxy";
import { RealArray2D } from "./RealArray2D";

function main() {
  let array = new RealArray2D(5, 5);
  array.set(0, 0, 1);
  array.set(1, 3, 8);
  array.set(4, 2, 7);

  array.save("random.txt");
}

main();

function proxy() {
  let array = new ProxyArray2D("random.txt");
  array.set(1, 1, 1);
  array.set(0, 1, 2);
  array.set(4, 4, 2);

  array.save("random.txt");
}

proxy();
