import React, { useState } from 'react'
import { Stack, Paper, Text, Title, Group, Avatar, Button, Modal, Input } from '@mantine/core';
import { useSelector } from 'react-redux'
import { Edit } from 'tabler-icons-react';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../firebase'
import { useDispatch } from 'react-redux'
import { setUserData } from '../states'

function Profile() {
  const userData = useSelector((state) => state.global.userData)
  const user = useSelector((state) => state.global.user)
  const [opened, setOpened] = useState(false);
  const [firstName, setFirstName] = useState(userData.payload.firstName);
  const [lastName, setLastName] = useState(userData.payload.lastName);
  const [email, setEmail] = useState(userData.payload.email);
  const [age, setAge] = useState(userData.payload.age);
  const [height, setHeight] = useState(userData.payload.height);
  const [weight, setWeight] = useState(userData.payload.weight);
  const [gender, setGender] = useState(userData.payload.gender);
  const dispatch = useDispatch();

  const handler = () => {
    const dataRef = doc(db, 'users', user.payload);
    setDoc(dataRef, {
      firstName,
      lastName,
      email,
      age,
      gender,
      height,
      weight,
    }, { merge: true })
      .then(async (docRef) => {
        const docRefs = doc(db, "users", user.payload);
        const docSnap = await getDoc(docRefs);
        dispatch(setUserData(docSnap.data()));
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <div>
      <Modal opened={opened} onClose={() => setOpened(!opened)} title="Edit Profile">
        <Input.Wrapper label="First Name" maw={320} mx="auto">
          <Input
            placeholder={userData.payload.firstName}
            onChange={(event) => {

              setFirstName(event.target.value) 

            }}
          />

        </Input.Wrapper>

        <Input.Wrapper label="Last Name" maw={320} mx="auto">
          <Input
            placeholder={userData.payload.lastName}
            onChange={(event) => {

              setLastName(event.target.value)

            }}
          />

        </Input.Wrapper>
        <Input.Wrapper label="Email" maw={320} mx="auto">
          <Input
            placeholder={userData.payload.email}
            onChange={(event) => {

              setEmail(event.target.value)

            }}
          />

        </Input.Wrapper>
        <Input.Wrapper label="Age" maw={320} mx="auto">
          <Input
            placeholder={userData.payload.age}
            onChange={(event) => {

              setAge(event.target.value)

            }}
          />

        </Input.Wrapper>
        <Input.Wrapper label="Weight" maw={320} mx="auto">
          <Input
            placeholder={userData.payload.weight}
            onChange={(event) => {

              setWeight(event.target.value)

            }}
          />

        </Input.Wrapper>
        <Input.Wrapper label="Height" maw={320} mx="auto">
          <Input
            placeholder={userData.payload.height}
            onChange={(event) => {

              setHeight(event.target.value)

            }}
          />

        </Input.Wrapper>
        <Stack align="center">
          <Button size="sm" mih="2rem" mt="lg"

            onClick={handler}
          >
            Save
          </Button>

        </Stack>
      </Modal>
      <Paper shadow="xs" p="md">
        <Title>Hi {firstName}</Title>
        <Text>Your Profile</Text>
      </Paper>

      <Stack align="center" h={300} mt="lg" >
        <Paper shadow="xs" p="md" miw="30rem">
          <Group position="center">
            <Avatar radius="xl" size="8rem" />
            <Stack>
              <Title order={3}>{firstName} {lastName}</Title>

              <Text>{email} </Text>


            </Stack>
          </Group>

        </Paper>
        <Paper shadow="xs" p="md" miw="30rem">
          <Group position="center">
            <Text>Gender :</Text>
            <Text fw={500}>{gender}</Text>
          </Group>
          <Group position="center">
            <Text>Age :</Text>
            <Text fw={500}>{age}</Text>
          </Group>
          <Group position="center">
            <Text>Weight :</Text>
            <Text fw={500}>{weight}</Text>
          </Group>
          <Group position="center">
            <Text>Height :</Text>
            <Text fw={500}>{height}</Text>
          </Group>
        </Paper>
        <Button size="sm" mih="2rem"
          leftIcon={<Edit size={18} />}
          onClick={() => setOpened(!opened)}
        >
          Edit
        </Button>

      </Stack>

    </div>
  )
}

export default Profile