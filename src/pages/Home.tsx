import Filters from '../components/Filters';
import PostList from '../components/PostList';

export default function Home() {
	return (
		<main className="pb-20">
			<Filters />
			<PostList />
		</main>
	);
}
