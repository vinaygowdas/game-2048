import React from 'react';

const Tile = ({ tile }) => {
    let classes = ["tile"];
    classes.push(`tile${tile.value}`);
    !tile.mergedInto ? classes.push(`position_${tile.row}_${tile.column}`) : classes.push('merged');
    if (tile.isNew()) {
        classes.push('new');
    }
    if (tile.hasMoved()) {
        classes.push(`row_from_${tile.fromRow()}_to_${tile.toRow()}`);
        classes.push(`column_from_${tile.fromColumn()}_to_${tile.toColumn()}`);
        classes.push('isMoving');
    }
    return (
        <span className={classes.join(' ')}>
            {tile.value}
        </span>
    );
}

export default Tile;
