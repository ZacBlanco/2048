var canvas_Element = document.getElementById("square")

canvas_Element.width = canvas_Element.parentNode.clientWidth;
canvas_Element.height = window.innerHeight - 200;
var ctx = canvas_Element.getContext("2d");
var AIBox = document.getElementById("useAI");

window.addEventListener("keydown", getKeyInput, true);
var keydown;

function getKeyInput(e) {
    keydown = keyDirs.lookup(e.keyCode);
    if (keydown == -1) {
        keydown = "";
    }
}
var keyDirs = new Map();
keyDirs.addElement(37, "W");
keyDirs.addElement(38, "N");
keyDirs.addElement(39, "E");
keyDirs.addElement(40, "S");

ctx.fillStyle = "#F0F0F0";
ctx.strokeStyle = "#FFF000";

var delta = 0;
var beginFrame
var endFrame = new Date().getTime();


var g = new game(gameLoop, 7);
g.play();


function game(loop, fps) {
	var intervalId;
    var fn = function() {
        beginFrame = endFrame;
        loop();
        endFrame = new Date().getTime();
        delta = (endFrame - beginFrame) / 1000;
    }
    this.play = function() {
        intervalId = setInterval(fn, 1000 / fps);
    }
	this.pause = function(){
		clearInterval(intervalId);
	}
	
	
}

var AI_1 = new AI();


function gameLoop() {
    if (AIBox.checked) {
        b.update(AI_1.determineMove(b));
    } else {
        b.update(keydown);
        keydown = "";
    }
    b.draw();
}

function AI() {

    this.directions = new Map()
    this.directions.addElement(0, "N");
    this.directions.addElement(1, "S");
    this.directions.addElement(2, "E");
    this.directions.addElement(3, "W");
    this.dirNumMap = new Map();
    this.dirNumMap.addElement("N", [0, -1]);
    this.dirNumMap.addElement("S", [0, 1]);
    this.dirNumMap.addElement("E", [1, 0]);
    this.dirNumMap.addElement("W", [-1, 0]);

    this.boards;
    this.scoreChange;

    function Tile(base, power) {
        this.base = base;
        this.value = function() {
            return Math.pow(this.base, this.power);
        };
        this.power = power;
    }

    function copyTileMap(newTiles) {
        var xLength = newTiles.length;
        var yLength = newTiles.length;
        var newObj = new Array(xLength);
        for (var i = 0; i < xLength; i++) {
            newObj[i] = new Array(yLength);
            for (var j = 0; j < yLength; j++) {
                newObj[i][j] = new Tile(newTiles[i][j].base, newTiles[i][j].power);
            }
        }
        return newObj;
    }

    this.determineMove = function(board) {
        var scoreChanges = new Array();
        for (var i = 0; i < this.directions.length(); i++) {
            var tempTiles = copyTileMap(board.tiles);
            var tempBoard = new Board(board.tilesX, board.tilesY, board.base);
            tempBoard.tiles = tempTiles;
            var pre, post;
            pre = tempBoard.score;
            tempBoard.update(directions.lookup(i));
            post = tempBoard.score;
            var deltaScore = post - pre;
            scoreChanges.push(deltaScore);
        }
        var bigChange = -1;
        var bigChngIndx = -1;
        for (var v = 0; v < scoreChanges.length; v++) {
            if (scoreChanges[v] > bigChange && scoreChanges[v] > 0) {
                bigChange = scoreChanges[v];
                bigChngIndx = v;
            }
        }
        if (bigChngIndx != -1) {
            return this.directions.lookup(bigChngIndx);
        } else {
            return this.directions.lookup(Math.floor(Math.random() * 3.999));
        }
    }
}


var b = new Board(4, 4, 2);

var directions = new Map();
directions.addElement(0, "N");
directions.addElement(1, "S");
directions.addElement(2, "E");
directions.addElement(3, "W");

var tileColors = new Map();
tileColors.addElement(0, "#D6D6D6");
tileColors.addElement(1, "#FFFBA1");
tileColors.addElement(2, "#F7F76F");
tileColors.addElement(3, "#FCFC38");
tileColors.addElement(4, "#FFBB3D");
tileColors.addElement(5, "#FFA600");
tileColors.addElement(6, "#FF7621");
tileColors.addElement(7, "#FF3A24");
tileColors.addElement(8, "#D6DE00");
tileColors.addElement(9, "#F3FA37");
tileColors.addElement(10, "D6FF08");
tileColors.addElement(11, "#F1AFF");
tileColors.addElement(12, "#9600B0");
tileColors.addElement(13, "#9F73FF");
tileColors.addElement(14, "#C2A6FF");
tileColors.addElement(15, "#3DFC63");


function Map(name) {

    this.eList = []
    this.name = name;

    function Element(k, v) {
        this.key = k;
        this.value = v;
    }

    this.addElement = function(k, v) {
        this.eList.push(new Element(k, v));
    }

    this.lookup = function(k) {
        for (var i = 0; i < this.eList.length; i++) {
            if (this.eList[i].key == k) {
                return this.eList[i].value;
            }
        }
    }

    this.length = function() {
            return this.eList.length;
        }
        //ADD a REMOVE FUNCTION
}

function LinkedList() {

    var head = null;
    var lastEl = null;
    this.length;

    function ListElement(el) {
        this.value;
        this.ref;
    }

    function add(item) {
        le = new ListElement(item);

        lastEl.ref = le;

        lastEl = le;

        if (head == null) {
            head = le;
        }
    }

    function lookup(indx) {
        if (indx < length) {
            var el = head;
            for (var i = 0; i < indx; i++) {
                el = el.ref;
            }
            return el.value;
        } else {
            return -1;
        }
    }
}

function Board(x, y, base) {

    this.tilesX = x;
    this.tilesY = y;
    this.score = 0;
    this.base = base;
    this.bufferX = canvas_Element.width / 10;
    this.bufferY = canvas_Element.height / 10;
    this.tileHeight = getTileWidthHeight(this.bufferX, this.bufferY, x, y);
    this.tileWidth = getTileWidthHeight(this.bufferX, this.bufferY, x, y);
    this.tiles = popBoard(x, y, base);
    this.dirNumMap = new Map();
    this.dirNumMap.addElement("N", [0, -1]);
    this.dirNumMap.addElement("S", [0, 1]);
    this.dirNumMap.addElement("E", [1, 0]);
    this.dirNumMap.addElement("W", [-1, 0]);

    this.newGame = function() {
        this.tiles = popBoard(this.tilesX, this.tilesY, this.base);
        this.score = 0;
    }

    function getTileWidthHeight(bx, by, x, y) {
        var minVal;
        var tempWidth = (canvas_Element.width - bx) / x;
        var tempHeight = (canvas_Element.height - by) / y;

        if (tempHeight <= tempWidth) {
            minVal = tempHeight;
        } else if (tempWidth < tempHeight) {
            minVal = tempWidth;
        } else {
            minVal = -1;
        }
        return minVal;
    }

    function popBoard(x, y, b) {
        var arr = new Array();
        for (var i = 0; i < x; i++) {
            arr[i] = new Array(y);
        }
        for (var i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                arr[i][j] = new Tile(b, 0);
            }
        }
        rx = Math.floor(Math.random() * x);
        ry = Math.floor(Math.random() * y);
        rp = Math.floor(Math.random() * 2) + 1;

        arr[rx][ry].power = rp;

        return arr;
    }

    function getEmptyTiles(x, y, tiles) {
        var empty = new Array();
        for (var i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                if (tiles[i][j].power == 0) {
                    empty.push([i, j]);
                }
            }
        }
        if (empty.length > 0) {
            return empty;
        } else {
            return -1;
        }
    }

    this.popEmptyTile = function() {

        var emptyTiles = getEmptyTiles(this.tilesX, this.tilesY, this.tiles);
        var rp = Math.floor(Math.random() * 2) + 1;
        var randTile = new Tile(this.base, rp);
        if (emptyTiles != -1) {
            var randEmpty = Math.floor(Math.random() * emptyTiles.length);
            this.tiles[emptyTiles[randEmpty][0]][emptyTiles[randEmpty][1]] = randTile;
        }

    }
    this.canMoveTile = function(x, y, dir) {
        var ret = false;
        switch (dir) {
            case "N":
                if (this.tiles[x][y - 1].power == 0 && this.tiles[x][y].power > 0) {
                    ret = true;
                }
                break;
            case "S":
                if (this.tiles[x][y + 1].power == 0 && this.tiles[x][y].power > 0) {
                    ret = true;
                }
                break;
            case "E":
                if (this.tiles[x + 1][y].power == 0 && this.tiles[x][y].power > 0) {
                    ret = true;
                }
                break;
            case "W":
                if (this.tiles[x - 1][y].power == 0 && this.tiles[x][y].power > 0) {
                    ret = true;
                }
                break;
        }

        return ret;
    }
    this.canCombine = function(x, y, dir) {
        var ret = false;
        switch (dir) {
            case "N":
                if (this.tiles[x][y - 1].power == this.tiles[x][y].power && this.tiles[x][y].power > 0) {
                    ret = true;
                }
                break;
            case "S":
                if (this.tiles[x][y + 1].power == this.tiles[x][y].power && this.tiles[x][y].power > 0) {
                    ret = true;
                }
                break;
            case "E":
                if (this.tiles[x + 1][y].power == this.tiles[x][y].power && this.tiles[x][y].power > 0) {
                    ret = true;
                }
                break;
            case "W":
                if (this.tiles[x - 1][y].power == this.tiles[x][y].power && this.tiles[x][y].power > 0) {
                    ret = true;
                }
                break;
        }
        return ret;
    }
    this.moveTile = function(x, y, dir) {
        if (this.canMoveTile(x, y, dir)) {
            var dirs = this.dirNumMap.lookup(dir);
            this.tiles[x + dirs[0]][y + dirs[1]].power = this.tiles[x][y].power;
            this.tiles[x][y] = new Tile(this.base, 0);
            if ((x + dirs[0]) < this.tilesX - 1 && (x + dirs[0]) > 0 && (y + dirs[1]) > 0 && (y + dirs[1]) < this.tilesY - 1) {
                this.moveTile(x + dirs[0], y + dirs[1], dir);
            }
        } else {
            this.combineTile(x, y, dir);
        }
    }
    this.combineTile = function(x, y, dir) {
        if (this.canCombine(x, y, dir)) {
            var dirs = this.dirNumMap.lookup(dir);
            this.tiles[x + dirs[0]][y + dirs[1]].power += 1;
            this.score += this.tiles[x + dirs[0]][y + dirs[1]].value();
            this.tiles[x][y] = new Tile(this.base, 0);
            if ((x + dirs[0]) < this.tilesX - 1 && (x + dirs[0]) > 0 && (y + dirs[1]) > 0 && (y + dirs[1]) < this.tilesY - 1) {
                this.moveTile(x + dirs[0], y + dirs[1], dir);
            }
        }
    }

    this.update = function(dir) {
        if (getEmptyTiles(this.tilesX, this.tilesY, this.tiles) != -1) {
            var tilesMoved = false;
            switch (dir) {
                case "N":
                    for (var i = 0; i < this.tilesX; i++) {
                        for (var x = 0; x < this.tilesX; x++) {
                            for (var y = 1; y < this.tilesY; y++) {
                                if (this.canMoveTile(x, y, dir)) {
                                    tilesMoved = true;
                                }
                                this.moveTile(x, y, dir);
                            }
                        }
                    }
                    if (tilesMoved) {
                        this.popEmptyTile();
                    }
                    for (var i = 0; i < this.tilesX; i++) {
                        for (var x = 0; x < this.tilesX; x++) {
                            for (var y = this.tilesY - 1; y > 0; y--) {
                                this.combineTile(x, y, dir);
                            }
                        }
                    }
                    break;
                case "S":
                    for (var i = 0; i < this.tilesX; i++) {
                        for (var x = 0; x < this.tilesX; x++) {
                            for (var y = this.tilesY - 2; y >= 0; y--) {
                                if (this.canMoveTile(x, y, dir)) {
                                    tilesMoved = true;
                                }
                                this.moveTile(x, y, dir);
                            }
                        }
                    }
                    if (tilesMoved) {
                        this.popEmptyTile();
                    }
                    for (var i = 0; i < this.tilesX; i++) {
                        for (var x = 0; x < this.tilesX; x++) {
                            for (var y = 0; y < this.tilesY - 1; y++) {
                                this.combineTile(x, y, dir);
                            }
                        }
                    }
                    break;
                case "E":
                    for (var i = 0; i < this.tilesX; i++) {
                        for (var x = this.tilesX - 2; x >= 0; x--) {
                            for (var y = 0; y < this.tilesY; y++) {
                                if (this.canMoveTile(x, y, dir)) {
                                    tilesMoved = true;
                                }
                                this.moveTile(x, y, dir);
                            }
                        }
                    }
                    if (tilesMoved) {
                        this.popEmptyTile();
                    }
                    for (var i = 0; i < this.tilesX; i++) {
                        for (var x = 0; x < this.tilesX - 1; x++) {
                            for (var y = 0; y < this.tilesY; y++) {
                                this.combineTile(x, y, dir);
                            }
                        }
                    }
                    break;
                case "W":
                    for (var i = 0; i < this.tilesX; i++) {
                        for (var x = 1; x < this.tilesX; x++) {
                            for (var y = 0; y < this.tilesY; y++) {
                                if (this.canMoveTile(x, y, dir)) {
                                    tilesMoved = true;
                                }
                                this.moveTile(x, y, dir);
                            }
                        }
                    }
                    if (tilesMoved) {
                        this.popEmptyTile();
                    }
                    for (var i = 0; i < this.tilesX; i++) {
                        for (var x = this.tilesX - 1; x > 0; x--) {
                            for (var y = 0; y < this.tilesY; y++) {
                                this.combineTile(x, y, dir);
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        } else {
			g.pause();
        }
    }

    this.draw = function() {
        for (var i = 0; i < this.tilesX; i++) {
            for (var j = 0; j < this.tilesY; j++) {
                ctx.strokeSyle = "#F0F0F0";
                ctx.fillStyle = tileColors.lookup(this.tiles[i][j].power);
                ctx.beginPath();
                ctx.rect(this.tileWidth * i, this.tileHeight * j, this.tileWidth, this.tileHeight);
                ctx.fill();
                ctx.lineWidth = 5;
                ctx.stroke();
                if (this.tiles[i][j].power > 0) {
                    ctx.lineWidth = 2;
                    ctx.font = "45px Times";
                    ctx.strokeStyle = "#000000";
                    ctx.strokeText(this.tiles[i][j].value().toString(), this.tileWidth * i + (this.tileWidth / 2) - (45 / 2), this.tileHeight * j + (this.tileHeight / 2) + (45 / 2));
                }

            }
        }
    }

    function Tile(base, power) {
        this.base = base;
        this.value = function() {
            return Math.pow(this.base, this.power);
        }
        this.power = power;
    }


}