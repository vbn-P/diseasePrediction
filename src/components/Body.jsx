import React from 'react'
import Model from 'react-body-highlighter';
import { Center, Paper } from '@mantine/core';
import "./style.css"

function Body({ body, setBody }) {

    const leg=["adductor","hamstring","quadriceps","abductors","calves","gluteal","knees"]
    const hand=["biceps","triceps","forearm","back-deltoids","front-deltoids"]
    const stomach=["abs","obliques"]
    const head=["head","neck"]



    const handleClick = ({ muscle }) => {
        if (leg.includes(muscle)) {
            setBody("LEG")
        }else if (hand.includes(muscle)){
            setBody("HAND")
        }else if (stomach.includes(muscle)){
            setBody("STOMACH & LOWERBACK")
        }else if (head.includes(muscle)){
            setBody("HEAD")
        }else if (muscle === "chest"){
            setBody("CHEST & UPPERBACK")
        }else {
            setBody("NOT SELECTED")
        }

    };
    return (
        <Paper shadow="md" mih="80vh" radius="md" p="md">
            <Center mx="auto">
                <Model
                    style={{ width: '19rem', padding: '2rem' }}
                    onClick={handleClick}
                  
                />
            </Center>
        </Paper>
    )
}

export default Body