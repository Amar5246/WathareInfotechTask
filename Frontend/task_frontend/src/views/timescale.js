import React, { useState, useEffect } from 'react';
import '../css/timescale.css'; // Import CSS for styling
import { fetchData } from '../services/dataService';

const TimeScale = () => {
  const [duration, setDuration] = useState('1hr'); // State to track selected duration
  const [data, setData] = useState([]); 
  const [startTime,setStartTime] = useState("2024-01-21T15:");
  useEffect(() => {
    fetchData(startTime)
      .then((data) => {
        console.log(data);
        setData([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [duration,startTime]);
  // Calculate segment width based on number of data points
  const segmentWidth = 100 / data.length;

  // Function to handle duration change
  const handleDurationChange = (newDuration) => {
    if(newDuration==="next")
    {
      setStartTime("2024-01-21T16:")
    } 
    else if(newDuration==="8hr"){
      setStartTime("2024-01-21")
    }
  };

  return (
    <div>
      {/* Controller bar */}
      <div className="controller-bar">
        <span className="title">Machine Status Scale</span>
        <select value={duration} onChange={(e) => handleDurationChange(e.target.value)}>
          <option value="1hr">1 Hour</option>
          <option value="8hr">8 Hours</option>
          <option value="1week">1 Week</option>
          <option value="1month">1 Month</option>
        </select>
        <button onClick={() => handleDurationChange('previous')}>&lt;</button>
        <button onClick={() => handleDurationChange('next')}>&gt;</button>

      </div>

      {/* Time scale */}
      <div className="time-scale-container">
        <div className="time-scale">
          {/* Map over machine status data to render colored segments */}
          {data && data.map((data, index) => (
            <div
              key={index}
              className={`segment segment-${data.machine_status === 0 ? '0' : data.machine_status === 1 ? '1' : 'missing'}`}
              style={{ width: `${segmentWidth}%`, left: `${index * segmentWidth}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeScale;
