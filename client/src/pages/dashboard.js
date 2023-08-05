import React, { useEffect, useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "@fortawesome/fontawesome-free/css/all.css";
import styles from "./dashboard.module.css";
import axios from "axios";
import Link from "next/link";
import withAuth from "../hoc/withAuth";
import MysideNav from "../components/sideNav";
import Building from "./building";

function Dashboard() {
  const [selectedPage, setSelectedPage] = useState("uservents");
  const [roomData, setRoomData] = useState([]);
  const [buildingData, setBuildingData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [username,setUsername]=useState("");

  //update

  const handleClick = () => {
    setShowData(!showData);
  };
  const handleSelect = (selected) => {
    setSelectedPage(selected);
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

  //Getting the rooms data
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get("https://smart-vents-api.onrender.com/rooms");
        const data = response.data;
        setRoomData(data);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, []);

  //Addinng the new room
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://smart-vents-api.onrender.com/rooms", {
        name: name,
        building: building,
        floor: floor,
      });
      console.log(response.data);
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

  //Adding the new building
  const handleSubmits = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://smart-vents-api.onrender.com/buildingsNew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, floors, owner }),
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

  //Getting the building data
  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const response = await axios.get("https://smart-vents-api.onrender.com/buildings");
        const data = response.data;
        setBuildingData(data);
      } catch (error) {
        console.error("Error fetching building data:", error);
      }
    };

    fetchBuildingData();
  }, []);


  return <MysideNav></MysideNav>;
}

function App() {
  return <Building isfrom='dashboard' />;
}
export default withAuth(App);
