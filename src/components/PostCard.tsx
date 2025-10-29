import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { RedditPost } from '../features/posts/postsSlice';

dayjs.extend(relativeTime);

export default function PostCard({ post }: { post: RedditPost }) {
	return (
		<Link to={`/post${post.permalink}`} className="block">
			<article className="rounded-lg border border-neutral-800 p-4 hover:shadow-sm transition text-white">
				<div className="flex items-start gap-3">
					{post.thumbnail ? (
						<img src={post.thumbnail} alt="thumbnail" className="h-16 w-16 rounded object-cover" />
					) : (
						<div className="h-16 w-16 rounded bg-neutral-800" />
					)}
					<div className="min-w-0 flex-1">
						<h3 className="font-semibold line-clamp-2">{post.title}</h3>
						<p className="text-sm opacity-70">
							Posted by u/{post.author} in r/{post.subreddit} • {dayjs.unix(post.created_utc).fromNow()}
						</p>
						<p className="text-sm mt-1">⬆️ {post.ups} • 💬 {post.num_comments}</p>
					</div>
				</div>
			</article>
		</Link>
	);
}
