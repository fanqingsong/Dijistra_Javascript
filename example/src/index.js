
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


const { DIJISTRA_ALGORITHM } = require("../../dist/dijistra.umd.js");

function DocWrite(str)
{
    document.write(str);
    document.write("<br>");
}

//有向无环图
var DAG = {
  "welecome": {"adjacentTo": ["service"]},
  "service": {"adjacentTo": ["phone", "brandband"]},
  "phone": {"adjacentTo": ["over"]},
  "brandband": {"adjacentTo": ["over"]},
  "over": {"adjacentTo": []}
};

DocWrite("DAG="+JSON.stringify(DAG));

let dijistraInstance = new DIJISTRA_ALGORITHM(DAG, "welecome", "OVER");

var ret = dijistraInstance.ComputeShortPath();

DocWrite("distance [welecome, OVER]="+ret.distance);


