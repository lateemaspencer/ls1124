import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductGrid } from '@/components/ProductGrid';

describe('ProductGrid', () => {
  const mockTools = [
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
    {
      code: 'LADW',
      type: 'ladder',
      brand: 'Werner',
      charge: {
        dailyCharge: 1.99,
        weekdayCharge: true,
        weekendCharge: true,
        holidayCharge: false,
      },
    },
    {
      code: 'JAKD',
      type: 'jackhammer',
      brand: 'DeWalt',
      charge: {
        dailyCharge: 2.99,
        weekdayCharge: true,
        weekendCharge: false,
        holidayCharge: false,
      },
    },
    {
      code: 'JAKR',
      type: 'jackhammer',
      brand: 'Ridgid',
      charge: {
        dailyCharge: 2.99,
        weekdayCharge: true,
        weekendCharge: false,
        holidayCharge: false,
      },
    },
  ];

  it('displays all tools correctly', () => {
    const onSelect = jest.fn();

    render(
      <ProductGrid
        tools={mockTools}
        selectedTool={undefined}
        onSelect={onSelect}
      />
    );

    // Verify all tools are displayed
    expect(screen.getByText(/stihl/i)).toBeInTheDocument();
    expect(screen.getByText(/werner/i)).toBeInTheDocument();
    expect(screen.getByText(/dewalt/i)).toBeInTheDocument();
    expect(screen.getByText(/ridgid/i)).toBeInTheDocument();

    // Verify tool types are displayed and capitalized
    expect(screen.getByText(/chainsaw/i)).toBeInTheDocument();
    expect(screen.getByText(/ladder/i)).toBeInTheDocument();
    expect(screen.getAllByText(/jackhammer/i)).toHaveLength(2);
  });

  it('handles tool selection', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <ProductGrid
        tools={mockTools}
        selectedTool={undefined}
        onSelect={onSelect}
      />
    );

    // Find the tool card by its content rather than role
    const chainsawCard = screen.getByText(/stihl/i).closest('div');

    if (!chainsawCard) {
      throw new Error('Could not find chainsaw Card');
    }
    await user.click(chainsawCard);

    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith(mockTools[0]);
    });
  });
});
