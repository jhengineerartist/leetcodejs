/**
 * @param {string[]} names
 * @param {number[]} columns
 */
var SQL = function (names, columns) {
    this.names = names;
    this.tableMap = new Map();

    for (let i = 0; i < names.length; i++) {
        this.tableMap.set(names[i], { nextId: 1, table: new Map(), numColumns: columns[i] });
    }
};

/** 
 * @param {string} name 
 * @param {string[]} row
 * @return {void}
 */
SQL.prototype.insertRow = function (name, row) {
    ({ nextId, table, numColumns } = this.tableMap.get(name));
    table.set(nextId, row);
    nextId++;
};

/** 
 * @param {string} name 
 * @param {number} rowId
 * @return {void}
 */
SQL.prototype.deleteRow = function (name, rowId) {
    ({ nextId, table, numColumns } = this.tableMap.get(name));
    this.tableMap.delete(rowId);
};

/** 
 * @param {string} name 
 * @param {number} rowId 
 * @param {number} columnId
 * @return {string}
 */
SQL.prototype.selectCell = function (name, rowId, columnId) {
    ({ nextId, table, numColumns } = this.tableMap.get(name));
    const row = table.get(rowId);
    return columnId === 0 ? rowId : row[columnId - 1];
};

/** 
 * Your SQL object will be instantiated and called as such:
 * var obj = new SQL(names, columns)
 * obj.insertRow(name,row)
 * obj.deleteRow(name,rowId)
 * var param_3 = obj.selectCell(name,rowId,columnId)
 */