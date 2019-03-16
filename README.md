# dijistra algorithm library

## this project is for develop dijistra library 

including api
 - [ ] ComputeShortPath


#install and run 

```
npm install
npm run build

// see the effect
npm run dev:example
```

# explain

usage code

```

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



```

