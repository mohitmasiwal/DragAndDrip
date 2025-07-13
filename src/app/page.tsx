 'use client';

import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { store } from './store/store';
import { setLayout, deleteBlock } from './store/layoutSlice';
import BlockRenderer from './blocks/BlockRenderer';
import type { RootState } from './store/store';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import './styles/global.css';

type BlockType = 'HeroBlock' | 'TwoColumnRow' | 'ImageGrid';

interface LayoutItem {
  type: BlockType;
  data: any;
}

const DEFAULT_BLOCKS: Record<BlockType, any> = {
  HeroBlock: {
    heading: 'Welcome to Hero',
    subtitle: 'This is your hero block',
    ctaText: 'Get Started',
    backgroundImage: { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1350&q=80' },
  },
  TwoColumnRow: {
    heading: 'About Us',
    subtitle: 'We provide amazing services',
    ctaText: 'Learn More',
    image: { url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80' },
  },
  ImageGrid: [
    { image: { url: 'https://source.unsplash.com/random/200x200?tech' } },
    { image: { url: 'https://source.unsplash.com/random/200x200?code' } },
    { image: { url: 'https://source.unsplash.com/random/200x200?app' } },
    { image: { url: 'https://source.unsplash.com/random/200x200?device' } },
  ],
};

const BLOCKS: BlockType[] = ['HeroBlock', 'TwoColumnRow', 'ImageGrid'];

function UIEditor() {
  const dispatch = useDispatch();
  const layout = useSelector((state: RootState) => state.layout.present) as LayoutItem[];

  useEffect(() => {
    const initialLayout: LayoutItem[] = [
      { type: 'HeroBlock', data: DEFAULT_BLOCKS.HeroBlock },
      { type: 'TwoColumnRow', data: DEFAULT_BLOCKS.TwoColumnRow },
    ];
    dispatch(setLayout(initialLayout));
  }, [dispatch]);

  const addBlock = (block: BlockType) => {
    const newBlock: LayoutItem = { type: block, data: DEFAULT_BLOCKS[block] };
    dispatch(setLayout([...layout, newBlock]));
  };

  const handleDelete = (index: number) => {
    dispatch(deleteBlock(index));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newLayout = Array.from(layout);
    const [moved] = newLayout.splice(source.index, 1);
    newLayout.splice(destination.index, 0, moved);

    dispatch(setLayout(newLayout));
  };

  const undo = () => dispatch(UndoActionCreators.undo());
  const redo = () => dispatch(UndoActionCreators.redo());

  return (
    <div style={{ padding: '2rem', background: '#0f172a', minHeight: '100vh' }}>
      <img
        src="https://images.unsplash.com/photo-1612831455546-1f6cbbf8e940?auto=format&fit=crop&w=1600&q=80"
        alt="banner"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '12px',
          marginBottom: '2rem',
        }}
      />

      <h1 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>
        🎨 Landing Page UI Builder
      </h1>

      <div style={{ marginBottom: '1.5rem' }}>
        {BLOCKS.map((block: BlockType) => (
          <button key={block} onClick={() => addBlock(block)}>
            ➕ Add {block}
          </button>
        ))}
        <button onClick={undo}>↩️ Undo</button>
        <button onClick={redo}>↪️ Redo</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="layout">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {layout.map((block, index) => (
                <Draggable key={index} draggableId={`block-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        marginBottom: '1rem',
                        padding: '1rem',
                        background: '#1e293b',
                        borderRadius: '6px',
                        color: '#f8fafc',
                        position: 'relative',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        ...provided.draggableProps.style,
                      }}
                    >
                      <BlockRenderer type={block.type} data={block.data} />
                      <button
                        onClick={() => handleDelete(index)}
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.3rem 0.6rem',
                          cursor: 'pointer',
                        }}
                      >
                        ❌ Delete
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default function Page() {
  return (
    <Provider store={store}>
      <UIEditor />
    </Provider>
  );
}
