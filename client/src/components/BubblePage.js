import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {fetchBubbles} from '../services/fetchBubbles'
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const {push} = useHistory();
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    fetchBubbles()
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => {console.log(err)})
  },[])

  const logoutBtn = (e) => {
    localStorage.clear();
    push('/')
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      <div><button onClick={logoutBtn}>Logout</button></div>
    </>
  );
};

export default BubblePage;
