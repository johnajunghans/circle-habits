import '../styles/edithabits.css';
import { useState } from 'react';
import HabitForm from './HabitForm';

const EditHabits = ({habits, editHabit, deleteAllHabits, deleteSingleHabit}) => {

    // STATE

    const [showEditHabit, setShowEditHabit] = useState(false);
    const [habitId, setHabitId] = useState(null);

    // FUNCTIONS

    const editHabits = (habitName, startTime, endTime) => {
        
        console.log(habitId);

        const editedHabit = {
            id: habitId,
            habitName: habitName,
            startTime: startTime,
            endTime: endTime
        }

        editHabit(editedHabit, "accordion");

        setShowEditHabit(false);
        setHabitId(null);   
    }

    const deleteSingleHabitLocal = (habitId) => {
        deleteSingleHabit(habitId);
    }

    const deleteAllHabitsLocal = () => {
        deleteAllHabits();
    }

    return ( 
        <div
        id="edit-habits-form"
        className="offcanvas offcanvas-end"
        tabIndex="-1">
            <div className='offcanvas-header'>
                    <h5 className='offcanvas-title'>Edit Habits</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            
            <div className="offcanvas-body">
            <h6>List of Active Habits</h6>
            <hr></hr>
            <div className="accordion" id="edit-habits-accordion">

                {habits.map( habit => (
                    <div className="accordion-item" key={habit.id}>
                        <h2 className="accordion-header">
                            <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#habit-${habit.id}`}
                            aria-expanded="false"
                            >{habit.habitName} {`(${habit.startTime} - ${habit.endTime})`}</button>
                        </h2>
                        <div
                        id={`habit-${habit.id}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#edit-habits-accordion"
                        >
                            <div className="accordion-body">
                                
                            {!showEditHabit && <button
                            className='btn btn-warning'
                            onClick={() => setShowEditHabit(true)}
                            >Edit Habit</button>}

                            {showEditHabit && <HabitForm
                            habit={habit}
                            onSubmit={editHabits}
                            onClick={() => setHabitId(habit.id)} 
                            closeFunction={() => setShowEditHabit(false)}/>}
                            
                            {!showEditHabit && <button
                            className='btn btn-danger'
                            onClick={() =>
                                deleteSingleHabitLocal(habit.id)}
                            >Delete Habit</button>}

                            </div>    
                        </div>
                    </div>  
                ))}
                
            </div>
            <hr></hr>
            {/* <button
                className='btn btn-danger'
                id='delete-habits'
                onClick={deleteAllHabitsLocal}
                >Delete All Habits</button> */}
            </div>
        </div>
     );
}
 
export default EditHabits;