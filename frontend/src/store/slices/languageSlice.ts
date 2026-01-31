import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Locale } from '@/i18n/settings';

interface LanguageState {
  currentLanguage: Locale;
  direction: 'ltr' | 'rtl';
}

const initialState: LanguageState = {
  currentLanguage: 'en',
  direction: 'ltr',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Locale>) {
      state.currentLanguage = action.payload;
      state.direction = action.payload === 'ar' ? 'rtl' : 'ltr';
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
