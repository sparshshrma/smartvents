import React, {useEffect, useRef, useState} from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "@fortawesome/fontawesome-free/css/all.css";
import styles from "../../pages/dashboard.module.css";
import axios from "axios";
import Link from "next/link";
import withAuth from "../../hoc/withAuth";
import MysideNav from "../../components/sideNav";
import {useRouter} from "next/router";
import {Chart} from "chart.js/auto";

function ViewVent() {
  const router = useRouter();
  const chartRef = useRef(null);
  const [vent, setVent] = useState([]);
  const {ventId} = router.query;
  const [temp1, setTemp1] = useState([]);
  const [temp2, setTemp2] = useState([]);
  const [xlable, setXlable] = useState([]);
  const [username, setUsername] = useState("");

  function formatDate(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    console.log("date", `${year}-${month}-${day} ${hours}:${minutes}`)
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = token.body.user;
    setUsername(user);
    console.log("username", user);
  }, [])

  useEffect(() => {
    const fetchAllVents = async (id) => {
      try {
        const response = await axios.get(`https://smart-vents-api.onrender.com/ventDataByDeviceId/${id}`);
        const ventData = response.data;
        const startDate = new Date(ventData.startDate);
        console.log("startDate", startDate);
// Add 60 minutes to the startDate
        const newDate = new Date(startDate);
        const temp1 = [];
        const temp2 = [];
        const xlable = [];
        ventData.data.map((item) => {
          xlable.push(formatDate(newDate.setMinutes(startDate.getMinutes() + ventData.tempIntrv)))
          temp2.push(item[0]);
          temp1.push(item[1]);
        })
        console.log("xlable", xlable);
        console.log("temp1", temp1);
        console.log("temp2", temp2);
        setTemp2(temp2);
        setTemp1(temp1);
        setXlable(xlable);
        setVent(ventData);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    if (ventId) {
      fetchAllVents(ventId);
    }
  }, [ventId])
  let avgTemp
  if (vent && vent.data && vent.data.length > 0)
    avgTemp = vent?.data[vent?.data?.length - 1][0] + vent?.data[vent?.data?.length - 1][1] / 2;
  useEffect(() => {
    // Get the canvas element
    const ctx = chartRef.current.getContext('2d');
    let chart = null
    // Create the chart
    if (vent && ctx)
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: xlable,
          datasets: [{
            label: 'Temperature min', // Name the series
            data: temp1, // Specify the data values array
            fill: false,
            borderColor: '#2196f3', // Add custom color border (Line)
            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
          },
            {
              label: 'Temperature max', // Name the series
              data: temp2, // Specify the data values array
              fill: false,
              borderColor: '#4CAF50', // Add custom color border (Line)
              backgroundColor: '#4CAF50', // Add custom color background (Points and Fill)
              borderWidth: 1 // Specify bar border width
            }]
        },
        options: {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
        }
      });
    return () => {
      // Destroy the chart instance when the component is unmounted
      chart.destroy();
    };
  }, [xlable]);

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
    <div className={styles.sidebar}>
    <MysideNav/>
    </div>

    <div className={styles.maincontent}>
      <h1 className={styles.pageheading}>Vent Details</h1>
      <div className={styles.ventdetails}>
        <h3 className={styles.deviceinfo}>Start Date: {vent.startDate}</h3>
        <h3 className={styles.deviceinfo}>Temperature Interval: {vent.tempIntrv}</h3>
        <h3 className={styles.deviceinfo}>Voltage Interval: {vent.voltIntrv}</h3>
        <h3 className={styles.deviceinfo}>Temperature Avg: {avgTemp}</h3>
      </div>
    <div className={styles.chartcontainer}>
      <canvas ref={chartRef} id={styles.lineChart}></canvas>
    </div>
    </div>
  </div>
  );
}

export default withAuth(ViewVent);
