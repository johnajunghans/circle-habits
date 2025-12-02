import HabitForm from "./HabitForm";
import '../styles/editmodal.css';


const EditModal = ({ editHabit, modalHabitName }) => {   
    const editHabitLocal = (habitName, startTime, endTime) => {
    
        const editedHabit = {
            habitName: habitName,
            startTime: startTime,
            endTime: endTime
        }
    
        editHabit(editedHabit, "modal");

    }

    return (

        <div className="modal fade" id="edit-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">{modalHabitName}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                <HabitForm 
                onSubmit={editHabitLocal}
                closeButton={false}
                />

                </div>
                {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Understood</button>
                </div> */}
                </div>
            </div>
        </div>
        
    )
}
 
export default EditModal;