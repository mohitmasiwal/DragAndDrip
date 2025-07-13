 // src/store/layoutSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import undoable from 'redux-undo';

interface LayoutItem {
  type: string;
  data: any;
}

const initialState: LayoutItem[] = [];

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout: (_, action: PayloadAction<LayoutItem[]>) => action.payload,

    deleteBlock: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1); // Remove block at index
    },
  },
});

export const { setLayout, deleteBlock } = layoutSlice.actions;
export default undoable(layoutSlice.reducer);
