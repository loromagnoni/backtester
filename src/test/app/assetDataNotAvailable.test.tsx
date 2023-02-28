import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from 'app/App';

// FIX ME: Need deps injection to handle AssetRepository
it('Shows an error toast when asset data is not available', async () => {
  render(<App />);
  fireEvent.click(screen.getByText('EURUSD'));
  fireEvent.click(screen.getByText('GBPUSD'));
  await waitFor(() =>
    expect(screen.getByText('Data not available')).toBeInTheDocument()
  );
});
