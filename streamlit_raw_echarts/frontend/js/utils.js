function mapObject(obj,fn){
	return Object.keys(obj).reduce(function(res,key){
		res[key]=fn(obj[key]);
		return res;
	},{})
}

function deepMap(obj,fn){
	const deepMapper=function(val){
		return val !== null && typeof val === 'object' ? deepMap(val,fn):fn(val);
	};
	if(Array.isArray(obj)) return obj.map(deepMapper);
	if(typeof obj === 'object') return mapObject(obj,deepMapper);
	return obj;
}

function convertJsCode(obj){
	var p='--x_x--0_0--';
	let jsReg=new RegExp(`${p}\\s*(.+)\\s*${p}`);
	return deepMap(obj,function(v){
		if(typeof v == 'string'){
			let match=jsReg.exec(v);
			if(match) return new Function('return '+match[1])();
		}
		return v;
	})
}

function loadJs(js,pos='#basic_js'){
	js=$('<script type="text/javascript" src="'+js+'"/>');
	$(pos).append(js);
	return js
}

function loadMap(map){
	return loadJs(map,'#map_js');
}