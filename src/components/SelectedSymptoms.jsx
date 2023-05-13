import React from 'react'
import {useNavigate} from "react-router-dom"
import { Paper, Box, Flex, Title, Space, Text, CloseButton,Button,ScrollArea } from '@mantine/core';
function SelectedSymptoms({ selSymptoms, setSelSymptoms,height,title }) {

    const navigate = useNavigate()
    const symptoms = selSymptoms
    const SelectSym = ({ value }) => {

        function handleClick(event) {
            const val = event
            const sym = selSymptoms.filter(item => item !== val)
            setSelSymptoms(sym)
        }

        return (

            <Box key={value} sx={() => ({
                backgroundColor: "blue",
                display: "inline-block",
                width: "auto",
                padding: "0.2rem 0.8rem",
                borderRadius: "2rem",
                margin: "0.5rem"
            })}>
                <Flex direction="row" gap="md" align="center">
                    <Text color='white'> {value} </Text>
                    <CloseButton id={value} onClick={() => handleClick(value)} color='white' aria-label="Close modal" />                </Flex>
            </Box>
        )
    }

    var scrollHeight= `${height-14}vh`
    var pheight =`${height-30}vh`



    function handleClear(){
        setSelSymptoms([])
    }

    function handleSubmit(){
        if (title === "Proceed") {
            navigate("/predict/other")
        }else{
            navigate("/predict/result")
        }
    }

    return (
        <Paper  shadow="md" mih={pheight} radius="md" p="md">
            <Title order={3}>SELECTED SYMPTOMS</Title>
            <Space h="md" />
            <ScrollArea h={scrollHeight}>
            {
                symptoms.map((value) => {
                    return (
                        <SelectSym value={value} />
                        
                        )
                    })
                }
                
            </ScrollArea>    
                <Flex
                    mih={50}
                    gap="md"
                    justify="flex-end"
                    align="center"
                    direction="row"
                    wrap="wrap"
                    
                >
                    <Button onClick={()=>{
                        handleClear()
                    }}>Clear</Button>
                    <Button disabled={selSymptoms == '' ? true : false } onClick={()=>{
                        handleSubmit()
                    }}>{title}</Button>
                </Flex>
            
        </Paper>
    )
}

export default SelectedSymptoms