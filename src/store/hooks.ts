/**
 * This file exists for TypeScript compatibility.
 *
 * @see: https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
