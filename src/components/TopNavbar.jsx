import { Group, Title, Text, Flex, Avatar, Menu, Button, } from '@mantine/core';
import { useNavigate } from "react-router-dom"
import React from 'react'
import { Dashboard, History, ChevronDown, User, ArrowBarRight } from 'tabler-icons-react';
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../states'



function TopNavbar({setSelSymptoms}) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.global.user.payload)
    const userData = useSelector((state) => state.global.userData.payload)
    if (user === "guest" || user === "") {
        const userData = {
            firstName: "Guest",
            lastName: "",
        }
    }
    return (
        <Group position='apart' px="md">
            <Title order={3}>Disease Prediction</Title>
            <Flex
                mih={50}
                gap="md"
                justify="flex-end"
                align="center"
                direction="row"
                wrap="wrap"
            >
                {
                    (user !== "guest") && <Group spacing="0.2rem" onClick={() => navigate("/predict/dashboard")}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',

                            },
                        }}
                    >
                        <Dashboard
                            size={26}
                            strokeWidth={2}
                            color={'black'}
                        />
                        <Text>Dashboard</Text>
                    </Group>
                }
                {
                    (user !== "guest") && <Group spacing="0.2rem" onClick={() => navigate("/predict/history")}

                        sx={{
                            '&:hover': {
                                cursor: 'pointer',

                            },
                        }}
                    >
                        <History
                            size={24}
                            strokeWidth={2}
                            color={'black'}
                        />
                        <Text>History</Text>
                    </Group>
                }



                <Menu shadow="md" width={200}>

                    {
                        user === "guest" ?
                            <Group spacing="0.2rem" >
                                <Button size="xs" mr="xs" onClick={()=>{navigate("/")}}>Home</Button>
                                <Button size="xs" mr="xs" onClick={()=>{navigate("/signup")}}>Signup</Button> 
                                <Button size="xs"  onClick={()=>{
                                    navigate("/predict/body")
                                    setSelSymptoms([])
                                }
                                }>Predict</Button>
                                <Avatar radius="xl" />
                                <Text>Guest</Text>

                            </Group>

                            :
                            <Menu.Target>
                                <Group spacing="0.2rem" sx={{
                                    '&:hover': {
                                        cursor: 'pointer',

                                    },
                                }}>
                                    <Avatar radius="xl" />
                                    {userData && <Text>{userData.firstName} {userData.lastName}</Text>}
                                    <ChevronDown
                                        size={18}
                                        strokeWidth={2}
                                        color={'gray'}
                                    />
                                </Group>

                            </Menu.Target>

                    }



                    <Menu.Dropdown>
                        <Menu.Item icon={<User size={16} />} onClick={() => navigate("/predict/profile")}>Profile</Menu.Item>
                        <Menu.Item icon={<ArrowBarRight size={16} />} onClick={() => {
                            dispatch(setUser(""))
                            localStorage.removeItem('user');
                            navigate("/login")
                        }}>Sign Out</Menu.Item>
                    </Menu.Dropdown>

                </Menu>



            </Flex>
        </Group>
    )
}

export default TopNavbar