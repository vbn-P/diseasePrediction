import React from 'react'
import { Center, Box, Button, Stack, Group, Image } from '@mantine/core';
import '../components/css/Home.css'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setUser } from '../states'

function Home() {

    const navigate = useNavigate()
     const dispatch = useDispatch();

    const styles = {
        background: {
            backgroundImage: 'linear-gradient(111.4deg, rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2%)',
            // backgroundImage: 'url("/images/bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
        },
    };

    return (
        <div id='home'>
            <Box style={styles.background}>
                <Center maw={400} h="100vh" mx="auto">
                    <Stack align="center" spacing={0.1}>
                        <Image width={400} height={400} fit="contain" src="/images/title.png" />

                        <Group spacing="xl">
                            <Button className='btn' onClick={() => {navigate("/login")}}>
                                Login
                            </Button>
                            <Button className='btn' onClick={() => {
                                dispatch(setUser("guest"))
                                navigate("/predict/agreement")}}  >
                                Guest
                            </Button>
                        </Group>
                    </Stack>
                </Center>
            </Box>
        </div>
    );
}

export default Home