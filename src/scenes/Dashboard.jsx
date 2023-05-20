import React, { useEffect, useState } from 'react'
import { Text, Title, Paper, Grid, Button, Stack, Group, Table } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import BmiChart from '../components/BmiChart';
import {db } from '../firebase'
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

function Dashboard({setSelSymptoms}) {
    const userData = useSelector((state) => state.global.userData)
    const user = useSelector((state) => state.global.user.payload)
    const navigate = useNavigate()
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
            
            const querySnapshot = await getDocs(query(collection(db, user), orderBy("date", "desc"), limit(5)));
            querySnapshot.forEach((doc) => {
            
                setDatas((prevDatas) => [...prevDatas, doc.data()]);
            });
        }

        useEffect(()=>{
                getData()
        }, [])

    return (
        <div>


            <Grid columns={24}>
                <Grid.Col md={19}>
                    <Grid>
                        <Grid.Col md={8}>
                            <Paper shadow="sm" p="md" mih="10rem">
                                <Stack align="flex-start" mt="lg">
                                    <Title>Hi {userData.payload.firstName}</Title>
                                    <Text>Welcome to Dashboard</Text>
                                </Stack>
                            </Paper>


                        </Grid.Col>
                        <Grid.Col md={4}>
                        <Paper shadow="sm" p="md" mih="10rem">
                            <Stack align="center" justify="center" mt="lg">
                                <Title order={4}>Make another prediction</Title>
                                <Button onClick={()=>{
                                    setSelSymptoms([])
                                    navigate("/predict/body")}}>
                                    Get Started
                                </Button>
        
                            </Stack>
                        </Paper>
                        
                        </Grid.Col>
                    </Grid>
                    <Paper shadow="xs" p="md" mt="lg">
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


                </Grid.Col>
                <Grid.Col md={5}>
                    <Paper shadow="xs" p="md" >
                        <Group position="center">
                            <BmiChart weight={userData.payload.weight} height={userData.payload.height} />
                        </Group>
                    </Paper>
                    <Paper shadow="xs" p="md" mt="lg">
                        <Group position="center">
                            <Calendar />
                        </Group>
                    </Paper>
                </Grid.Col>
            </Grid>



        </div>
    )
}

export default Dashboard