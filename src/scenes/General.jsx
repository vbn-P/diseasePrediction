import React from 'react'
import { Button, Center, Space, Group, Flex, Paper, Text, Divider, NumberInput, Radio } from '@mantine/core'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../firebase'
import { useSelector } from "react-redux";
import {  setUserData } from '../states'
import { useDispatch } from 'react-redux'


function General() {

    const navigate = useNavigate()
    const [age, setAge] = useState("0")
    const [gender, setGender] = useState("")
    const [height, setHeight] = useState("0")
    const [weight, setWeight] = useState("0")
    const [checkValue, setCheckValue] = useState(false)
    const user = useSelector((state) => state.global.user)
    const dispatch = useDispatch();

    useEffect(() => {
        if (age !== "0" && gender !== "" && height !== "0" && weight !== "0") {
            setCheckValue(true);

        }
    }, [age, gender, height, weight]);
    const handler = () => {
        
        const dataRef = doc(db, 'users', user.payload);
        setDoc(dataRef, {
            age: age,
            gender: gender,
            height: height,
            weight: weight,

        }, { merge: true }).then(async(docRef) => {
            const docRefs = doc(db, "users", user.payload);
            const docSnap = await getDoc(docRefs);
            dispatch(setUserData(docSnap.data()))
            if (user.payload === "guest") {
                navigate("/predict/body")

            } else {
                navigate("/predict/dashboard")
            }
        }).catch((error) => { console.log(error) })
    }
    return (
        <Center mih="80vh">

            <Paper shadow="md" mih="80vh" miw="30vw" radius="xl" p="xl" px="auto" >

                <Text size="lg" align="center" weight="bold">Please fill all the below details</Text>
                <Space h="md" />
                <Flex
                    mih={50}
                    gap="md"
                    justify="center"
                    direction="column"
                    wrap="nowrap"
                >


                    <NumberInput
                        placeholder="Enter your age"
                        label="Age"
                        withAsterisk
                        min={0}
                        onChange={(event) => {

                            setAge(event)

                        }}

                    />
                    <Space h="0.1rem" />

                    <Radio.Group
                        name="choose Gender"
                        label="Select your Gender"
                        withAsterisk
                        onChange={(event) => {

                            setGender(event)

                        }}
                    >
                        <Group mt="xs">
                            <Radio value="Male" label="Male" />
                            <Radio value="Female" label="Female" />
                            <Radio value="Other" label="Other" />
                        </Group>
                    </Radio.Group>
                    <Space h="0.1rem" />
                    <NumberInput
                        placeholder="Enter your height"
                        label="Height"
                        withAsterisk
                        min={0}
                        onChange={(event) => {

                            setHeight(event)

                        }}

                    />
                    <Space h="0.1rem" />
                    <NumberInput
                        placeholder="Enter your weight"
                        label="Weight"
                        withAsterisk
                        min={0}
                        onChange={(event) => {

                            setWeight(event)

                        }}

                    />


                </Flex>

                <Space h="xl" />
                <Space h="xl" />
                <Space h="xl" />
                <Divider my="sm" />

                <Flex
                    mih={50}

                    gap="md"
                    justify="flex-end"
                    align="flex-end"
                    direction="row"
                    wrap="wrap"
                >
                    <Button variant='outline' onClick={() => {
                        navigate("/predict/general")
                    }} >Back</Button>
                    <Button disabled={checkValue ? false : true} onClick={handler} >Proceed</Button>
                </Flex>

            </Paper>
        </Center>
    )
}

export default General