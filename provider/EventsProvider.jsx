import React, { createContext, useContext, useEffect } from 'react';
import {useEvents} from '@/hooks/useEvents'
let context = {};
export const EventsContext = createContext();

export function EventsProvider({children}) {
    const { events, isLoading,removeEvents, addEvents } = useEvents();
    context = {
        events, 
        isLoading, 
        removeEvents, 
        addEvents
    };
  return <EventsContext.Provider value={context}>{children}</EventsContext.Provider>;
}

export function useEventsContext() {
    const context = useContext(EventsContext);
    if (!context) throw new Error('useEventsContext must be used inside a `PeopleProvider`');
    return context;
}