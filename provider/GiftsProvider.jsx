import React, { createContext, useContext, useEffect } from 'react';
import {useGifts} from '@/hooks/useGifts'
let context = {};
export const GiftsContext = createContext();

export function GiftsProvider({children}) {
    const { gifts, isLoading,removeGift, addGift } = useGifts();
    context = {
        gifts, 
        isLoading, 
        removeGift, 
        addGift
    };
  return <GiftsContext.Provider value={context}>{children}</GiftsContext.Provider>;
}

export function useGiftsContext() {
    const context = useContext(GiftsContext);
    if (!context) throw new Error('useGiftsContext must be used inside a `GiftProvider`');
    return context;
}