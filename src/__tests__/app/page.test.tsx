import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { useTools } from '@/hooks/useTools';
import { Tool } from '@/models';

// Mock the useTools hook
jest.mock('@/hooks/useTools', () => ({
  useTools: jest.fn(),
}));

describe('Home Page', () => {
  it('renders loading state', () => {
    (useTools as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<Home />);
    expect(screen.getByTestId('tool-skeleton')).toBeInTheDocument();
  });

  it('renders tools when data is loaded', () => {
    const mockTools: Tool[] = [
      {
        code: 'CHNS',
        type: 'chainsaw',
        brand: 'Stihl',
        charge: {
          dailyCharge: 1.49,
          weekdayCharge: true,
          weekendCharge: false,
          holidayCharge: true,
        },
      },
    ];

    (useTools as jest.Mock).mockReturnValue({
      data: mockTools,
      isLoading: false,
      error: null,
    });

    render(<Home />);
    expect(screen.getByText('Stihl')).toBeInTheDocument();
    expect(screen.getByText('Chainsaw')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useTools as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to load tools'),
    });

    render(<Home />);
    expect(screen.getByText('Error loading tools')).toBeInTheDocument();
  });
});
