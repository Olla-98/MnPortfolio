import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import '../styles/PomodoroTimer.css';

function PomodoroTimer(props) {
  // props: onPomodoroComplete, isDarkMode
  
  // state voor timer
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('work');
  
  // effect voor timer countdown
  useEffect(() => {
    // als timer niet loopt, doe niets
    if (isTimerRunning === false) {
      return;
    }
    
    // start interval
    const interval = setInterval(() => {
      // als er nog seconden over zijn
      if (timerSeconds > 0) {
        setTimerSeconds(timerSeconds - 1);
      } 
      // als seconden 0 zijn maar minuten nog over
      else if (timerMinutes > 0) {
        setTimerMinutes(timerMinutes - 1);
        setTimerSeconds(59);
      }
      // als beide 0 zijn
      else {
        handleTimerComplete();
      }
    }, 1000);
    
    // cleanup functie
    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, timerMinutes, timerSeconds]);
  
  // functie voor timer start/stop
  function toggleTimer() {
    setIsTimerRunning(!isTimerRunning);
  }
  
  // functie voor timer reset
  function resetTimer() {
    setIsTimerRunning(false);
    
    if (timerMode === 'work') {
      setTimerMinutes(25);
    } else {
      setTimerMinutes(5);
    }
    
    setTimerSeconds(0);
  }
  
  // functie als timer klaar is
  function handleTimerComplete() {
    setIsTimerRunning(false);
    
    if (timerMode === 'work') {
      // roep parent functie aan
      props.onPomodoroComplete();
      
      // wissel naar break
      setTimerMode('break');
      setTimerMinutes(5);
      setTimerSeconds(0);
      
      alert('🎉 Pomodoro voltooid! Tijd voor een pauze van 5 minuten.');
    } else {
      // terug naar werk
      setTimerMode('work');
      setTimerMinutes(25);
      setTimerSeconds(0);
      
      alert('⏰ Pauze voorbij! Tijd om weer te werken.');
    }
  }
  
  // functie om mode te wisselen
  function switchTimerMode(mode) {
    setIsTimerRunning(false);
    setTimerMode(mode);
    
    if (mode === 'work') {
      setTimerMinutes(25);
    } else {
      setTimerMinutes(5);
    }
    
    setTimerSeconds(0);
  }
  
  // functie om tijd te formatteren
  function formatTime(num) {
    let timeString = num.toString();
    if (timeString.length === 1) {
      timeString = '0' + timeString;
    }
    return timeString;
  }
  
  // bepaal classes
  let cardClass = 'card';
  if (props.isDarkMode) {
    cardClass = 'card dark';
  }
  
  let workButtonClass = 'mode-button';
  if (timerMode === 'work') {
    workButtonClass = 'mode-button active-work';
  }
  
  let breakButtonClass = 'mode-button';
  if (timerMode === 'break') {
    breakButtonClass = 'mode-button active-break';
  }
  
  let timerTimeClass = 'timer-time';
  if (timerMode === 'work') {
    timerTimeClass = 'timer-time work-color';
  } else {
    timerTimeClass = 'timer-time break-color';
  }
  
  let controlButtonClass = 'control-button';
  if (isTimerRunning) {
    controlButtonClass = 'control-button pause-button';
  } else {
    controlButtonClass = 'control-button play-button';
  }
  
  return (
    <div className={cardClass}>
      <h2 className="card-title">⏱ Pomodoro Timer</h2>
      
      <div className="timer-mode-buttons">
        <button
          onClick={() => switchTimerMode('work')}
          className={workButtonClass}
        >
          🎯 Werk (25m)
        </button>
        <button
          onClick={() => switchTimerMode('break')}
          className={breakButtonClass}
        >
          ☕ Pauze (5m)
        </button>
      </div>
      
      <div className="timer-display">
        <div className={timerTimeClass}>
          {formatTime(timerMinutes)}:{formatTime(timerSeconds)}
        </div>
        <p className="timer-status">
          {timerMode === 'work' ? 'Focus tijd! 🎯' : 'Ontspan even ☕'}
        </p>
      </div>
      
      <div className="timer-controls">
        <button
          onClick={toggleTimer}
          className={controlButtonClass}
        >
          {isTimerRunning ? (
            <>
              <Pause size={20} /> Pauzeer
            </>
          ) : (
            <>
              <Play size={20} /> Start
            </>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="reset-button"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
}

export default PomodoroTimer;