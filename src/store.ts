import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/posts/postsSlice';
import uiReducer from './features/ui/uiSlice';

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		ui: uiReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
