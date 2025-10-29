import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import type { AppDispatch } from '../store';
import { fetchPostWithComments, selectComments, selectCommentsStatus, selectSelectedPost } from '../features/posts/postsSlice';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

export default function PostDetail() {
	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();
	const post = useSelector(selectSelectedPost);
	const comments = useSelector(selectComments);
	const commentsStatus = useSelector(selectCommentsStatus);

	useEffect(() => {
		const permalink = location.pathname.replace(/^\/post/, '');
		if (permalink) {
			dispatch(fetchPostWithComments(permalink.replace(/\/$/, '')));
		}
	}, [dispatch, location.pathname]);

	if (!post) {
		return <div className="mx-auto max-w-3xl px-4 py-10 text-neutral-500">Loading post...</div>;
	}

	return (
		<main className="mx-auto max-w-3xl px-4 py-6 grid gap-6">
			<article className="grid gap-2">
				<h1 className="text-2xl font-bold">{post.title}</h1>
				<p className="text-sm text-neutral-500">u/{post.author} in r/{post.subreddit}</p>
			</article>
			<section className="grid gap-2">
				<h2 className="font-semibold">Comments</h2>
				{commentsStatus === 'loading' && <div className="text-neutral-500">Loading comments...</div>}
				{comments.map((c) => (
					<article key={c.id} className="rounded border border-neutral-200 dark:border-neutral-800 p-3">
						<p className="text-sm text-neutral-500 mb-2">u/{c.author}</p>
						<div className="prose dark:prose-invert max-w-none">
							<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{c.body}</ReactMarkdown>
						</div>
					</article>
				))}
			</section>
		</main>
	);
}
