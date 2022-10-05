import React, {
  useRef,
  useContext,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Center,
  Flex,
  Spacer,
  Text,
  Heading,
  Button,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import { useAuthState } from 'react-firebase-hooks/auth';

import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
} from './Auth';
import request from '../../request';
import { UseContextAll } from '../ContextAll';


function Signup({setExistingUser, setMainPage }) {
  //const { setUserInfo, setUserId, setUserGroups, setUserFriends } = UseContextAll();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const register = () => {
    if (!name) alert('enter name!');
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) {
      console.log('signup:', user);
      request.getUserByEmail(user.email)
        .then(res => console.log(res))
        .catch(() => {
          setUserInfo({email: user.email});
          setMainPage('welcome')
      }) // user not found in db
      setMainPage('welcome');
    }
  }, [user, loading]);

  return (
      <Center>
        <Flex flexDirection="column" h="calc(100vh)">
          <Center>
            <Heading>Sign Up</Heading>
          </Center>
          <Spacer />
          <Box >
            <FormControl>
              <Flex flexDirection="column">
                  <Box>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="email"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Box>
                  <Spacer />
                  <Box>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>
                  <Spacer />
                  <Box>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Box>
                  <Spacer />
                <Button onClick={register}>
                  Sign Up
                </Button>
                <Spacer />
                <Text>Or...</Text>
                <Spacer />
                <Button onClick={signInWithGoogle}>
                  Sign up using Google
                </Button>
              </Flex>
            </FormControl>
          </Box>
          <Spacer />
          <Center>
            <Text>
              Already have an account?
              <Button onClick={() => setExistingUser(true)}>Log In</Button>
            </Text>
          </Center>
        </Flex>
      </Center>
  );
}

function Login({user, loading, error, setExistingUser, setMainPage }) {
  const { setUserInfo, setUserId, setUserGroups, setUserFriends } = UseContextAll();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (loading) {
      // trigger loading screen?
      return;
    }
    if (user) {
      console.log('signup:', user);
      //console.log('signup: email:', email);
      request.getUserByEmail(user.email)
        .then(res => {
          //console.log(res.data); // {id:, firstname, lastname, email, aboutme
          //console.log(res.data.info); // {id:, firstname, lastname, email, aboutme
          setUserInfo(res.data.info);
          setUserGroups(res.data.groups);
          setUserFriends(res.data.friends);
          setMainPage('home')
        })
        .catch((err) => {
          console.error(err);
          console.log('setting email and forwarding to welcome page');
          setUserInfo({email: user.email});
          setMainPage('welcome')
        }) // user not found in db
    }
  }, [user, loading]);
  return (
      <Center minH="500px" maxH="800px">
        <Flex flexDirection="column" h="100%">
          <Center>
            <Heading>Sign Up</Heading>
          </Center>
          <Spacer />
          <Box minH="300px" minW="400px" maxH="600px" maxW="600px">
            <FormControl>
              <Flex flexDirection="column">
                  <Box>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>
                  <Spacer />
                  <Box>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Box>
                  <Spacer />
                <Button
                  onClick={
                    () => logInWithEmailAndPassword(email, password)
                  }
                >
                  Log In
                </Button>
                <Spacer />
                Or...
                <Spacer />
                <Button onClick={signInWithGoogle}>
                  Log in with Google
                </Button>
              </Flex>
            </FormControl>
          </Box>
          <Spacer />
          <Center>
            <Button
              onClick={
                () => setExistingUser(false)
                }
              >
                Sign up for a new account
            </Button>
          </Center>
        </Flex>
      </Center>
  )
}

export default function LoginOption({ user, loading, error, setMainPage, setUserID}) {
  const [existingUser, setExistingUser] = useState(true);
  if (existingUser) {
    return <Login
              setMainPage={setMainPage}
              setExistingUser={setExistingUser}
              user={user}
              loading={loading}
              error={error}
            />
  } else {
    return <Signup
              setExistingUser={setExistingUser}
              setMainPage={setMainPage}
            />
  }
}
