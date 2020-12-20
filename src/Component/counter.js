import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';

export default function Counter() {

    const counter = useSelector(state => state.singleCounter);
    const dispatch = useDispatch();

    // const doubleAdd = useSelector(state => state.doubleCounter);

    const singleCount = {
        float :'left',
        margin:'10px'
    }
    // const doubleCount = {
    //     float :'right',
    //     margin:'10px'
    // }
    return (
        <>
            <div style={singleCount}>
                <h3>Counter {counter}</h3>
                <Button color="primary" onClick={() => dispatch({ type: 'Increment' })}>+ 1</Button>
                <Button color="secondary" onClick={() => dispatch({ type: 'Decrement' })}>- 1</Button>
            </div>
            {/* <div style={doubleCount}>
                <h6>Task Double {doubleAdd}</h6>
                <Button color="primary" onClick={() => dispatch({ type: 'Double' })}>+ 2</Button>
            </div> */}
        </>
    );
}
