import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setUser, setUserData } from '../states'
import { signInWithEmailAndPassword } from "firebase/auth"
import { db, auth } from '../firebase'
import { doc, getDoc } from "firebase/firestore";


export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const [err, setErr] = useState(false);

    
    const nameSetter = (event) => {
        setUsername(event.target.value)
    }
    const passwordSetter = (event) => {
        setPassword(event.target.value)
    }
    const checklogin = (event) => {
        event.preventDefault();

        signInWithEmailAndPassword(auth, username, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch(setUser(user.uid))
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.data().age !== "") {

                    dispatch(setUserData(docSnap.data()))
                    navigate("/predict/dashboard")
                } else {
                    navigate("/predict/agreement")
                }
            })
            .catch((error) => {


                if(error.code === "auth/invalid-email"){
                    setErr("Invalid Email!!!")

                }else if(error.code === "auth/user-not-found"){
                    setErr("User not Found!!!")
                }
                else if(error.code === "auth/wrong-password"){
                    setErr("Wrong Password!!!")
                }else{
                    setErr("Something went wrong!!!")
                }
               

            });

    }




    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome back!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button" onClick={() => navigate("/signup")}>
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="you@test.dev" required onChange={nameSetter} />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={passwordSetter} />
                {/*<Group position="apart" mt="lg">

                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
    </Group>*/}
                <Button fullWidth mt="xl" onClick={checklogin}>
                    Sign in
                </Button>
                { err && <Text align="center" mt="md" c="red">{err}</Text>}
            </Paper>
        </Container>
    );
}