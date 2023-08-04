import React, {  useEffect,useState } from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@fortawesome/fontawesome-free/css/all.css';
import styles from './dashboard.module.css';
import axios from 'axios';
import Link from 'next/link';

 

function MysideNav() {
  const [selectedPage, setSelectedPage] = useState('uservents');
  const [roomData, setRoomData] = useState([]);
  const [buildingData, setBuildingData] = useState([]);
    const [showData, setShowData] = useState(false);
   //update 
  

  const handleClick = () => {
    setShowData(!showData);
  };
  const handleSelect = (selected) => {
    setSelectedPage(selected);
  };



  const [name, setName] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const [vent, setVent] = useState([]);




  const [floors, setFloors] = useState('');
  const [owner, setOwner] = useState('');


   
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

      const fetchAllVents=async (id)=>{
      
        try {
          const response = await axios.get(`https://smart-vents-api.onrender.com/vents/${id}`);
          const data = response.data;
          setVent(data);
          console.log(vent)
        } catch (error) {
          console.error('Error fetching room data:', error);
        }
      };
 


  

      
//Getting the rooms data
useEffect(() => {
  const fetchRoomData = async () => {
    try {
      const response = await axios.get('https://smart-vents-api.onrender.com/rooms');
      const data = response.data;
      setRoomData(data);
    } catch (error) {
      console.error('Error fetching room data:', error);
    }
  };

  fetchRoomData();
}, []);

//Addinng the new room
const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post('https://smart-vents-api.onrender.com/rooms', 
      {name:name, building : building , floor:floor}
    );
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
    const response = await fetch('https://smart-vents-api.onrender.com/buildingsNew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, floors, owner }),
    });

    if (response.ok) {
      // Building added successfully
      console.log('Building added to the database');
      // Reset the form fields
      setName('');
      setFloors('');
      setOwner('');
    } else {
      // Error adding the building
      console.error('Error adding the building');
    }
  } catch (error) {
    console.error('An error occurred while adding the building', error);
  }
};


//Deleting the building
const handleDelete = async (id) => {
  try {
    await axios.delete(`https://smart-vents-api.onrender.com/buildings/${id}`);
    const updatedBuildings = buildingData.filter((building) => building._id !== id);
    setBuildingData(updatedBuildings);
  } catch (error) {
    console.error('Error deleting building:', error);
  }
};

  //Getting the building data
  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const response = await axios.get('https://smart-vents-api.onrender.com/buildings');
        const data = response.data;
        setBuildingData(data);

      } catch (error) {
        console.error('Error fetching building data:', error);
      }
    };

    fetchBuildingData();
  }, []);


 

  const renderPage = () => {
    switch (selectedPage) {
      case 'uservents':
        return <div  className={styles.body}>


        </div>;

      case 'building':
        return <div className={styles.homediv}>Building Page
 
      <div>
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
          <label>
            Owner:
            <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Add Building</button>
        </form>
      </div>

      <h1>Building Data</h1>
      <table className={styles.table1}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Floors</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {buildingData.map((building) => (
            <tr key={building._id}>
              <td>{building.name}</td>
              <td>{building.floors}</td>
              <td>
                <p>
                  <button onClick={() => handleDelete(building._id)}>
                    Delete Building
                  </button>
                </p>
                <p>
                  <Link href={`/uservents/${building._id}`}>
                    View Rooms
                  </Link>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


        </div>; // Replace with your actual component for Building Page


      case 'viewroom':
        return <div div className={styles.viewroom}>
        
        <nav className={styles.siteNavigation}>
            <div className={styles.logo}>
              <Link href="/">
                  <button className={styles.logoButton}>Smart Vents</button>
              </Link>
            </div>
            <div className={styles.menu}>
              <Link href="/login">
              <p className={styles.button}> Log Out </p>
              </Link>
            </div>
          </nav>

          <div className={styles.homediv}>
          <h1>Room Data</h1>
        <table className={styles.table1}>
        <thead className={styles.thead}>
        <tr className={styles.tr}>
        <th className={styles.th}>Name</th>
        <th className={styles.th}>Building</th>
        <th className={styles.th}>Floor</th>
        <th className={styles.th}>Vents ID</th>
        </tr>
         </thead>
       <tbody className={styles.tbody}>
         {roomData.map((room) => (
            <tr id={room._id} key={room._id}>
              <td>{room.name}</td>
              <td>{room.building}</td>
              <td>{room.floor}</td>
              {/* <td>{room.vents}</td> */}

              <td> <button onClick={(e)=>{const id =e.target.parentElement.parentElement.id; console.log(id) ; deleteRoom(id)}} > Delete Room</button></td>
            </tr>
          )
        )}
        </tbody>
     </table>
           
          <div>

          {vent.map((vents) => (
                      <tr key={vents._id}>
                        <td>{vents.name}</td>
                        <td>{vents.deviceID}</td>
                      </tr>
                    )
                  )}
          </div>
        
     </div> 


          <div className={styles.homediv} >
          <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                  Building:
                  <input type="text" value={building} onChange={(e) => setBuilding(e.target.value)} />
                </label>
                <br />
                <label>
                  Floor:
                  <input type="number" value={floor} onChange={(e) => setFloor(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
              </form>
            </div>
        
        

        
        
        
        </div>; // Replace with your actual component for View Graph Page
      case 'viewgraph':
        return <div div className={styles.graphdiv}>View Graph Page</div>; // Replace with your actual component for View Graph Page
     
     
        case 'settings':
        return <div s>Settings Page</div>; // Replace with your actual component for Settings Page
      default:

        return null;
    }

  };


 

  return (
    <div className={styles.container}>
      <SideNav onSelect={handleSelect} className={styles.sidebar}>
        <SideNav.Toggle className={styles.toggle} />
        <SideNav.Nav defaultSelected="home">
         
          <NavItem eventKey="uservents" className={styles.navItem}>
            <NavIcon>
              <i className="fa-brands fas fa-space-awesome" style={{ fontSize: '1.5em' }} />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem eventKey="building" className={styles.navItem}>
            <NavIcon>
              <i className="fas fa-building-shield" style={{ fontSize: '1.5em' }} />
            </NavIcon>
            <NavText>Building</NavText>
          </NavItem>        
           <NavItem eventKey="viewroom" className={styles.navItem}>
            <NavIcon>
              <i className="fas fa-house" style={{ fontSize: '1.5em' }} />
            </NavIcon>
            <NavText>View Room</NavText>
          </NavItem>
          <NavItem eventKey="viewgraph" className={styles.navItem}>
            <NavIcon>
              <i className="fas fa-line-chart" style={{ fontSize: '1.5em' }} />
            </NavIcon>
            <NavText>View Graph</NavText>
          </NavItem>
          <NavItem eventKey="settings" className={styles.navItem}>
            <NavIcon>
              <i className="fas fa-gear" style={{ fontSize: '1.5em' }} />
            </NavIcon>
            <NavText>Settings</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
      <div className={styles.content}>{renderPage()}</div>
    </div>
  );

}


 

function App() {
  return <MysideNav />;
}
export default App;