import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContent = createAsyncThunk('content/fetchContent', async () => {
  const response = await axios.get('http://localhost:5000/api/content');
  return response.data;
});

export const trackInteraction = createAsyncThunk('content/trackInteraction', async (interactionData) => {
  await axios.post('http://localhost:5000/api/track', interactionData);
});

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contentSlice.reducer;