import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store';
import { fetchPosts, selectPosts, selectPostsStatus, selectPostsError } from '../features/posts/postsSlice';
import { selectSearch, selectSubreddit } from '../features/ui/uiSlice';
import PostCard from './PostCard';

export default function PostList() {
	const dispatch = useDispatch<AppDispatch>();
	const posts = useSelector(selectPosts);
	const status = useSelector(selectPostsStatus);
	const error = useSelector(selectPostsError);
	const search = useSelector(selectSearch);
	const subreddit = useSelector(selectSubreddit);

	useEffect(() => {
		// Fetch on mount or when subreddit changes (but not if already loading)
		if (status !== 'loading') {
			dispatch(fetchPosts({ subreddit }));
		}
	}, [dispatch, subreddit, status]);

	const handleRetry = () => {
		dispatch(fetchPosts({ subreddit, search }));
	};

	return (
		<div className="mx-auto max-w-6xl px-4 grid gap-3">
			{status === 'loading' && (
				<div className="py-10 text-center text-white">Loading...</div>
			)}
			{status === 'failed' && (
				<div className="py-10 text-center grid gap-3">
					<div className="text-red-500">Failed to load. {error}</div>
					<button
						onClick={handleRetry}
						className="justify-self-center rounded px-4 py-2 bg-brand text-white hover:opacity-90"
					>
						Retry
					</button>
				</div>
			)}
			{status === 'succeeded' && posts.length === 0 && (
				<div className="py-10 text-center text-white opacity-70">No results {search ? `for "${search}"` : ''}.</div>
			)}
			{posts.map((p) => (
				<PostCard key={p.id} post={p} />
			))}
		</div>
	);
}
