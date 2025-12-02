import { useState } from 'react';
import '../styles/toolbar.css';

const Toolbar = ({ wheelDiam, setWheelDiam }) => {

    const [showWheelStyle, setShowWheelStyle] = useState(false);
    
    return ( 
        <div id="tool-wrapper">
            <div id='main-buttons'>

                <button
                className='btn'
                id='add-habit'
                data-bs-toggle="offcanvas"
                data-bs-target="#add-habit-form"
                >Add Habit</button>

                <button
                className='btn'
                id='edit-habits'
                data-bs-toggle="offcanvas"
                data-bs-target="#edit-habits-form"
                >Edit Habits</button>

                <button
                className='btn'
                data-bs-toggle='modal'
                data-bs-target='#wake-and-sleep-modal'
                >Wake & Sleep</button>

                {/* <button
                className='btn'
                id='show-wheel-style'
                onClick={() => {setShowWheelStyle(!showWheelStyle)}}
                style={{
                    background: showWheelStyle ? 'rgba(0,0,0,0.55)' : 'white',
                    color: showWheelStyle ? 'white' : 'black'
                }}
                >{!showWheelStyle ? "Wheel Styling" : "Hide"}</button> */}

            </div>
            {showWheelStyle && <div id='wheel-style'>
                <form>
                    <label className="form-label">Wheel Size</label>
                    <input 
                    type="range" 
                    className="form-range" 
                    id="wheel-size-range"
                    min="300"
                    max="1200"
                    step="10"
                    defaultValue={wheelDiam}
                    onInput={(e) => setWheelDiam(e.target.value)}
                    />
                </form>
            </div>}
        </div>
     );
}
 
export default Toolbar;