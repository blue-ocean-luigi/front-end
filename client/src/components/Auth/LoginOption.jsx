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


import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  registerWithEmailAndPassword,
} from './Auth';
import { please } from '../../request';
import { UseContextAll } from '../ContextAll';


function Signup({setExistingUser, setMainPage }) {
  const {
    setUserInfo,
    user,
    loading
  } = UseContextAll();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    registerWithEmailAndPassword(email, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) {
      please.getUserByEmail(user.email)
        .then((res) => console.log(res))
        .catch(() => {
          setUserInfo({ email: user.email });
          setMainPage('welcome');
        });
      setMainPage('welcome');
    }
  }, [user, loading]);

  return (
      <Center>
        <Flex flexDirection="column" h="calc(50vh)">
          <Center mt={8} mb={8}>
            <Heading>Sign Up</Heading>
          </Center>
          <Box >
            <FormControl>
              <Box mb={8}>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box mb={8}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box mb={8}>
                <Button w="100%" onClick={register}>
                  Sign Up
                </Button>
              </Box>
              <Box mb={8}>
                <Button w="100%" onClick={signInWithGoogle}>
                  Sign up using Google
                </Button>
              </Box>
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

function Login({user, loading, setExistingUser, setMainPage }) {
  const {
    setUserInfo, setUserID,
    setUserGroups,
    setUserFriends,
  } = UseContextAll();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      please.getUserByEmail(user.email)
        .then((res) => {
          setUserInfo(res.data.info);
          setUserID(res.data.info.id);
          setUserGroups(res.data.groups);
          setUserFriends(res.data.friends);
          setMainPage('home');
        })
        .catch((err) => {
          console.error(err);
          console.log('setting email and forwarding to welcome page');
          setUserInfo({ email: user.email });
          setMainPage('welcome');
        }); // user not found in db
    }
  }, [user, loading]);
  return (
    <Center h="calc(50vh)" mt={12}>
      <Flex flexDirection="column">
        <Center mb={8}>
          <Heading>Log In</Heading>
        </Center>
        <Spacer />
        <Box minH="300px" minW="400px" maxH="600px" maxW="600px">
          <FormControl>
            <Box mb={8}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={8}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box mb={8}>
              <Button
                w="100%"
                onClick={
                  () => logInWithEmailAndPassword(email, password)
                }
              >
                Log In
              </Button>
            </Box>
            <Box mb={8}>
              <Button w="100%" onClick={signInWithGoogle}>
                Log in with Google
              </Button>
            </Box>
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
  );
}

export default function LoginOption({ user, loading, error, setMainPage, setUserID}) {
  const [existingUser, setExistingUser] = useState(true);
  if (existingUser) {
    return (
      <Login
        setMainPage={setMainPage}
        setExistingUser={setExistingUser}
        user={user}
        loading={loading}
        error={error}
      />
    );
  }
  return (
    <Signup
      setExistingUser={setExistingUser}
      setMainPage={setMainPage}
    />
  );
}
