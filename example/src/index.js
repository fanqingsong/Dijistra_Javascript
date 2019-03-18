
// Accept hot module reloading during development
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept();
  }
}

const { DIJISTRA_ALGORITHM } = require("dijistra");

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

let dijistraInstance = new DIJISTRA_ALGORITHM(DAG, "welecome", "over");

var ret = dijistraInstance.ComputeShortPath();

DocWrite("distance [welecome, over]="+ret.distance);


