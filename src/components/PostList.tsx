import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store';
import { fetchPosts, selectPosts, selectPostsStatus } from '../features/posts/postsSlice';
import { selectSearch, selectSubreddit } from '../features/ui/uiSlice';
import PostCard from './PostCard';
import { motion, AnimatePresence } from 'framer-motion';

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
				<div className="py-10 text-center grid gap-3">
					<div className="text-red-600">Failed to load. Try again.</div>
					<button
						className="justify-self-center rounded px-3 py-1 bg-brand text-white"
						onClick={() => dispatch(fetchPosts({ subreddit, search }))}
					>
						Retry
					</button>
				</div>
			)}
			{status === 'succeeded' && posts.length === 0 && (
				<div className="py-10 text-center text-neutral-500">No results {search ? `for "${search}"` : ''}.</div>
			)}
			<AnimatePresence mode="popLayout">
				{posts.map((p) => (
					<motion.div
						key={p.id}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.18 }}
					>
						<PostCard post={p} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}
