import { useState, useEffect } from "react";

const WakeAndSleepModal = ({ updateWakeAndSleep, wakeAndSleep }) => {

    const [wakeTime, setWakeTime] = useState();
    const [sleepTime, setSleepTime] = useState();

    const wakeAndSleepLocal = e => {
        e.preventDefault();
        updateWakeAndSleep(wakeTime, sleepTime);
    }

    useEffect(() => {
        if(wakeAndSleep){
            setWakeTime(wakeAndSleep.wakeTime);
            setSleepTime(wakeAndSleep.sleepTime);
        }
    }, [])

    return ( 
        <div id="wake-and-sleep-modal" className="modal fade" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Set Wake & Sleep</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={wakeAndSleepLocal}>
                        <div className="mb-3">
                            <label className="form-label">Wake Time</label>
                            <input type="time" className="form-control" id="wake-time-input" value={wakeTime} onChange={e => setWakeTime(e.target.value)}></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Sleep Time</label>
                            <input type="time" className="form-control" id="sleep-time-input" value={sleepTime} onChange={e => setSleepTime(e.target.value)}></input>
                        </div>
                        <button className="btn btn-primary" data-bs-dismiss="modal" type="submit">Save Changes</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
     );
}
 
export default WakeAndSleepModal;