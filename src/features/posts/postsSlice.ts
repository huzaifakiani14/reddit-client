import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export type RedditPost = {
	id: string;
	title: string;
	author: string;
	subreddit: string;
	ups: number;
	num_comments: number;
	thumbnail?: string;
	permalink: string;
	created_utc: number;
};

export type RedditComment = {
	id: string;
	author: string;
	body: string;
	ups: number;
	created_utc: number;
};

export type PostsState = {
	items: RedditPost[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error?: string;
	selected?: RedditPost;
	comments: RedditComment[];
	commentsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	lastQueryKey?: string;
	cache: Record<string, RedditPost[]>;
};

const initialState: PostsState = {
	items: [],
	status: 'idle',
	comments: [],
	commentsStatus: 'idle',
	cache: {},
};

const buildQueryKey = (params: { subreddit?: string; search?: string }) => {
	return `${params.subreddit || 'popular'}::${params.search || ''}`;
};

export const fetchPosts = createAsyncThunk(
	'posts/fetchPosts',
	async (
		params: { subreddit?: string; search?: string } = {},
		{ getState }
	) => {
		const key = buildQueryKey(params);
		const state = getState() as RootState;
		if (state.posts.cache[key]) {
			return { key, posts: state.posts.cache[key] };
		}
		const base = params.search
			? `https://www.reddit.com/search.json?q=${encodeURIComponent(params.search)}`
			: `https://www.reddit.com/r/${params.subreddit || 'popular'}.json`;
		const res = await fetch(base);
		if (!res.ok) throw new Error(`Failed to load posts (${res.status})`);
		const json = await res.json();
		const posts: RedditPost[] = (json?.data?.children || [])
			.map((c: any) => c.data)
			.map((p: any) => ({
				id: p.id,
				title: p.title,
				author: p.author,
				subreddit: p.subreddit,
				ups: p.ups,
				num_comments: p.num_comments,
				thumbnail: p.thumbnail && p.thumbnail.startsWith('http') ? p.thumbnail : undefined,
				permalink: p.permalink,
				created_utc: p.created_utc,
			}));
		return { key, posts };
	}
);

export const fetchPostWithComments = createAsyncThunk(
	'posts/fetchPostWithComments',
	async (permalink: string) => {
		const url = `https://www.reddit.com${permalink}.json`;
		const res = await fetch(url);
		if (!res.ok) throw new Error(`Failed to load post (${res.status})`);
		const json = await res.json();
		const postData = json?.[0]?.data?.children?.[0]?.data;
		const commentsRaw = json?.[1]?.data?.children || [];
		const selected: RedditPost | undefined = postData
			? {
				id: postData.id,
				title: postData.title,
				author: postData.author,
				subreddit: postData.subreddit,
				ups: postData.ups,
				num_comments: postData.num_comments,
				thumbnail: postData.thumbnail && postData.thumbnail.startsWith('http') ? postData.thumbnail : undefined,
				permalink: postData.permalink,
				created_utc: postData.created_utc,
			}
			: undefined;
		const comments: RedditComment[] = commentsRaw
			.filter((c: any) => c.kind === 't1')
			.map((c: any) => c.data)
			.map((d: any) => ({
				id: d.id,
				author: d.author,
				body: d.body,
				ups: d.ups,
				created_utc: d.created_utc,
			}));
		return { selected, comments };
	}
);

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		clearError(state) {
			state.error = undefined;
		},
		setSelected(state, action: PayloadAction<RedditPost | undefined>) {
			state.selected = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = 'loading';
				const { subreddit, search } = (action.meta.arg || {}) as any;
				state.lastQueryKey = buildQueryKey({ subreddit, search });
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload.posts;
				state.cache[action.payload.key] = action.payload.posts;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchPostWithComments.pending, (state) => {
				state.commentsStatus = 'loading';
				state.comments = [];
			})
			.addCase(fetchPostWithComments.fulfilled, (state, action) => {
				state.commentsStatus = 'succeeded';
				state.selected = action.payload.selected;
				state.comments = action.payload.comments;
			})
			.addCase(fetchPostWithComments.rejected, (state, action) => {
				state.commentsStatus = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { clearError, setSelected } = postsSlice.actions;
export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectSelectedPost = (state: RootState) => state.posts.selected;
export const selectComments = (state: RootState) => state.posts.comments;
export const selectCommentsStatus = (state: RootState) => state.posts.commentsStatus;

export default postsSlice.reducer;
