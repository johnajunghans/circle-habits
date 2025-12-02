import { useState, useEffect } from "react";

const HabitForm = ({ habit, closeFunction, onSubmit, onClick, closeButton=true }) => {

    const [habitName, setHabitName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const formReset = () => {
        setHabitName('');
        setStartTime('');
        setEndTime('');
    }

    const habitSubmit = (e) => {
        e.preventDefault();

        onSubmit(habitName, startTime, endTime);

        formReset();
    }

    useEffect(() => {
        if(habit){
            setHabitName(habit.habitName);
            setStartTime(habit.startTime);
            setEndTime(habit.endTime);
        }
    }, [])

    return ( 
        <form onSubmit={habitSubmit}>
            <label className='form-label'>Name</label>
            <div className='mb-3'>
                <input 
                type='text' 
                id='habit-name-input'
                placeholder='Habit Name' 
                className='form-control'
                onChange={e => setHabitName(e.target.value)}
                value={habitName}
                required
                ></input>
            </div>
            
            <label className='form-label'>From</label>
            <div className="input-group mb-3">  
                <input 
                id='start-hour-input' 
                type="time" 
                className="form-control" 
                 
                aria-label="start-hour"
                onChange={e => setStartTime(e.target.value)}
                value={startTime}
                required
                ></input>
            </div>
            <label className='form-label'>To</label>
            <div className="input-group mb-3">
                <input 
                id='end-hour-input' 
                type="time" 
                className="form-control" 
                placeholder="Hour" 
                aria-label="end-hour"
                onChange={e => setEndTime(e.target.value)}
                value={endTime}
                required
                ></input>
            </div>
            <button 
            id='add-habit-form-submit'
            type="submit" 
            className="btn" 
            onClick={onClick}
            >Submit</button>

           {closeButton && <button
            className='btn'
            onClick={closeFunction}
            >Close</button>}

        </form>    
     );
}
 
export default HabitForm;