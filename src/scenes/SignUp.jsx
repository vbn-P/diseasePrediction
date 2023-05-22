import React from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Collapse,
  Button,
  Box,
  Group,
} from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../states';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';


const SignUp = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpass, setCpass] = useState(true);
  const [agreement, setAgreement] = useState(false);
  const [err, setErr] = useState(false);

  const firstSetter = (event) => {
    setFirstName(event.target.value);
  };
  const lastSetter = (event) => {
    setLastName(event.target.value);
  };
  const emailSetter = (event) => {
    setEmail(event.target.value);
  };
  const passwordSetter = (event) => {
    setPassword(event.target.value);
  };
  const confirmChecker = (event) => {
    if (event.target.value === password) {
      setCpass(true);
    } else {
      setCpass(false);
    }
  };

  const checkSignup = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, 'users', user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          height: '',
          weight: '',
          age: '',
          gender: '',
          timestamp: serverTimestamp(),
        }).then((docRef) => {
          dispatch(setUser(user.uid));
          navigate('/predict/agreement');
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErr('Email already in use!');
        } else if (error.code === 'auth/invalid-email') {
          setErr('Invalid email!');
        } else if (error.code === 'auth/weak-password') {
          setErr('Weak password (Minimum 8 characters required)!');
        } else {
          setErr('Something went wrong!');
        }
      });
  };

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
        <Anchor size="sm" component="button" onClick={() => navigate('/login')}>
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="First Name" placeholder="John" required onChange={firstSetter} />
        <TextInput label="Last Name" placeholder="Honai" required mt="md" onChange={lastSetter} />
        <TextInput label="Email" placeholder="you@test.dev" required mt="md" onChange={emailSetter} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={passwordSetter} />
        <PasswordInput label="Confirm Password" placeholder="Your password" required mt="md" onChange={confirmChecker} />
        {!cpass && <Text color="red">Password doesn't match</Text>}

        <Box maw={400} mx="auto" mt="lg">
          <Group position="center" mb={5}>
            <Text onClick={toggle} fz="xs" color="blue"> Click for Terms and Conditions</Text>
          </Group>

          <Collapse in={opened}>
          <Text style={{ maxWidth: '400px' }}>1. Account Creation:<br/><br/>

          1.1 The purpose of this signup page is to create an account for accessing and using our app.<br/>
          
          1.2 You must be at least 18 years old or have the legal capacity to enter into a contract.<br/><br/>
          
          
          2. Personal Information:<br/><br/>
          
          
          2.1 The personal information collected during the signup process, including your name and email, will be used for the following purposes:<br/>
          
          2.2 Providing access to the app and its features.<br/>
          
          2.3 Sending relevant account notifications and updates.<br/>
          
          2.4 Improving our services and user experience.<br/>
          
          2.5 We are committed to protecting your privacy and will handle your information in accordance with our Privacy Policy.<br/><br/>
          
          
          3. Data Security:<br/><br/>
          
          
          3.1 We take appropriate measures to ensure the security and confidentiality of your personal information.<br/>
          
          3.2 However, no data transmission over the internet or electronic storage method is 100% secure. Therefore, we cannot guarantee absolute security.<br/><br/>
          
          
          4. Communication:<br/><br/>
          
          
          4.1 By creating an account, you consent to receive communication from us, including account-related notifications, service updates, and promotional emails.<br/>
          
          4.2 You can manage your communication preferences and opt out of certain types of communication through your account settings.<br/><br/>
          
          
          5. User Responsibilities:<br/><br/>
          
          
          5.1 You are responsible for maintaining the confidentiality of your account login credentials.<br/>
          
          5.2 You agree to provide accurate and up-to-date information during the signup process.<br/>
          
          5.3 You are solely responsible for any activities carried out using your account.<br/><br/>
          
          
          6. Termination:<br/><br/>
          
          
          6.1 We reserve the right to terminate or suspend your account if you violate these terms and conditions or engage in any unlawful activities.<br/>
          
          6.2 You can also choose to terminate your account at any time by contacting our support team.<br/><br/>
          
          
          7. Changes to Terms and Conditions:<br/><br/>
          
          
          7.1 We reserve the right to modify or update these terms and conditions at any time.<br/>
          
          7.2 You will be notified of any significant changes, and continued use of the app after such modifications will constitute your acceptance of the updated terms.<br/>
          
          
          
          <br/>Please read these terms and conditions carefully before creating an account. If you do not agree to these terms, please do not proceed with the signup process.<br/>
          </Text>
          </Collapse>
        </Box>

        <Checkbox mt="lg" label="I agree to the terms and conditions." onChange={() => setAgreement(!agreement)} />

        <Button disabled={!agreement} fullWidth mt="xl" onClick={checkSignup}>
          Sign up
        </Button>

        {err && <Text align="center" mt="md" color="red">{err}</Text>}
      </Paper>
    </Container>
  );
};

export default SignUp;
