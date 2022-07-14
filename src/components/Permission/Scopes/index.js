import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Example from './Example';
function Scopes({ ...props }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Example />
    </DndProvider>
  );
}

export default Scopes;
