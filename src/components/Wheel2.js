import '../styles/wheel2.css';
import AddHabit from './AddHabit';
import EditHabits from './EditHabits';
import WakeAndSleepModal from './WakeAndSleepModal';
import Toolbar from './Toolbar';
import { useState, useEffect, useCallback, useRef } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import * as d3 from 'd3'; // Add D3 import

// Add this function to convert time to radians for D3
const timeToRadians = (time) => {
    let hour = Number(time.slice(0, 2));
    let min = Number(time.slice(3, 5));
    let rawTime = hour + min / 60;
    return (rawTime * 15 - 180) * (Math.PI / 180); // Convert to radians
  };

const Wheel2 = () => {

    // STATE using localStorage hook
    const [habits, setHabits] = useLocalStorage('habits', []);
    const [wakeAndSleep, setWakeAndSleep] = useLocalStorage('wakeAndSleep', {
        wakeTime: "",
        sleepTime: ""
    });
    const [wheelDiam, setWheelDiam] = useState(0);

    // UPDATE WAKE AND SLEEP TIMES
    const updateWakeAndSleep = (wakeTime, sleepTime) => {
        setWakeAndSleep({
            wakeTime: wakeTime,
            sleepTime: sleepTime
        });
    }

    // ADD HABIT
    const addHabit = useCallback((url, habit) => {        
        setHabits((prevHabits) => [...prevHabits, habit]);
    }, [setHabits]);

    // EDIT HABIT
    const editHabit = (editedHabit, loc) => {
        let habitId = loc === "accordion" ? editedHabit.id : modalHabitId;
        
        const habitsMap = habits.map(habit => {
            if(habit.id === habitId){
                return {
                    id: habitId,
                    habitName: editedHabit.habitName,
                    startTime: editedHabit.startTime,
                    endTime: editedHabit.endTime
                }
            }
            return habit;
        });
        setHabits(habitsMap);
    }

    // DELETE SINGLE HABIT
    const deleteSingleHabit = (habitId) => {
        setHabits(habits.filter(habit => habit.id !== habitId));
    }

    // DELETE ALL HABITS
    const deleteAllHabits = () => {
        setHabits([]);
    }

    // MODAL FUNCTIONS
    let modalHabitId;
    let modalHabitName = "Edit Habit";
    const updateHabitId = (e) => {
        modalHabitId = JSON.parse(e.target.getAttribute('data')).id;
        modalHabitName = JSON.parse(e.target.getAttribute('data')).habitName;
    }
    
//---------------------------WHEEL VARIABLES---------------------------//
    const wheelWrapper = useRef(0);
    let SW = window.innerWidth;
    let wheelRadius = wheelDiam/2;

    const greyLines = [
        {rot: "0deg", id: 0, style: "bold"},
        {rot: "15deg", id: 1, style: "light"},
        {rot: "30deg", id: 2, style: "light"},
        {rot: "45deg", id: 3, style: "bold"},
        {rot: "60deg", id: 4, style: "light"},
        {rot: "75deg", id: 5, style: "light"},
        {rot: "90deg", id: 6, style: "bold"},
        {rot: "105deg", id: 7, style: "light"},
        {rot: "120deg", id: 8, style: "light"},
        {rot: "135deg", id: 9, style: "bold"},
        {rot: "150deg", id: 10, style: "light"},
        {rot: "165deg", id: 11, style: "light"}
    ]

    const timeMarkers = [
        {time: "6 AM", rot: 0},
        {time: "9 AM", rot: 45},
        {time: "12 PM", rot: 90},
        {time: "3 PM", rot: 135},
        {time: "6 PM", rot: 180},
        {time: "9 PM", rot: 225},
        {time: "12 AM", rot: 270},
        {time: "3 AM", rot: 315}
    ]
    
    //----------------WHEEL RENDERING FUNCTIONS------------------//

    useEffect(() => {
        const rawTime = time => {
            let hour = Number(time.slice(0, 2));
            let min = Number(time.slice(3,5));
            let rawTime = hour*60+min;
            return rawTime;
        }
        setHabits(habits.sort((a,b) => {
            if ( rawTime(a.startTime) < rawTime(b.startTime) ){
                return -1;
            }
            if ( rawTime(a.startTime) > rawTime(b.startTime) ){
                return 1;
            }
            return 0;
        }))
    }, [])
    useEffect(() => {
        console.log(wheelWrapper.current.offsetWidth);
        setWheelDiam(wheelWrapper.current.offsetWidth*0.75)
        const handleResize = () => {
            setWheelDiam(wheelWrapper.current.offsetWidth*0.75)
            // SW = window.innerWidth;
            // if(SW < 400){
            //     setWheelDiam(340);
            // }
            // if(SW > 1060){
            //     setWheelDiam(800)
            // } else {
            //     setWheelDiam(window.innerWidth*0.75)
            // }
            
        }
        window.addEventListener('resize', handleResize);
    }, [])

    function timeToRotation(time){ 
        let hour = Number(time.slice(0, 2));
        let min = Number(time.slice(3,5));
        let rawTime = hour*1+min/60;
        return rawTime*15-90;
    }

    function timeToCoordinate(time){
        let angle = timeToRotation(time)*Math.PI/180;
        return [wheelRadius*(1-Math.cos(angle)), wheelRadius*(1-Math.sin(angle))];
    }

    //Clock Functionality
    const hourHand = useRef();
    const clock = () => {
        const now = new Date();
        const hour = now.getHours().toString();
        const min = now.getMinutes().toString();
        let time = hour+':'+min;
        let timeRot = timeToCoordinate(time);
        //hourHand.current.setAttribute('d', `M ${wheelRadius} ${wheelRadius} L ${timeRot[0]} ${timeRot[1]}`)
        return timeRot;
    } 
    setInterval(clock, 1000);

//-----------------------RETURN---------------------------//

    return ( 
        <>
        <Toolbar wheelDiam={wheelDiam} setWheelDiam={setWheelDiam} />
        <div id='wheel-wrapper' ref={wheelWrapper}>
            <div id='wheel-outer-circle'
            style={{
                width: wheelDiam*1.1,
                height: wheelDiam*1.1
            }}
            >
            
            {timeMarkers.map( marker => (
                <div
                key={timeMarkers.indexOf(marker)}
                className='time-markers'
                style={{
                    width: wheelRadius,
                    left: "0px",
                    transform: `rotate(${marker.rot}deg) translate(${wheelDiam*0.025}px, ${wheelDiam*0.033}px)`,
                    transformOrigin: `${wheelDiam*1.1/2}px`
                }}
                ><div
                style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "left",
                    width: wheelRadius/4,
                    fontSize: wheelRadius/18
                }}
                >{marker.time}</div></div>
            ))}
            
            <div id='wheel-circle'
            style={{
                width: wheelDiam+4,
                height: wheelDiam+4
            }}>

            <svg id='svg' style={{
                width: wheelDiam,
                height: wheelDiam,
                position: "absolute"
            }}>

                <path
                    ref={hourHand}
                    d = {
                    `M ${wheelRadius} ${wheelRadius} L ${clock()[0]} ${clock()[1]}`}   
                    className='grey-lines'
                    id='hour-hand'
                ></path>

                {greyLines.map( line => (
                    <path
                    d={`M 0 ${wheelRadius} L ${wheelDiam} ${wheelRadius}`}  key={line.id} 
                    className={`grey-lines ${line.style}`}
                    style={{
                        transform: `rotate(${line.rot})`,
                        transformOrigin: `${wheelRadius}px ${wheelRadius}px`
                    }}
                    ></path>
                ))}

                <g id='habits-container'>
                    {habits.map(habit => {
                    const arcGenerator = d3.arc()
                        .innerRadius(0)
                        .outerRadius(wheelRadius)
                        .startAngle(timeToRadians(habit.startTime))
                        .endAngle(timeToRadians(habit.endTime))
                        .cornerRadius(5); // Small corner radius

                    return (
                        <g className='habit-wrapper' key={habit.id}>
                            <path
                                d={arcGenerator()}
                                role='button' // Will define the path as a button
                                tabIndex={0} // Will make the path focusable
                                aria-label={`Edit habit: ${habit.habitName} from ${habit.startTime} to ${habit.endTime}`} // Will add an aria-label to the path
                                className='habit-path'
                                data-bs-toggle="offcanvas" // Will open the offcanvas when the path is clicked
                                data-bs-target="#edit-habits-form" // Will open the offcanvas with the id edit-habits-form
                                transform={`translate(${wheelRadius}, ${wheelRadius})`}
                            />
                            <text
                                x={(timeToCoordinate(habit.startTime)[0] + timeToCoordinate(habit.endTime)[0]) / 2}
                                y={(timeToCoordinate(habit.startTime)[1] + timeToCoordinate(habit.endTime)[1]) / 2 + (wheelRadius / 16 / 3)}
                                className='habit-name'
                                style={{
                                    transform: `rotate(${(timeToRotation(habit.startTime) + timeToRotation(habit.endTime)) / 2}deg)`,
                                    transformOrigin: `${(timeToCoordinate(habit.startTime)[0] + timeToCoordinate(habit.endTime)[0]) / 2}px ${(timeToCoordinate(habit.startTime)[1] + timeToCoordinate(habit.endTime)[1]) / 2}px`,
                                    fontSize: wheelRadius / 20
                                }}
                                >
                            {habit.habitName}
                            </text>
                        </g>
                    );
                    })}
                </g>

                {wakeAndSleep && <path
                    id='sleep-path'
                    className='habit-path'
                    d={`
                    M ${wheelRadius} ${wheelRadius} 
                    L ${timeToCoordinate(wakeAndSleep.sleepTime)[0]} ${timeToCoordinate(wakeAndSleep.sleepTime)[1]}
                    A ${wheelRadius} ${wheelRadius} 1 0 1
                    ${timeToCoordinate(wakeAndSleep.wakeTime)[0]} ${timeToCoordinate(wakeAndSleep.wakeTime)[1]} z
                    `}
                ></path>}
                
                {/* {wakeAndSleep.wakeTime && <path
                    d={`M ${wheelRadius} ${wheelRadius} L ${timeToCoordinate(wakeAndSleep.wakeTime)[0]} ${timeToCoordinate(wakeAndSleep.wakeTime)[1]}`}  
                    id='wake-line'
                ></path>}

                {wakeAndSleep.sleepTime && <path
                    d={`M ${wheelRadius} ${wheelRadius} L ${timeToCoordinate(wakeAndSleep.sleepTime)[0]} ${timeToCoordinate(wakeAndSleep.sleepTime)[1]}`}  
                    id='sleep-line'
                ></path>} */}

            </svg>

            {/* <button
                id='add-habit-button'
                data-bs-toggle="offcanvas"
                data-bs-target="#add-habit-form"
                style={{
                    width: wheelDiam*1/8,
                    height: wheelDiam*1/8,
                    fontSize: wheelDiam*1/12
                }}>    
                +</button> */}

            <div id='inner-wheel-circle'
            style={{
                width: wheelDiam*1/3,
                height: wheelDiam*1/3
            }}
            ></div>

            </div>
            </div>

            <AddHabit addHabit={addHabit} habits={habits}/>

            <EditHabits deleteSingleHabit={deleteSingleHabit} deleteAllHabits={deleteAllHabits} habits={habits} editHabit={editHabit}/>

            <WakeAndSleepModal updateWakeAndSleep={updateWakeAndSleep} wakeAndSleep={wakeAndSleep}/>

            {/* <EditModal editHabit={editHabit} modalHabitName={modalHabitName} /> */}

        </div>
        </>
     );
}

export default Wheel2;