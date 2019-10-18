
import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {range, inRange} from 'lodash';
import DraggableBox from '../../../Components/DraggableBox';

import './Home.scss';

const MAX = 15;
const WIDTH = 60;


const Home = () => {
  const items = range(MAX);
  const selected = [];
  const [state, setState] = useState({
    order: items,
    dragOrder: items, // items order while dragging
    draggedIndex: null,
    selected,
  });
	
  const handleDrag = useCallback(({translation, id}) => {
      if(translation.y > 200) {
        if(selected.indexOf(id) === -1){
          const newSelected = selected;
          newSelected.push(id);
          setState({...state, selected: [...newSelected]});
          items.splice(items.indexOf(id),1);
        }
      console.log(items);
      const delta = Math.round(translation.x / WIDTH);
      const index = state.order.indexOf(id);
      const dragOrder = state.order.filter(index => index !== id);
      
      /* if (!inRange(index + delta, 0, items.length)) {
        return;
      } */
      
      dragOrder.splice(index + delta, 0, id);
      
      setState(state => ({
        ...state,
        order: items,
        draggedIndex: id,
        dragOrder
      }));
    }
  }, [state.order, items.length, selected.length]);
	
  const handleDragEnd = useCallback(() => {
    setState(state => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null
    }));
  }, []);
	
  return (
    <>
    <Container className="container">
      {items.map(index => {
        const isDragging = state.draggedIndex === index;
        const left = index * (WIDTH + 10);
        const draggedTop = state.order.indexOf(index) * (WIDTH + 10);
				
        return (
          <DraggableBox
            key={index}
            id={index}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Rect
              isDragging={isDragging}
              left={isDragging ? draggedTop : left}
            >
             {index}
            </Rect>
          </DraggableBox>
        );
      })}
    </Container>
    <Container className="container">
      {selected.map(index => {
        const isDragging = state.draggedIndex === index;
        const left = state.dragOrder.indexOf(index) * (WIDTH + 10);
        const draggedTop = state.order.indexOf(index) * (WIDTH + 10);
				
        return (
          <DraggableBox
            key={index}
            id={index}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Rect
              isDragging={isDragging}
              left={isDragging ? draggedTop : left}
              selected={true}
            >
             {index}
            </Rect>
          </DraggableBox>
        );
      })}
    </Container>
    </>
  );
};

export default Home;


const Container = styled.div`
  width: ${5 * (WIDTH + 10)}px;
  height: 100px;
`;

const Rect = styled.div.attrs(props => ({
  style: {
    transition: props.isDragging ? 'none' : 'all 500ms'
  }
}))`
  height: 100px;
  user-select: none;
  width: ${WIDTH}px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: ${({left}) => left}px;
  top: ${({selected}) => selected ? 100 : 0}px;
  font-size: 20px;
  color: #777;
`;