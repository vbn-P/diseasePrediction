import React, { useEffect, useState } from 'react'
import { Text, Title, Paper, Table, } from '@mantine/core';
import { useSelector } from 'react-redux'
import {db } from '../firebase'
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function History() {
  const userData = useSelector((state) => state.global.userData)
   const user = useSelector((state) => state.global.user.payload)
   const [datas, setDatas] = useState([])
  
      const rows = datas.map((data, index) => {
        const timestamp = data.date;
        const dateObject = new Date(timestamp.seconds * 1000);
        const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
        const symptomsNew = data.symptoms.join(', ');
        return (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{formattedDate}</td>
            <td>{data.disease}</td>
            <td>{symptomsNew}</td>
          </tr>
        );
      });

        async function getData(){
            
            const querySnapshot = await getDocs(query(collection(db, user), orderBy("date", "desc")));
            querySnapshot.forEach((doc) => {
            
                setDatas((prevDatas) => [...prevDatas, doc.data()]);
            });
        }

        useEffect(()=>{
                getData()
        }, [])

  return (
    <div>
    <Paper shadow="xs" p="md">
        <Title>Hi {userData.payload.firstName}</Title>
        <Text>Your Prediction History</Text>
    </Paper>
    <Paper mt="lg" shadow="xs" p="md">
    <Table>
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Date</th>
          <th>Disease</th>
          <th>Symptoms</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    
    </Paper>
    
    
    
    </div>
  )
}

export default History