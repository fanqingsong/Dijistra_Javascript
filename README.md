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

let dijiLib = require("../dist/dijistra.umd.js");

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

```

