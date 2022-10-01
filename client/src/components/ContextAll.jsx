import React, {
  createContext, useContext, useState,
} from 'react';

const ContextAll = createContext();

export function UseContextAll() {
  return useContext(ContextAll);
}

export function ContextAllProvider({ children }) {
  const [mainPage, setMainPage] = useState('login');
  const [userInfo, setUserInfo] = useState({});
  const [userGroups, setUserGroups] = useState([]); // user is a member of
  const [userFriends, setUserFriends] = useState([]);
  const [userChats, setUserChats] = useState([]);

  const values = {
    mainPage,
    setMainPage,
    userInfo,
    setUserInfo,
    userGroups,
    setUserGroups,
    userFriends,
    setUserFriends,
    userChats,
    setUserChats
  };
  return (
    <ContextAll.Provider value={values}>
      {children}
    </ContextAll.Provider>
  );
}
