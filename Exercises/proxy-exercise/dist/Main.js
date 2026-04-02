"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Proxy_1 = require("./Proxy");
const RealArray2D_1 = require("./RealArray2D");
function main() {
    let array = new RealArray2D_1.RealArray2D(5, 5);
    array.set(0, 0, 1);
    array.set(1, 3, 8);
    array.set(4, 2, 7);
    array.save("random.txt");
}
main();
function proxy() {
    let array = new Proxy_1.ProxyArray2D("random.txt");
    array.set(1, 1, 1);
    array.set(0, 1, 2);
    array.set(4, 4, 2);
    array.save("random.txt");
}
proxy();
//# sourceMappingURL=Main.js.map