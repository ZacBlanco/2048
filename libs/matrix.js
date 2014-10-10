function Matrix(w, h, opt){

	this.height;
	this.width;
	this.matrixArray = matrixArrayInit(w, h, opt); 
	this.clone = function(){
		var w = this.width;
		var h = this.height;
		var arr = []
		for(var x = 0; x < w; x++){
			arr.push(new Array(h));
			for(var y = 0; y < h; y++){
				arr[x][y].push(this.matrixArray[x][y]);
			}
		}
		
	}
	
	function MatrixArrayInit(wi, hi, opt){
		var arr = new Array(wi);
		for(var x = 0; x < arr.length; x++){
			arr[x] = new Array(hi);
		}
		return arr;
	}
	
	function cloneArray(arr1){
		var newArr = new Array();
		if(arr.length > 0){
			for(var key in arr1){
				if(key.length > 0){
					newArr.push(cloneArray(key));
				}else{
					newArr.push(key);
				}
			}
		}
		return newArr;
	}
	this.getVal = function(x, y){
		
	}
	this.setVal = function(x, y){
	
	}
	this.transpose = function(){
		
	}
	this.multiply = function(matrix2){
		if(typeof(matrix2) == "number"){
		}else if(this.width == matrix2.height){
		}else{
			return -1;
		}
	}
	this.add = function(matrix2){
	
		if(matrix2.width == this.width && matrix2.height == this.height){
			var newMatrix = new Matrix(this.width, this.height);
			for(var i = 0; i < this.width; i++){
				for(var j = 0; j < this.height; j++){
					newMatrix[i][j] = this.matrixArray[i][j] + matrix2[i][j];
				}
			}
			return newMatrix;
		}else{
			return -1;
		}
	}
	
	this.substract = function(matrix2){
		if(matrix2.width == this.width && matrix2.height == this.height){
			var newMatrix = new Matrix(this.width, this.height);
			for(var i = 0; i < this.width; i++){
				for(var j = 0; j < this.height; j++){
					newMatrix[i][j] = this.matrixArray[i][j] - matrix2[i][j];
				}
			}
			return newMatrix;
		}else{
			return -1;
		}
	}


}