import '../styles/addHabitForm.css';
import HabitForm from './HabitForm';

const AddHabit = ({addHabit, habits}) => {

    const addHabitSubmit = (habitName, startTime, endTime) => {

        const newHabit = {
            id: Math.round(Math.random()*100000000),
            habitName: habitName,
            startTime: startTime,
            endTime: endTime
        }
        
        addHabit('http://localhost:3000/habits', newHabit);

    }

    return ( 
        <div 
        id='add-habit-form'
        className='offcanvas offcanvas-start'
        tabIndex="-1">
            <div className='offcanvas-header'>
                <h5 className='offcanvas-title'>Add New Habit</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className='offcanvas-body'>

                <HabitForm onSubmit={addHabitSubmit} />

            </div>
        </div>
            
    );
}
 
export default AddHabit;