# dijistra algorithm library

## this project is for develop dijistra library 
The main module return a dijistra alogrithm Class (DIJISTRA_ALGORITHM)

including one api temporily
 - [ ] ComputeShortPath


#install and run 

```
npm install
npm run build

// to build the distribution
npm run build

// to see the usage
cd example
npm install
npm run dev
```

# explain

usage code

```

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

let dijistraInstance = new DIJISTRA_ALGORITHM(DAG, "welecome", "OVER");

var ret = dijistraInstance.ComputeShortPath();

DocWrite("distance [welecome, OVER]="+ret.distance);


```

