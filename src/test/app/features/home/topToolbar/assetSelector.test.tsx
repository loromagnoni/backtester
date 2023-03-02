import { render, screen } from '@testing-library/react';
import App from 'app/tree/App';

it('Renders the asset selector in the home page', async () => {
  render(<App />);
  expect(screen.getByText('EURUSD')).toBeInTheDocument();
});
