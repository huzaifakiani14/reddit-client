import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { selectSubreddit, setSubreddit } from '../features/ui/uiSlice';
import { fetchPosts } from '../features/posts/postsSlice';

const presets = ['popular', 'all', 'pics', 'news', 'funny', 'askreddit', 'worldnews', 'technology'];

export default function Filters() {
	const dispatch = useDispatch<AppDispatch>();
	const subreddit = useSelector(selectSubreddit);
	return (
		<div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap gap-2">
			{presets.map((s) => (
				<button
					key={s}
					onClick={() => {
						dispatch(setSubreddit(s));
						dispatch(fetchPosts({ subreddit: s }));
					}}
					className={`px-3 py-1 rounded-full border text-sm ${subreddit === s ? 'bg-brand text-white border-brand' : 'border-neutral-300 dark:border-neutral-700'}`}
				>
					{s}
				</button>
			))}
		</div>
	);
}
