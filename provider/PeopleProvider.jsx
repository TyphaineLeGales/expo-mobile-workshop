import React, { createContext, useContext, useEffect } from 'react';
import {useFriends} from '@/hooks/useFriends'
let context = {};
export const PeopleContext = createContext();

export function PeopleProvider({children}) {
    const { friends, isLoading,removeFriend, addFriend } = useFriends();
    context = {
        friends,
        isLoading, 
        removeFriend,
        addFriend
    };

  return <PeopleContext.Provider value={context}>{children}</PeopleContext.Provider>;
}

export function usePeopleContext() {
    const context = useContext(PeopleContext);
    if (!context) throw new Error('usePeopleContext must be used inside a `PeopleProvider`');
    return context;
}