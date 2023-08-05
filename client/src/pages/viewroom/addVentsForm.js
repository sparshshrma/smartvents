import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../uservents.module.css';

const AddVent = (props) => {
  const [ventData, setventData] = useState([]);
  const [name, setName] = useState('');
  const [deviceID, setdeviceID] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(props.isModalOpen);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://smart-vents-api.onrender.com/vents", {
        name: name,
        deviceID: deviceID,
      });
      console.log("response", response);
      if (response?.data?. deviceID) {
        // Vent added successfully
        console.log('Vent added to the database');
        // Reset the form fields
        setName('');
        setdeviceID('');
        props.callback(response.data)
      } else {
        // Error adding the vent
        console.error('Error adding the vent');
      }
    } catch (error) {
      console.error('An error occurred while adding the vent', error);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://smart-vents-api.onrender.com/vents${id}`);
      const updatedVents = ventData.filter((vent) => vent.id !== id);
      setventData(updatedVents);


    } catch (error) {
      console.error('Error deleting vent:', error);
    }
  };


  //View vents
  useEffect(() => {
    const fetchVentData = async () => {
      try {
        const response = await axios.get('https://smart-vents-api.onrender.com/vents');
        const data = response.data;
        setventData(data);
      } catch (error) {
        console.error('Error fetching vent data:', error);
      }
    };

    fetchVentData();

  }, []);

  //HTML
  return (
    <div>
      {isModalOpen && (
        <div className={styles.modalBackground}>
          <div className={styles.modal}>
            <h1>Add Vent</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
              </label>
              <br/>
              <label>
                Device ID:
                <input type="number" value={deviceID} onChange={(e) => setdeviceID(e.target.value)} required/>
              </label>
              <br/>

              <br/>
              <button type="submit">Add Vent</button>
              <button type="button" onClick={props.closeModal}>Cancel</button>
            </form>
            

          </div>
        </div>
      )}
    </div>

  );
};

export default AddVent;
