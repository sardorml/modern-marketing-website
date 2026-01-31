import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface SubscriptionState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  isSubmitting: false,
  isSuccess: false,
  error: null,
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const submitSubscription = createAsyncThunk(
  'subscription/submit',
  async (email: string, { rejectWithValue }) => {
    const res = await fetch(`${STRAPI_URL}/api/subscribers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { email } }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      const message =
        errorData?.error?.message || 'Subscription failed';
      return rejectWithValue(message);
    }

    return await res.json();
  }
);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    resetSubscription(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSubscription.pending, (state) => {
        state.isSubmitting = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(submitSubscription.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isSuccess = true;
        state.error = null;
      })
      .addCase(submitSubscription.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
