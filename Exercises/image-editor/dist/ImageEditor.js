"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodefs = require("node:fs");
class Color {
    red;
    green;
    blue;
    constructor() {
        this.red = this.green = this.blue = 0;
    }
    toString() {
        return `${this.red} ${this.green} ${this.blue}`;
    }
}
class Image_ {
    width;
    height;
    pixels;
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.pixels = Array(width);
        for (let x = 0; x < this.pixels.length; x++) {
            this.pixels[x] = Array(height).fill(new Color());
        }
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    set(x, y, c) {
        if (typeof this.pixels[x] == "undefined") {
            return;
        }
        if (typeof this.pixels[x][y] == "undefined") {
            return;
        }
        this.pixels[x][y] = c;
    }
    get(x, y) {
        if (typeof this.pixels[x] == "undefined") {
            return new Color();
        }
        if (typeof this.pixels[x][y] == "undefined") {
            return new Color();
        }
        return this.pixels[x][y];
    }
    toString() {
        return this.pixels.toString();
    }
}
class ImageEditor {
    constructor() { }
    run(args) {
        try {
            if (args.length < 3) {
                this.usage();
                return;
            }
            const inputFile = args[0];
            const outputFile = args[1];
            const filter = args[2];
            let image = this.read(inputFile);
            // console.log(image.toString())
            if (args.length == 3) {
                if (filter.match(/gr(e|a)yscale/)) {
                    this.grayscale(image);
                }
                else if (filter.match(/invert/)) {
                    this.invert(image);
                }
                else if (filter.match(/emboss/)) {
                    this.emboss(image);
                }
                else {
                    this.usage();
                }
            }
            else if (args.length == 4) {
                if (filter.match(/motionblur/)) {
                    let length = -1;
                    try {
                        length = parseInt(args[3] ? args[3] : "-1");
                    }
                    catch { }
                    if (length < 0) {
                        this.usage();
                        return;
                    }
                    this.motionblur(image, length);
                }
                else {
                    this.usage();
                }
            }
            else {
                this.usage();
            }
            this.write(image, outputFile);
            // console.log(image.toString())
        }
        catch (error) {
            console.error(error);
        }
    }
    usage() {
        console.log("USAGE: TypeScript ImageEditor <in-file> <out-file> <grayscale|invert|emboss|motionblur> {motion-blur-length}");
    }
    read(filePath) {
        const data = nodefs.readFileSync(filePath, "utf8").split(/\s+/);
        const width = parseInt(data[1]);
        const height = parseInt(data[2]);
        const startIndex = 4;
        let image = new Image_(width, height);
        console.log(image.toString());
        for (let y = 0; y < height; ++y) {
            for (let x = 0; x < width; ++x) {
                let position = startIndex + (x + (y * width)) * 3;
                let color = new Color();
                // console.log(position)
                color.red = parseInt(data[position]);
                color.green = parseInt(data[position + 1]);
                color.blue = parseInt(data[position + 2]);
                image.set(x, y, color);
                // console.log(color)
            }
            console.log(image.toString());
        }
        return image;
    }
    write(image, filePath) {
        let output = "P3\r\n";
        output += `${image.getWidth()} ${image.getHeight()}\r\n`;
        output += "255\r\n";
        for (let y = 0; y < image.getHeight(); ++y) {
            for (let x = 0; x < image.getWidth(); ++x) {
                let color = image.get(x, y);
                output += `${x == 0 ? "" : " "}${color.red} ${color.green} ${color.blue}`;
            }
            output += "\r\n";
        }
        nodefs.writeFileSync(filePath, output);
    }
    grayscale(image) {
        for (let x = 0; x < image.getWidth(); ++x) {
            for (let y = 0; y < image.getHeight(); ++y) {
                let curColor = image.get(x, y);
                let grayLevel = Math.floor((curColor.red + curColor.green + curColor.blue) / 3);
                grayLevel = Math.max(0, Math.min(grayLevel, 255));
                curColor.red = curColor.green = curColor.blue = grayLevel;
            }
        }
    }
    invert(image) {
        for (let x = 0; x < image.getWidth(); ++x) {
            for (let y = 0; y < image.getHeight(); ++y) {
                let curColor = image.get(x, y);
                curColor.red = 255 - curColor.red;
                curColor.green = 255 - curColor.green;
                curColor.blue = 255 - curColor.blue;
            }
        }
    }
    emboss(image) {
        for (let x = image.getWidth() - 1; x >= 0; --x) {
            for (let y = image.getHeight() - 1; y >= 0; --y) {
                let curColor = image.get(x, y);
                let diff = 0;
                if (x > 0 && y > 0) {
                    let upLeftColor = image.get(x - 1, y - 1);
                    if (Math.abs(curColor.red - upLeftColor.red) > Math.abs(diff)) {
                        diff = curColor.red - upLeftColor.red;
                    }
                    if (Math.abs(curColor.green - upLeftColor.green) > Math.abs(diff)) {
                        diff = curColor.green - upLeftColor.green;
                    }
                    if (Math.abs(curColor.blue - upLeftColor.blue) > Math.abs(diff)) {
                        diff = curColor.blue - upLeftColor.blue;
                    }
                }
                let grayLevel = 128 + diff;
                grayLevel = Math.max(0, Math.min(grayLevel, 255));
                curColor.red = curColor.green = curColor.blue = grayLevel;
            }
        }
    }
    motionblur(image, length) {
        if (length < 1) {
            return;
        }
        for (let x = 0; x < image.getWidth(); ++x) {
            for (let y = 0; y < image.getHeight(); ++y) {
                let curColor = image.get(x, y);
                let maxX = Math.min(image.getWidth() - 1, x + length - 1);
                for (let i = x + 1; i <= maxX; ++i) {
                    let tmpColor = image.get(i, y);
                    curColor.red += tmpColor.red;
                    curColor.green += tmpColor.green;
                    curColor.blue += tmpColor.blue;
                }
                let delta = maxX - x + 1;
                curColor.red = Math.floor(curColor.red / delta);
                curColor.green = Math.floor(curColor.green / delta);
                curColor.blue = Math.floor(curColor.blue / delta);
            }
        }
    }
}
function main(args) {
    new ImageEditor().run(args);
}
const args = process.argv.slice(2);
main(args);
//# sourceMappingURL=ImageEditor.js.map