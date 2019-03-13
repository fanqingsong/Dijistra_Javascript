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

	
	/*******************************************************************************
	*  Author: fanqingsong
	*  Date: 
	*  Description: 
	*  Changes:
	*******************************************************************************/

	/**************************************************************************
	*  Description: 以下为接口实现依赖的私有变量
	*  Changes:
	***************************************************************************/
	let DAG;
	let startName;
	let endName;

	/* 记录图中各个点之间有向边的权重 */
	let edgeWeightMatrix = [];
	/* 算法核心数据结构 */
	let dataStruct = {
	    /* 已经知道最短路径集合 */
	    knownSet:[], 
	    /* 未知最短路径集合 */
	    unKnownSet:[], 
	    /* 最短特殊路径长度 */
	    distanceSP:[],
	};

	/**************************************************************************
	*  Description: 计算接口实现，包含主体流程
	*  Changes:
	***************************************************************************/
	/* 计算有向无环图中，指定两点之间的最短路径 */
	function ComputeShortPath(inDAG, inStartName, inEndName)
	{
	    DAG = inDAG;
	    startName = inStartName;
	    endName = inEndName;

	    InitEdgeWeightMaxtrix();

	    InitDijistraDataStruct();

	    DoDijistraComputing();

	    let distance = GetShortPath();
	    
	    console.log("The shortest distance between "+startName+" and "+endName+" = "+distance);

	    return {
	        distance: distance,
	    };
	}

	/**************************************************************************
	*  Description: 以下为接口实现依赖的私有函数
	*  Changes:
	***************************************************************************/
	//判断两个节点是否有前后继关系，第一个为前，后一个为后
	function IsSuccessor(DAG, nodeNameA, nodeNameB)
	{
	    let node = DAG[nodeNameA];
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
	function InitEdgeWeightMaxtrix()
	{
	    for ( let nodeNameA in DAG )
	    {
	        edgeWeightMatrix[nodeNameA] = [];
	        
	        for ( let nodeNameB in DAG )
	        {
	            let isSucc = IsSuccessor(DAG, nodeNameA, nodeNameB);
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

	            edgeWeightMatrix[nodeNameA][nodeNameB] = weight;
	            
	            //console.log("edgeWeightMatrix["+nodeNameA+"]["+nodeNameB+"]="+edgeWeightMatrix[nodeNameA][nodeNameB])
	        }
	    }
	}

	/* 产生Dijistra运算的数据结构 */
	function InitDijistraDataStruct()
	{
	    let nodeName;

	    /* 初始化，出发点添加到已知集合，其他添加到未知集合 */
	    for ( nodeName in DAG )
	    {
	        if ( nodeName === startName )
	        {
	            dataStruct.knownSet.push(startName);
	        }
	        else
	        {
	            dataStruct.unKnownSet.push(nodeName);
	        }
	    }
	    
	    /* 初始化最短特殊路径 */
	    console.log("---- Generate distanceSP with startName = "+startName);
	    for ( let index in dataStruct.unKnownSet )
	    {
	        nodeName = dataStruct.unKnownSet[index];
	        dataStruct.distanceSP[nodeName] = edgeWeightMatrix[startName][nodeName];

	        console.log("distanceSP["+nodeName+"]="+dataStruct.distanceSP[nodeName]);
	    }
	    
	    return dataStruct;
	}

	/* 运行最短路计算逻辑 */
	function DoDijistraComputing()
	{
	    let index;
	    let nodeName;

	    /* dijstra */
	    let loopNum = dataStruct.unKnownSet.length;
	    for ( let i=0; i<loopNum; i++ )
	    {
	        /* 找unKnownSet中最短特殊路径顶点 */
	        let minDistName = dataStruct.unKnownSet[0]; 
	        let minDistIndex = 0;
	        let minDist = dataStruct.distanceSP[minDistName];
	        for ( index in dataStruct.unKnownSet )
	        {
	            nodeName = dataStruct.unKnownSet[index];
	            let dist = dataStruct.distanceSP[nodeName];
	            if ( dist < minDist )
	            {
	                minDist = dist;
	                minDistName = nodeName;
	                minDistIndex = index;
	            }
	        }
	        
	        /* 将最短特殊路径顶点，从unkownSet中删除，加入knownSet */
	        dataStruct.unKnownSet.splice(minDistIndex, 1);
	        dataStruct.knownSet.push(minDistName);
	        
	        /* 更新 unKnownSet 中元素的 distanceSP 值 */
	        for ( index in dataStruct.unKnownSet )
	        {
	            nodeName = dataStruct.unKnownSet[index];
	            let oldDist = dataStruct.distanceSP[nodeName];
	            let weight = edgeWeightMatrix[minDistName][nodeName];
	            let newDist = minDist + weight;
	            if ( newDist < oldDist )
	            {
	                dataStruct.distanceSP[nodeName] = newDist;
	            }
	        }
	    }

	    /* 输出看打印结果 */
	    console.log("Complete distanceSP with startName = "+startName);

	    for ( index in dataStruct.knownSet )
	    {
	        nodeName = dataStruct.knownSet[index];

	        console.log("distanceSP["+nodeName+"]="+dataStruct.distanceSP[nodeName]);
	    }
	}

	/* 获取最短路径 */
	function GetShortPath()
	{
	    return dataStruct.distanceSP[endName];
	}


	/* 将计算接口开放出去 */
	module.exports = {ComputeShortPath:ComputeShortPath};
	//export default ComputeShortPath;



/***/ })
/******/ ])
});
;