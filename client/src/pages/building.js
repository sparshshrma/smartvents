import React, {useEffect, useState} from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "@fortawesome/fontawesome-free/css/all.css";
import styles from "./uservents.module.css";
import axios from "axios";
import Link from "next/link";

import MysideNav from "../components/sideNav";

export default function Building(props) {
  const [buildingData, setBuildingData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [username, setUsername] = useState("");

  //update
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = token.body.user;
    setUsername(user);
    console.log("username", user);
  }, [])
  const handleClick = () => {
    setShowData(!showData);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const [name, setName] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [vent, setVent] = useState([]);

  const [floors, setFloors] = useState("");
  const [owner, setOwner] = useState("");

  // useEffect(() => {
  //   const fetchVents = async (id) => {
  //     try {
  //       const data = [];
  //       setVent(data);
  //     } catch (error) {
  //       console.error('Error fetching room data:', error);
  //     }
  //   };

  //   fetchVents();
  // }, []);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get("https://smart-vents-api.onrender.com/rooms");
      const data = response.data;
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  //Getting the rooms data
  useEffect(() => {
    fetchRoomData();
  }, []);

  const handleSubmits = async (e) => {
    e.preventDefault();
    const owner = JSON.parse(localStorage.getItem("token"));

    try {
      const response = await fetch("https://smart-vents-api.onrender.com/buildingsNew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, floors, owner: owner.body.user.id}),
      });

      if (response.ok) {
        // Building added successfully
        console.log("Building added to the database");
        // Reset the form fields
        setName("");
        setFloors("");
        setOwner("");
      } else {
        // Error adding the building
        console.error("Error adding the building");
      }
      fetchBuildingData();
    } catch (error) {
      console.error("An error occurred while adding the building", error);
    }
  };

  //Deleting the building
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://smart-vents-api.onrender.com/buildings/${id}`);
      const updatedBuildings = buildingData.filter(
        (building) => building._id !== id
      );
      setBuildingData(updatedBuildings);
    } catch (error) {
      console.error("Error deleting building:", error);
    }
  };
  const fetchBuildingData = async () => {
    try {
      const response = await axios.get("https://smart-vents-api.onrender.com/buildings");
      const data = response.data;
      setBuildingData(data);
    } catch (error) {
      console.error("Error fetching building data:", error);
    }
  };

  //Getting the building data
  useEffect(() => {
    fetchBuildingData();
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
        <Link href="/"><img src="/assets/img/logo/logo.png" alt="logo" /></Link>
          <div className={styles.welcome}>
            <b>Hey, {username?.username}</b>
          </div>
        <div className={styles.logoutButton}><div className={styles.link}>< Link href="/dashboard">Logout</Link> </div></div>
        </div>
      </div>
      <div className={styles.body}>
      <MysideNav/>
        <div className={styles.homediv}>
              
              {props.isfrom !== 'dashboard' &&
                <div>
                <div className={styles.addButton}><button onClick={openModal}>Add Building</button></div>
                  {isModalOpen && (
              <div className={styles.modalBackground}>
              <div className={styles.modal}>

              <h3>Building Information</h3>
              <form onSubmit={handleSubmits}>
              <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <br />
                <label>
                Floors:
                <input type="number" value={floors} onChange={(e) => setFloors(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Add Building</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </form>  
              
          
        </div>
      </div>
    )}

      </div>
    }

        <div className={styles.maincontent}>
        <h1>Building Data</h1>
        <table className={`${styles.table1} ${isModalOpen ? styles.tableBlur : ''}`}>
          <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Floors</th>
            <th className={styles.th}>Rooms</th>
            {props.isfrom !== 'dashboard' &&
            <th className={styles.th}>Actions</th>}
          </tr>
          </thead>
          <tbody className={styles.tbody}>
          {buildingData.map((building) => (
            <tr key={building._id}>
              <td className={styles.td}>{building.name}</td>
              <td className={styles.td}>{building.floors}</td>
              <td className={styles.td}>
                <Link  style={{  color: 'black', fontWeight: 'bold', padding: '10px' }} href={`/viewroom/${building._id}`}>{building.rooms.length}</Link>
              </td>
              {props.isfrom !== 'dashboard' &&
              <td className={styles.td}>
                <button className={styles.deleteButton} onClick={() => handleDelete(building._id)}>
                  Delete Building
                </button>
              </td>}
            </tr>
          ))}
          </tbody>
        </table>
        
        </div>
      </div>
    </div>
    </div>
  ); // Replace with your actual component for Building Page
}
