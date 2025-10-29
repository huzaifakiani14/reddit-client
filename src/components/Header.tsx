import { FormEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { selectSearch, setSearch } from '../features/ui/uiSlice';
import { fetchPosts } from '../features/posts/postsSlice';

export default function Header() {
	const dispatch = useDispatch<AppDispatch>();
	const search = useSelector(selectSearch);

	const onSubmit = useCallback((e: FormEvent) => {
		e.preventDefault();
		dispatch(fetchPosts({ search }));
	}, [dispatch, search]);

	return (
		<header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-neutral-200 dark:bg-neutral-900/80 dark:border-neutral-800">
			<div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
				<a href="/" className="flex items-center gap-2">
					<div className="h-8 w-8 rounded bg-brand" />
					<span className="text-xl font-semibold">Reddit Client</span>
				</a>
				<form onSubmit={onSubmit} className="ml-auto flex-1 max-w-xl">
					<input
						type="search"
						placeholder="Search posts..."
						value={search}
						onChange={(e) => dispatch(setSearch(e.target.value))}
						className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
					/>
				</form>
			</div>
		</header>
	);
}
