(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	class DIJISTRA_ALGORITHM {
	    constructor(inDAG, inStartName, inEndName){
	        this.DAG = inDAG;
	        this.startName = inStartName;
	        this.endName = inEndName;
	        
	        /* 记录图中各个点之间有向边的权重 */
	        this.edgeWeightMatrix = [];

	        /* 算法核心数据结构 */
	        this.dataStruct = {
	            /* 已经知道最短路径集合 */
	            knownSet:[], 
	            /* 未知最短路径集合 */
	            unKnownSet:[], 
	            /* 最短特殊路径长度 */
	            distanceSP:[],
	        };        
	    }

	    /* 计算有向无环图中，指定两点之间的最短路径 */
	    ComputeShortPath()
	    {
	        this.InitEdgeWeightMaxtrix();

	        this.InitDijistraDataStruct();

	        this.DoDijistraComputing();

	        let distance = this.GetShortPath();
	        
	        console.log("The shortest distance between "+this.startName+" and "+this.endName+" = "+distance);

	        return {
	            distance: distance,
	        };
	    }

	    //判断两个节点是否有前后继关系，第一个为前，后一个为后
	    IsSuccessor(DAG, nodeNameA, nodeNameB)
	    {
	        let node = this.DAG[nodeNameA];
	        let nextNodes = node["adjacentTo"];
	        for ( let index in nextNodes )
	        {
	            let nextNode = nextNodes[index];
	            if ( nextNode === nodeNameB )
	            {
	                return true;
	            }
	        }
	        
	        return false;
	    }

	    /* 生成权重矩阵 */
	    InitEdgeWeightMaxtrix()
	    {
	        for ( let nodeNameA in this.DAG )
	        {
	            this.edgeWeightMatrix[nodeNameA] = [];
	            
	            for ( let nodeNameB in this.DAG )
	            {
	                let isSucc = this.IsSuccessor(this.DAG, nodeNameA, nodeNameB);
	                let weight;
	                if ( true === isSucc )
	                {
	                    /* 有前后继的关系，权重设置为1 */
	                    weight = 1;
	                }
	                else
	                {
	                    /* 没有前后继的关系，权重设置为正无穷 */
	                    weight = Number.POSITIVE_INFINITY;
	                }

	                this.edgeWeightMatrix[nodeNameA][nodeNameB] = weight;
	                
	                //console.log("edgeWeightMatrix["+nodeNameA+"]["+nodeNameB+"]="+edgeWeightMatrix[nodeNameA][nodeNameB])
	            }
	        }
	    }

	    /* 产生Dijistra运算的数据结构 */
	    InitDijistraDataStruct()
	    {
	        let nodeName;

	        /* 初始化，出发点添加到已知集合，其他添加到未知集合 */
	        for ( nodeName in this.DAG )
	        {
	            if ( nodeName === this.startName )
	            {
	                this.dataStruct.knownSet.push(nodeName);
	            }
	            else
	            {
	                this.dataStruct.unKnownSet.push(nodeName);
	            }
	        }
	        
	        /* 初始化最短特殊路径 */
	        console.log("---- Generate distanceSP with startName = "+this.startName);
	        for ( let index in this.dataStruct.unKnownSet )
	        {
	            nodeName = this.dataStruct.unKnownSet[index];
	            this.dataStruct.distanceSP[nodeName] = this.edgeWeightMatrix[this.startName][nodeName];

	            console.log("distanceSP["+nodeName+"]="+this.dataStruct.distanceSP[nodeName]);
	        }
	        
	        return this.dataStruct;
	    }

	    /* 运行最短路计算逻辑 */
	    DoDijistraComputing()
	    {
	        let index;
	        let nodeName;

	        /* dijstra */
	        let loopNum = this.dataStruct.unKnownSet.length;
	        for ( let i=0; i<loopNum; i++ )
	        {
	            /* 找unKnownSet中最短特殊路径顶点 */
	            let minDistName = this.dataStruct.unKnownSet[0]; 
	            let minDistIndex = 0;
	            let minDist = this.dataStruct.distanceSP[minDistName];
	            for ( index in this.dataStruct.unKnownSet )
	            {
	                nodeName = this.dataStruct.unKnownSet[index];
	                let dist = this.dataStruct.distanceSP[nodeName];
	                if ( dist < minDist )
	                {
	                    minDist = dist;
	                    minDistName = nodeName;
	                    minDistIndex = index;
	                }
	            }
	            
	            /* 将最短特殊路径顶点，从unkownSet中删除，加入knownSet */
	            this.dataStruct.unKnownSet.splice(minDistIndex, 1);
	            this.dataStruct.knownSet.push(minDistName);
	            
	            /* 更新 unKnownSet 中元素的 distanceSP 值 */
	            for ( index in this.dataStruct.unKnownSet )
	            {
	                nodeName = this.dataStruct.unKnownSet[index];
	                let oldDist = this.dataStruct.distanceSP[nodeName];
	                let weight = this.edgeWeightMatrix[minDistName][nodeName];
	                let newDist = minDist + weight;
	                if ( newDist < oldDist )
	                {
	                    this.dataStruct.distanceSP[nodeName] = newDist;
	                }
	            }
	        }

	        /* 输出看打印结果 */
	        console.log("Complete distanceSP with startName = "+this.startName);

	        for ( index in this.dataStruct.knownSet )
	        {
	            nodeName = this.dataStruct.knownSet[index];

	            console.log("distanceSP["+nodeName+"]="+this.dataStruct.distanceSP[nodeName]);
	        }
	    }

	    /* 获取最短路径 */
	    GetShortPath()
	    {
	        return this.dataStruct.distanceSP[this.endName];
	    }
	}

	// const _DIJISTRA_ALGORITHM = DIJISTRA_ALGORITHM;
	// export { _DIJISTRA_ALGORITHM as DIJISTRA_ALGORITHM };

	/* 将计算接口开放出去 */
	module.exports = {DIJISTRA_ALGORITHM:DIJISTRA_ALGORITHM};
	//export default ComputeShortPath;



/***/ })
/******/ ])
});
;