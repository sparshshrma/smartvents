import React, {useEffect, useState} from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "@fortawesome/fontawesome-free/css/all.css";
import styles from "../uservents.module.css";


import axios from "axios";
import Link from "next/link";
import withAuth from "../../hoc/withAuth";
import MysideNav from "../../components/sideNav";
import {useRouter} from "next/router";
import AddVentsForm from "./addVentsForm";

function ViewRoom() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("uservents");
  const [roomData, setRoomData] = useState([]);
  const [buildingData, setBuildingData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateRoomID, setUpdateRoomId] = useState(false);
  const [username, setUsername] = useState("");
  //update
  const openModal = (id) => {
    setIsModalOpen(true);
    setUpdateRoomId(id)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    setShowData(!showData);
  };
  const handleSelect = (selected) => {
    setSelectedPage(selected);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = token.body.user;
    setUsername(user);
    console.log("username", user);
  }, [])

  const {slug} = router.query;

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

  const fetchAllVents = async (id) => {
    try {
      const response = await axios.get(`https://smart-vents-api.onrender.com/vents/${id}`);
      const data = response.data;
      setVent(data);
      console.log(vent);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };
  const fetchRoomData = async () => {
    try {
      if (slug) {
        const response = await axios.get(
          "https://smart-vents-api.onrender.com/getroombybuilding/" + slug
        );
        const data = response.data;
        setRoomData(data);
      }
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };
  //Getting the rooms data
  useEffect(() => {
    fetchRoomData();
  }, [router.query]);

  //Addinng the new room
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://smart-vents-api.onrender.com/rooms", {
        name: name,
        building: slug,
        floor: floor,
      });
      console.log(response.data);
      fetchRoomData();
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  //Deleting the room
  async function deleteRoom(id) {
    try {
      const response = await axios.delete(`https://smart-vents-api.onrender.com/rooms/${id}`);
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  }

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

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
        <Link href="/"><img src="/assets/img/logo/logo.png" alt="logo" /></Link>
          <div className={styles.welcome}>
            <b>Hey, {username.username}</b>
          </div>
        <div className={styles.logoutButton}><div className={styles.link}>< Link href="/login">Logout</Link> </div></div>
        </div>
      </div>
      <div className={styles.body}>
      <MysideNav/>

          <div className={styles.maincontent}>
          <h1>Room Data</h1>
          <div className={styles.table1}>
          <table className={styles.table1}>
            <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>
                <a style={{color: 'black', fontWeight: 'bold', padding: '10px' }} href="/building" className={styles.buildinglink}>Building</a>
              </th>
              <th className={styles.th}>Floor</th>
              <th className={styles.th}>Vents ID</th>
              <th className={styles.th}>Delete</th>
              <th className={styles.th}>Add Vent</th>
            </tr>
            </thead>
            <tbody className={styles.tbody}>
            {roomData.map((room) => (
              <tr id={room._id} key={room._id}>
                <td>{room.name}</td>
                <td>{room.building_details.name}</td>
                <td>{room.floor}</td>
                <td>{room.vents.map((vents) => (
                  <><Link style={{color: 'black', fontWeight: 'bold', padding: '10px' }} href={'/vents/' + vents.deviceID}>{vents.name}</Link>
                    <br></br></>
                ))}</td>

                <td>
                  <button
                    className={styles.deleteButton} 
                    onClick={(e) => {
                      const id = e.target.parentElement.parentElement.id;
                      console.log(id);
                      deleteRoom(id);
                    }}
                  >
                    Delete Room
                  </button>
                </td>
                <td>
                <div id={room.vents}>
                  <button
                  className={styles.deleteButton}  
                    onClick={(e) => {
                      const id = e.target.parentElement.parentElement.id;

                      openModal(id);
                    }}
                  >
                    Add vents
                  </button>
                </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>

        </div>

       
      </div>
      {isModalOpen && (
        <div className={styles.modalBackground}>
        <div className={styles.modal}>
        <AddVentsForm callback={async (ventData) => {
          setIsModalOpen(false);
          try {
            const response = await axios.patch(`https://smart-vents-api.onrender.com/room/updateVent/${updateRoomID}`, {vents: ventData._id});
            fetchRoomData();
          } catch (error) {
            console.error("Error fetching room data:", error);
          }
          console.log("ventData", ventData);
        }} closeModal={() => {
          setIsModalOpen(false)
        }} isModalOpen={isModalOpen}></AddVentsForm>
        </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(ViewRoom);
