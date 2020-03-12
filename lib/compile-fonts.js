const path = require("path");
const fs = require("fs");
const fsx = require("fs-extra");

console.log(__filename);
const font = fs.readFileSync(path.resolve(__dirname, "../node_modules/font-awesome/fonts/fontawesome-webfont.woff2"));
const css = fs.readFileSync(path.resolve(__dirname, "../node_modules/font-awesome/css/font-awesome.min.css"), "utf-8");
const REPLACE = "src:url('../fonts/fontawesome-webfont.eot?v=4.7.0');src:url('../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'),url('../fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'),url('../fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'),url('../fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'),url('../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg')";
const compiledCss = css.replace(REPLACE, `src:url('data:font/woff2;base64,${font.toString('base64')}') format('woff2')`);
fsx.ensureDirSync(path.resolve(__dirname, "../templates"));
fs.writeFileSync(path.resolve(__dirname, "../templates/fa.css"), compiledCss);
