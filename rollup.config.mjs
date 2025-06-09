export default [{
	input: "./dist/pp-rut.js",
	output: {
		name : "ppRut",
		compact:false,
		file: "./dist/pp-rut.rollup.js",
		format: "umd",
		globals:{
			"pp-is":"ppIs"
		}		
	},
	external:["pp-is"]
},{
	input: "./dist/pp-rut.nd.js",
	output: {
		name : "ppRut",
		compact:false,
		file: "./dist/pp-rut.nd.rollup.js",
		format: "umd",		
	}	
}]