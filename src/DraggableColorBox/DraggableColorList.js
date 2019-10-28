import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = SortableContainer(({ colors, deleteColorHandler }) => (
  <div style={{ height: "100%" }}>
    {colors.map((c, i) =>
      <DraggableColorBox
        key={c.color}
        index={i}
        deleteColorHandler={() => deleteColorHandler(c.name)}
        color={c.color}
        name={c.name}
      />
    )}
  </div>
));

export default DraggableColorList;