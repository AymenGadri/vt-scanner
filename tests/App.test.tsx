import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
  it('renders App without crashing', () => {
    render(<App />);
    const linkElement = screen.getByText(/Select an option from the sidebar/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('handles API key input and submission', () => {
    render(<App />);
    const apiKeyInput = screen.getByLabelText(/Enter Api Key here/i);
    fireEvent.change(apiKeyInput, { target: { value: 'test-api-key' } });
    expect(apiKeyInput).toHaveValue('test-api-key');

    const startButton = screen.getByRole('button', { name: /Demarrer/i });
    fireEvent.click(startButton);
  });
});