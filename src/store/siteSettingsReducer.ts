import { createSlice } from '@reduxjs/toolkit'

const DARK_MODE = 'siteSettings.darkMode'

interface SiteSettingsState {
  darkMode: boolean
}

const initialState: SiteSettingsState = {
  darkMode: !!JSON.parse(localStorage.getItem(DARK_MODE) || 'null'),
}

const siteSettingsSlice = createSlice({
  name: 'siteSettings',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      localStorage.setItem(DARK_MODE, JSON.stringify(state.darkMode))
    },
  },
})

const { actions, reducer } = siteSettingsSlice

export const { toggleDarkMode } = actions

export default reducer
