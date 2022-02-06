var rotateLeft = function (matrix) {
    var rows = matrix.length;
    var columns = matrix[0].length;
    var res = [];
    for (var row = 0; row < rows; ++row) {
        res.push([]);
        for (var column = 0; column < columns; ++column) {
            res[row][column] = matrix[column][columns - row - 1];
        }
    }
    return res;
};

class Tile {
    constructor(value, row, column) {
        this.value = value || 0;
        this.row = row || -1;
        this.column = column || -1;
        this.oldRow = -1;
        this.oldColumn = -1;
        this.markForDeletion = false;
        this.mergedInto = null;
        this.id = this.id++ || 0;
    }
    moveTo(row, column) {
        this.oldRow = this.row;
        this.oldColumn = this.column;
        this.row = row;
        this.column = column;
    }
    isNew() {
        return this.oldRow === -1 && !this.mergedInto;
    }
    hasMoved() {
        return (
            (this.fromRow() !== -1 && (this.fromRow() !== this.toRow() || this.fromColumn() !== this.toColumn())) ||
            this.mergedInto
        );
    }
    fromRow() {
        return this.mergedInto ? this.row : this.oldRow;
    }
    fromColumn() {
        return this.mergedInto ? this.column : this.oldColumn;
    }
    toRow() {
        return this.mergedInto ? this.mergedInto.row : this.row;
    }
    toColumn() {
        return this.mergedInto ? this.mergedInto.column : this.column;
    }
}

class Grid {
    constructor(size, winScore) {
        this.tiles = [];
        this.tileBlocks = [];
        this.score = 0;
        this.size = size;
        this.winScore = winScore;
        this.fourProbability = 0.1;
        this.deltaX = [-1, 0, 1, 0];
        this.deltaY = [0, -1, 0, 1];
        for (var i = 0; i < this.size; ++i) {
            let tileArray = [];
            for (var j = 0; j < this.size; ++j) {
                tileArray.push(this.addTile());
            }
            this.tileBlocks[i] = tileArray;
        }
        this.addRandomTile();
        this.addRandomTile();
        this.setPositions();
        this.won = false;
    }
    addTile(args) {
        var res = new Tile(args);
        this.tiles.push(res);
        return res;
    }

    moveLeft() {
        var hasChanged = false;
        for (var row = 0; row < this.size; ++row) {
            var currentRow = this.tileBlocks[row].filter((tile) => tile.value !== 0);
            var resultRow = [];
            for (var target = 0; target < this.size; ++target) {
                var targetTile = currentRow.length ? currentRow.shift() : this.addTile();
                if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
                    var tile1 = targetTile;
                    targetTile = this.addTile(targetTile.value);
                    tile1.mergedInto = targetTile;
                    var tile2 = currentRow.shift();
                    tile2.mergedInto = targetTile;
                    targetTile.value += tile2.value;
                    this.score += tile1.value + tile2.value;
                }
                resultRow[target] = targetTile;
                this.won |= targetTile.value === this.winScore;
                hasChanged |= targetTile.value !== this.tileBlocks[row][target].value;
            }
            this.tileBlocks[row] = resultRow;
        }
        return hasChanged;
    }

    setPositions() {
        this.tileBlocks.forEach((row, rowIndex) => {
            row.forEach((tile, columnIndex) => {
                tile.oldRow = tile.row;
                tile.oldColumn = tile.column;
                tile.row = rowIndex;
                tile.column = columnIndex;
                tile.markForDeletion = false;
            });
        });
    }

    addRandomTile() {
        var emptyTileBlocks = [];
        for (var r = 0; r < this.size; ++r) {
            for (var c = 0; c < this.size; ++c) {
                if (this.tileBlocks[r][c].value === 0) {
                    emptyTileBlocks.push({ r: r, c: c });
                }
            }
        }
        var index = ~~(Math.random() * emptyTileBlocks.length);
        var tileBlock = emptyTileBlocks[index];
        var newValue = Math.random() < this.fourProbability ? 4 : 2;
        this.tileBlocks[tileBlock.r][tileBlock.c] = this.addTile(newValue);
    }

    move(direction) {
        // 0 -> left, 1 -> up, 2 -> right, 3 -> down
        this.clearOldTiles();
        for (var i = 0; i < direction; ++i) {
            this.tileBlocks = rotateLeft(this.tileBlocks);
        }
        var hasChanged = this.moveLeft();
        for (let i = direction; i < 4; ++i) {
            this.tileBlocks = rotateLeft(this.tileBlocks);
        }
        if (hasChanged) {
            this.addRandomTile();
        }
        this.setPositions();
        return this;
    }
    clearOldTiles() {
        this.tiles = this.tiles.filter((tile) => tile.markForDeletion === false);
        this.tiles.forEach((tile) => {
            tile.markForDeletion = true;
        });
    }
    hasWon() {
        return this.won;
    }
    hasLost() {
        var canMove = false;
        for (var row = 0; row < this.size; ++row) {
            for (var column = 0; column < this.size; ++column) {
                canMove |= this.tileBlocks[row][column].value === 0;
                for (var dir = 0; dir < 4; ++dir) {
                    var newRow = row + this.deltaX[dir];
                    var newColumn = column + this.deltaY[dir];
                    if (newRow < 0 || newRow >= this.size || newColumn < 0 || newColumn >= this.size) {
                        continue;
                    }
                    canMove |= this.tileBlocks[row][column].value === this.tileBlocks[newRow][newColumn].value;
                }
            }
        }
        return !canMove;
    }
}

export { Grid };
