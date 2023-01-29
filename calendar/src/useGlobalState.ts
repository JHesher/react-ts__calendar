//@ts-ignore
import { createGlobalState } from 'react-hooks-global-state';
import { initialState } from './initialState';

export const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState(initialState)
