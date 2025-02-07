import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import { please } from '../request';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Auth/Auth';

const ContextAll = createContext();

export function UseContextAll() {
  return useContext(ContextAll);
}

export function ContextAllProvider({ children }) {
  const [mainPage, setMainPage] = useState('login');
  const [userID, setUserID] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [userGroups, setUserGroups] = useState([]); // user is a member of
  const [userFriends, setUserFriends] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const [homePosts, setHomePosts] = useState([]);
  const [currentGroupID, setCurrentGroupID] = useState(''); //  expects group ID
  const [currentUserID, setCurrentUserID] = useState('');
  const [openChatModal, setOpenChatModal] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    please.getUserPosts(userID) // replace with userID
      .then((response) => {
        setHomePosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userID]); //  add userID here

  // please.getUserInfoByID(userID)
  // .then((response) => {
  //   setUserInfo(response.data);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });


  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const values = {
    userID,
    setUserID,
    mainPage,
    setMainPage,
    userInfo,
    setUserInfo,
    userGroups,
    setUserGroups,
    userFriends,
    setUserFriends,
    userChats,
    setUserChats,
    homePosts,
    setHomePosts,
    currentGroupID,
    setCurrentGroupID,
    currentUserID,
    setCurrentUserID,
    openChatModal,
    setOpenChatModal,
    user,
    loading,
    error,
  };
  return (
    <ContextAll.Provider value={values}>
      {children}
    </ContextAll.Provider>
  );
}
