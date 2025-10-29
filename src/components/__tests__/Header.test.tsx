import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

it('renders header with search input', () => {
	render(
		<Provider store={store}>
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		</Provider>
	);
	expect(screen.getByPlaceholderText(/search posts/i)).toBeInTheDocument();
});
