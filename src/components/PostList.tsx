import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store';
import { fetchPosts, selectPosts, selectPostsStatus } from '../features/posts/postsSlice';
import { selectSearch, selectSubreddit } from '../features/ui/uiSlice';
import PostCard from './PostCard';

export default function PostList() {
	const dispatch = useDispatch<AppDispatch>();
	const posts = useSelector(selectPosts);
	const status = useSelector(selectPostsStatus);
	const search = useSelector(selectSearch);
	const subreddit = useSelector(selectSubreddit);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchPosts({ subreddit }));
		}
	}, [dispatch, status, subreddit]);

	return (
		<div className="mx-auto max-w-6xl px-4 grid gap-3">
			{status === 'loading' && (
				<div className="py-10 text-center text-neutral-500">Loading...</div>
			)}
			{status === 'failed' && (
				<div className="py-10 text-center text-red-600">Failed to load. Try again.</div>
			)}
			{status === 'succeeded' && posts.length === 0 && (
				<div className="py-10 text-center text-neutral-500">No results {search ? `for "${search}"` : ''}.</div>
			)}
			{posts.map((p) => (
				<PostCard key={p.id} post={p} />
			))}
		</div>
	);
}
