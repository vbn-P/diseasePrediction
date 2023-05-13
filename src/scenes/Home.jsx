import React from 'react'
import { Button, Center, } from '@mantine/core'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setUser } from '../states'


function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  return (
    <Center  mih="100vh" mx="auto" >
      <Button onClick={() => {
        navigate("/login")
      }} >Login</Button>
      <Button m="xl" onClick={() => {
        dispatch(setUser("guest"))
        navigate("/predict/agreement")
      }} >Be a guest</Button>
    </Center>
  )
}

export default Home