
let Please = require('pleasejs')

require('./styles.css') // The page is now styled

// Accept hot module reloading during development
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept();
  }
}

const div = document.getElementById('color')
const button = document.getElementById('button')
const changeColor = () => div.style.backgroundColor = Please.make_color()

button.addEventListener('click', changeColor)


let dijiLib = require("../../dist/dijistra.umd.js");

function DocWrite(str)
{
    document.write(str);
    document.write("<br>");
}

//有向无环图
var DAG = {
  "welecome": {"adjacentTo": ["workmode"]},
  "workmode": {"adjacentTo": ["WAN", "WLAN"]},
  "WAN": {"adjacentTo": ["WLAN"]},
  "WLAN": {"adjacentTo": ["OVER"]},
  "OVER": {"adjacentTo": []}
};

DocWrite("DAG="+JSON.stringify(DAG));

var ret = dijiLib.ComputeShortPath(DAG, "welecome", "OVER");

DocWrite("distance [welecome, OVER]="+ret.distance);


