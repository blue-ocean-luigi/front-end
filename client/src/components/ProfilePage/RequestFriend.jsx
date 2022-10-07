/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react';
import { UseContextAll } from '../ContextAll';
import { please } from '../../request';

function RequestFriend() {
  const { userFriends, currentUserID, userID, setOpenChatModal } = UseContextAll();
  const [friendStatus, setStatus] = useState('stranger');

  useEffect(() => {
    setStatus('stranger');
    please.checkIfFriends(userID, currentUserID)
      .then((response) => {
        if (response.data.status === true) {
          setStatus('friend');
        } else if (response.data.status === false) {
          setStatus('pending');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUserID]);

  function handleRequest() {
    please.requestFriend(userID, currentUserID)
      .then(() => {
        setStatus('pending');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Box>
      {friendStatus === 'friend' && <Button onClick={() => setOpenChatModal(true) } background="#f7d359" color="black"> Chat Now </Button>}
      {friendStatus === 'pending' && <Button background="#f7d359" color="black"> Pending </Button>}
      {friendStatus === 'stranger' && <Button background="#f7d359" color="black" onClick={() => handleRequest()}> Request Friend </Button>}
    </Box>
  );
}
// James would you add Chat pop our for Chat now button
// Request button sends reqest.
export default RequestFriend;
