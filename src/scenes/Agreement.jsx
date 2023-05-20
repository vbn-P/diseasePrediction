import React from 'react'
import { Button, Center, Paper, Text, List, Checkbox, Space, Flex, Divider } from '@mantine/core'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'



function Agreement() {

    const [checkValue, setCheckValue] = useState(false)
   
    const navigate = useNavigate()

    return (
        <Center mih="80vh">

            <Paper shadow="md" mih="80vh" miw="40vw" radius="xl" p="xl" px="auto" >

                <Flex
                    mih={50}
                    gap="md"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                >
                    <Text size="lg" weight="bold">Before using this symptom checker please read carefully <br /> and accept our Terms and Services:</Text>
                    <Space h="md" />

                    <List  withPadding>
                        <List.Item>This checkup is based on th symptoms <br />
                        you provides</List.Item>
                        <Space h="md" />
                        <List.Item>This checkup is for informational purposes <br /> and is not a qualified medical opinion.</List.Item>
                        <Space h="md" />
                        <List.Item>Information that you provide is anonymous <br /> and not shared with anyone. We also do <br /> not store any information on our server.</List.Item>
                        <Space h="md" />

                    </List>

                    <Space h="xl" />

                    <Checkbox
                        label="I agree to the terms and conditions" onChange={()=>{
                            setCheckValue(!checkValue)
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
                    <Button disabled={checkValue ? false:true} onClick={() => {
                        navigate("/predict/general")
                    }} >I Agree</Button>
                </Flex>

            </Paper>
        </Center>

    )
}

export default Agreement