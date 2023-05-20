import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,

  Button,
} from '@mantine/core';
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setUser } from '../states'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from '../firebase'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 



export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpass, setCpass] = useState(true)
  const [agreement, setAgreement] = useState(false)
  const [err, setErr] = useState(false);
  const firstSetter = (event) => {
    setFirstName(event.target.value)
  }
  const lastSetter = (event) => {
    setLastName(event.target.value)
  }
  const emailSetter = (event) => {
    setEmail(event.target.value)
  }
  const passwordSetter = (event) => {
    setPassword(event.target.value)
  }
  const confirmChecker = (event) => {
    if (event.target.value === password) {
      setCpass(true)
    } else {
      setCpass(false)
    }
  }

  const checkSignup = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
    
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          height: "",
          weight: "",
          age: "",
          gender: "",
          timestamp: serverTimestamp()


        }).then((docRef)=>{
          dispatch(setUser(user.uid))
          navigate("/predict/agreement")

        })
        
        // ...
      })
      .catch((error) => {
     
        if(error.code === "auth/email-already-in-use"){
          setErr("Email already in Use!!!")

      }else if(error.code === "auth/invalid-email"){
        setErr("Invalid Email!!!")

    }else if(error.code === "auth/weak-password"){
      setErr("Weak Password (Min 8 Characters required)")

  }else{
    setErr("Something went Wrong!!!")
  }
        // ..
      });
  }
  
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button" onClick={()=>navigate("/login")}>
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="First Name" placeholder="John" required onChange={firstSetter} />
        <TextInput label="Last Name" placeholder="Honai" required mt="md" onChange={lastSetter} />
        <TextInput label="Email" placeholder="you@test.dev" required mt="md" onChange={emailSetter} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={passwordSetter} />
        <PasswordInput label="Confirm Password" placeholder="Your password" required mt="md" onChange={confirmChecker} />
        {
          !cpass && <Text c="red">Password Doesn't match</Text>
        }
        <Checkbox mt="lg" label="I agree to the terms and policies." onChange={() => setAgreement(!agreement)} />


        <Button disabled={agreement ? false : true} fullWidth mt="xl" onClick={checkSignup}>
          Sign up
        </Button>
        { err && <Text align="center" mt="md" c="red">{err}</Text>}
      </Paper>
    </Container>
  );
}