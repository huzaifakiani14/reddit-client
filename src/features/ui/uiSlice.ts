import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export type UIState = {
	search: string;
	subreddit: string;
	isLoading: boolean;
	modalOpen: boolean;
};

const initialState: UIState = {
	search: '',
	subreddit: 'popular',
	isLoading: false,
	modalOpen: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload;
		},
		setSubreddit(state, action: PayloadAction<string>) {
			state.subreddit = action.payload || 'popular';
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setModalOpen(state, action: PayloadAction<boolean>) {
			state.modalOpen = action.payload;
		},
	},
});

export const { setSearch, setSubreddit, setIsLoading, setModalOpen } = uiSlice.actions;

export const selectSearch = (state: RootState) => state.ui.search;
export const selectSubreddit = (state: RootState) => state.ui.subreddit;
export const selectIsLoading = (state: RootState) => state.ui.isLoading;
export const selectModalOpen = (state: RootState) => state.ui.modalOpen;

export default uiSlice.reducer;
