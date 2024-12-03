import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RentalForm } from '@/components/rental/RentalForm';
import { renderWithProviders } from '../utils/test-utils';
import { differenceInMonths, parse } from 'date-fns';
import { RentalAgreement } from '@/models';

describe('RentalForm', () => {
  it('calculates rental agreement for JAKR 9/3/15-9/8/15 with 101% discount', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    const onFormChange = jest.fn();

    const mockJackhammer = {
      code: 'JAKR',
      type: 'jackhammer',
      brand: 'Ridgid',
      charge: {
        dailyCharge: 2.99,
        weekdayCharge: true,
        weekendCharge: false,
        holidayCharge: false,
      },
    };

    const mockAgreement: RentalAgreement = {
      toolCode: 'JAKR',
      toolType: 'jackhammer',
      checkoutDate: '2015-09-03',
      returnDate: '2015-09-08',
      dailyCharge: 2.99,
      chargeableDays: 2,
      prediscountAmount: 2,
      discountPercent: 101,
      discountAmount: 2,
      finalAmount: 3.58,
    };

    renderWithProviders(
      <RentalForm
        selectedTool={mockJackhammer}
        agreement={mockAgreement}
        onSubmit={onSubmit}
        onFormChange={onFormChange}
      />
    );

    // Open checkout date popover
    const checkoutButton = screen.getByRole('button', {
      name: 'Checkout Date',
    });
    await user.click(checkoutButton);

    // Calculate months to navigate back
    const targetDate = parse('2015-09-03', 'yyyy-MM-dd', new Date());
    const currentDate = new Date();
    const monthsToGoBack = differenceInMonths(currentDate, targetDate);

    // Navigate to September 2015
    const dialog = screen.getByRole('dialog');
    const prevMonthButton = within(dialog).getByRole('button', {
      name: 'Go to previous month',
    });

    // Click previous month button multiple times to reach September 2015
    for (let i = 0; i < monthsToGoBack; i++) {
      await user.click(prevMonthButton);
    }

    // Select September 3rd
    const dateCells = within(dialog).getAllByRole('gridcell');
    const sept3rd = dateCells.find(
      (cell) =>
        cell.textContent === '3' && !cell.className.includes('day-outside')
    );

    if (!sept3rd) {
      throw new Error('Could not find date cell for September 3rd');
    }
    await user.click(sept3rd);

    // Open return date picker
    const returnButton = screen.getByRole('button', { name: 'Return Date' });
    await user.click(returnButton);

    // Select September 8th
    const returnDialog = screen.getByRole('dialog');
    const returnDateCells = within(returnDialog).getAllByRole('gridcell');
    const sept8th = returnDateCells.find(
      (cell) =>
        cell.textContent === '8' && !cell.className.includes('day-outside')
    );

    if (!sept8th) {
      throw new Error('Could not find date cell for September 8th');
    }
    await user.click(sept8th);

    // Set 101% discount
    const discountInput = screen.getByRole('spinbutton', {
      name: /discount/i,
    });
    await user.clear(discountInput);
    await user.type(discountInput, '101');

    // Submit form
    const submitButton = screen.getByRole('button', {
      name: /generate rental agreement/i,
    });

    // Verify button is disabled
    expect(submitButton).toBeDisabled();

    // Verify error message on screen
    //Discount percent is not in the range 0-100
    const errorMessage = await screen.findByText(
      /discount percent is not in the range/i
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('calculates rental agreement for LADW 7/2/20-7/4/20 with 10% discount', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    const onFormChange = jest.fn();

    const mockLadder = {
      code: 'LADW',
      type: 'ladder',
      brand: 'Werner',
      charge: {
        dailyCharge: 1.99,
        weekdayCharge: true,
        weekendCharge: true,
        holidayCharge: false,
      },
    };

    // Create a mock agreement object
    const mockAgreement: RentalAgreement = {
      toolCode: 'LADW',
      toolType: 'ladder',
      checkoutDate: '2020-07-02',
      returnDate: '2020-07-04',
      dailyCharge: 1.99,
      chargeableDays: 2,
      prediscountAmount: 3.98,
      discountPercent: 10,
      discountAmount: 0.4,
      finalAmount: 3.58,
    };

    renderWithProviders(
      <RentalForm
        selectedTool={mockLadder}
        agreement={mockAgreement}
        onSubmit={onSubmit}
        onFormChange={onFormChange}
      />
    );

    // Open checkout date popover
    const checkoutButton = screen.getByRole('button', {
      name: 'Checkout Date',
    });
    await user.click(checkoutButton);

    // Calculate months to navigate back
    const targetDate = parse('2020-07-02', 'yyyy-MM-dd', new Date());
    const currentDate = new Date();
    const monthsToGoBack = differenceInMonths(currentDate, targetDate);

    // Navigate to July 2020
    const dialog = screen.getByRole('dialog');
    const prevMonthButton = within(dialog).getByRole('button', {
      name: 'Go to previous month',
    });

    // Click previous month button multiple times to reach July 2020
    for (let i = 0; i < monthsToGoBack; i++) {
      await user.click(prevMonthButton);
    }

    // Select July 2nd
    const dateCells = within(dialog).getAllByRole('gridcell');
    const july2nd = dateCells.find(
      (cell) =>
        cell.textContent === '2' && !cell.className.includes('day-outside')
    );

    if (!july2nd) {
      throw new Error('Could not find date cell for July 2nd');
    }
    await user.click(july2nd);

    // Open return date picker
    const returnButton = screen.getByRole('button', { name: 'Return Date' });
    await user.click(returnButton);

    // Select July 4th
    const returnDialog = screen.getByRole('dialog');
    const returnDateCells = within(returnDialog).getAllByRole('gridcell');
    const july4th = returnDateCells.find(
      (cell) =>
        cell.textContent === '4' && !cell.className.includes('day-outside')
    );

    if (!july4th) {
      throw new Error('Could not find date cell for July 4th');
    }
    await user.click(july4th);

    // Set 10% discount
    const discountInput = screen.getByRole('spinbutton', { name: /discount/i });
    await user.clear(discountInput);
    await user.type(discountInput, '10');

    // Submit form
    const submitButton = screen.getByRole('button', {
      name: /generate rental agreement/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      const [[formData]] = onSubmit.mock.calls;
      expect(formData).toEqual({
        toolCode: 'LADW',
        checkoutDate: expect.any(String),
        returnDate: expect.any(String),
        discountPercent: 10,
      });
    });
    // Verify the rental agreement preview
    const preview = screen.getByText('Rental Agreement Preview').parentElement
      ?.parentElement;

    if (!preview) {
      throw new Error('Preview section not found');
    }

    const values = within(preview);
    const chargeableDaysRow = values
      .getByText('Chargeable Days:')
      .closest('div');
    const dailyChargeRow = values
      .getByText('Daily Rental Charge:')
      .closest('div');
    const prediscountRow = values
      .getByText('Pre-discount Amount:')
      .closest('div');
    const discountAmountRow = values
      .getByText('Discount Amount:')
      .closest('div');
    const finalAmountRow = values.getByText('Final Amount:').closest('div');

    if (
      !chargeableDaysRow ||
      !dailyChargeRow ||
      !prediscountRow ||
      !discountAmountRow ||
      !finalAmountRow
    ) {
      throw new Error('Could not find all required rows');
    }

    expect(within(chargeableDaysRow).getByText('2')).toBeInTheDocument();
    expect(within(dailyChargeRow).getByText('$1.99')).toBeInTheDocument();
    expect(within(prediscountRow).getByText('$3.98')).toBeInTheDocument();
    expect(within(discountAmountRow).getByText('$0.40')).toBeInTheDocument();
    expect(within(finalAmountRow).getByText('$3.58')).toBeInTheDocument();
  });

  it('calculates rental agreement for CHNS 7/2/15-7/7/15 with 25% discount', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    const onFormChange = jest.fn();

    const mockChainsaw = {
      code: 'CHNS',
      type: 'chainsaw',
      brand: 'Stihl',
      charge: {
        dailyCharge: 1.49,
        weekdayCharge: true,
        weekendCharge: false,
        holidayCharge: true,
      },
    };

    // Create a mock agreement object
    const mockAgreement: RentalAgreement = {
      toolCode: 'CHNS',
      toolType: 'chainsaw',
      checkoutDate: '2015-07-02',
      returnDate: '2015-07-07',
      dailyCharge: 1.49,
      chargeableDays: 4,
      prediscountAmount: 5.96,
      discountPercent: 25,
      discountAmount: 1.49,
      finalAmount: 4.47,
    };

    renderWithProviders(
      <RentalForm
        selectedTool={mockChainsaw}
        agreement={mockAgreement}
        onSubmit={onSubmit}
        onFormChange={onFormChange}
      />
    );

    // Open checkout date popover
    const checkoutButton = screen.getByRole('button', {
      name: 'Checkout Date',
    });
    await user.click(checkoutButton);

    // Calculate months to navigate back
    const targetDate = parse('2020-07-02', 'yyyy-MM-dd', new Date());
    const currentDate = new Date();
    const monthsToGoBack = differenceInMonths(currentDate, targetDate);

    // Navigate to July 2015
    const dialog = screen.getByRole('dialog');
    const prevMonthButton = within(dialog).getByRole('button', {
      name: 'Go to previous month',
    });

    // Click previous month button multiple times to reach July 2020
    for (let i = 0; i < monthsToGoBack; i++) {
      await user.click(prevMonthButton);
    }

    // Select July 2nd
    const dateCells = within(dialog).getAllByRole('gridcell');
    const july2nd = dateCells.find(
      (cell) =>
        cell.textContent === '2' && !cell.className.includes('day-outside')
    );

    if (!july2nd) {
      throw new Error('Could not find date cell for July 2nd');
    }
    await user.click(july2nd);

    // Open return date picker
    const returnButton = screen.getByRole('button', { name: 'Return Date' });
    await user.click(returnButton);

    // Select July 7th
    const returnDialog = screen.getByRole('dialog');
    const returnDateCells = within(returnDialog).getAllByRole('gridcell');
    const july7th = returnDateCells.find(
      (cell) =>
        cell.textContent === '7' && !cell.className.includes('day-outside')
    );

    if (!july7th) {
      throw new Error('Could not find date cell for July 7th');
    }
    await user.click(july7th);

    // Set 25% discount
    const discountInput = screen.getByRole('spinbutton', { name: /discount/i });
    await user.clear(discountInput);
    await user.type(discountInput, '25');

    // Submit form
    const submitButton = screen.getByRole('button', {
      name: /generate rental agreement/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      const [[formData]] = onSubmit.mock.calls;
      expect(formData).toEqual({
        toolCode: 'CHNS',
        checkoutDate: expect.any(String),
        returnDate: expect.any(String),
        discountPercent: 25,
      });
    });
    // Verify the rental agreement preview
    const preview = screen.getByText('Rental Agreement Preview').parentElement
      ?.parentElement;

    if (!preview) {
      throw new Error('Preview section not found');
    }

    const values = within(preview);
    const chargeableDaysRow = values
      .getByText('Chargeable Days:')
      .closest('div');
    const dailyChargeRow = values
      .getByText('Daily Rental Charge:')
      .closest('div');
    const prediscountRow = values
      .getByText('Pre-discount Amount:')
      .closest('div');
    const discountAmountRow = values
      .getByText('Discount Amount:')
      .closest('div');
    const finalAmountRow = values.getByText('Final Amount:').closest('div');

    if (
      !chargeableDaysRow ||
      !dailyChargeRow ||
      !prediscountRow ||
      !discountAmountRow ||
      !finalAmountRow
    ) {
      throw new Error('Could not find all required rows');
    }

    expect(within(chargeableDaysRow).getByText('4')).toBeInTheDocument();
    expect(within(dailyChargeRow).getByText('$1.49')).toBeInTheDocument();
    expect(within(prediscountRow).getByText('$5.96')).toBeInTheDocument();
    expect(within(discountAmountRow).getByText('$1.49')).toBeInTheDocument();
    expect(within(finalAmountRow).getByText('$4.47')).toBeInTheDocument();
  });

  it('calculates rental agreement for JAKD 9/3/15-9/9/15 with 0% discount', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    const onFormChange = jest.fn();

    const mockJackhammer = {
      code: 'JAKD',
      type: 'jackhammer',
      brand: 'DeWalt',
      charge: {
        dailyCharge: 2.99,
        weekdayCharge: true,
        weekendCharge: false,
        holidayCharge: false,
      },
    };

    const mockAgreement: RentalAgreement = {
      toolCode: 'JAKD',
      toolType: 'jackhammer',
      checkoutDate: '2015-09-03',
      returnDate: '2015-09-09',
      dailyCharge: 2.99,
      chargeableDays: 3,
      prediscountAmount: 8.97,
      discountPercent: 0,
      discountAmount: 0,
      finalAmount: 8.97,
    };

    renderWithProviders(
      <RentalForm
        selectedTool={mockJackhammer}
        agreement={mockAgreement}
        onSubmit={onSubmit}
        onFormChange={onFormChange}
      />
    );

    // Open checkout date popover
    const checkoutButton = screen.getByRole('button', {
      name: 'Checkout Date',
    });
    await user.click(checkoutButton);

    // Calculate months to navigate back
    const targetDate = parse('2015-09-03', 'yyyy-MM-dd', new Date());
    const currentDate = new Date();
    const monthsToGoBack = differenceInMonths(currentDate, targetDate);

    // Navigate to September 2015
    const dialog = screen.getByRole('dialog');
    const prevMonthButton = within(dialog).getByRole('button', {
      name: 'Go to previous month',
    });

    // Click previous month button multiple times to reach September 2015
    for (let i = 0; i < monthsToGoBack; i++) {
      await user.click(prevMonthButton);
    }

    // Select September 3rd
    const dateCells = within(dialog).getAllByRole('gridcell');
    const sept3rd = dateCells.find(
      (cell) =>
        cell.textContent === '3' && !cell.className.includes('day-outside')
    );

    if (!sept3rd) {
      throw new Error('Could not find date cell for September 3rd');
    }
    await user.click(sept3rd);

    // Open return date picker
    const returnButton = screen.getByRole('button', { name: 'Return Date' });
    await user.click(returnButton);

    // Select September 9th
    const returnDialog = screen.getByRole('dialog');
    const returnDateCells = within(returnDialog).getAllByRole('gridcell');
    const sept9th = returnDateCells.find(
      (cell) =>
        cell.textContent === '9' && !cell.className.includes('day-outside')
    );

    if (!sept9th) {
      throw new Error('Could not find date cell for September 9th');
    }
    await user.click(sept9th);

    // Set 0% discount
    const discountInput = screen.getByRole('spinbutton', { name: /discount/i });
    await user.clear(discountInput);
    await user.type(discountInput, '0');

    // Submit form
    const submitButton = screen.getByRole('button', {
      name: /generate rental agreement/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      const [[formData]] = onSubmit.mock.calls;
      expect(formData).toEqual({
        toolCode: 'JAKD',
        checkoutDate: expect.any(String),
        returnDate: expect.any(String),
        discountPercent: 0,
      });
    });
    // Verify the rental agreement preview
    const preview = screen.getByText('Rental Agreement Preview').parentElement
      ?.parentElement;

    if (!preview) {
      throw new Error('Preview section not found');
    }

    const values = within(preview);
    const chargeableDaysRow = values
      .getByText('Chargeable Days:')
      .closest('div');
    const dailyChargeRow = values
      .getByText('Daily Rental Charge:')
      .closest('div');
    const prediscountRow = values
      .getByText('Pre-discount Amount:')
      .closest('div');
    const discountAmountRow = values
      .getByText('Discount Amount:')
      .closest('div');
    const finalAmountRow = values.getByText('Final Amount:').closest('div');

    if (
      !chargeableDaysRow ||
      !dailyChargeRow ||
      !prediscountRow ||
      !discountAmountRow ||
      !finalAmountRow
    ) {
      throw new Error('Could not find all required rows');
    }

    expect(within(chargeableDaysRow).getByText('3')).toBeInTheDocument();
    expect(within(dailyChargeRow).getByText('$2.99')).toBeInTheDocument();
    expect(within(prediscountRow).getByText('$8.97')).toBeInTheDocument();
    expect(within(discountAmountRow).getByText('$0.00')).toBeInTheDocument();
    expect(within(finalAmountRow).getByText('$8.97')).toBeInTheDocument();
  });

  it('calculates rental agreement for JAKR 7/2/15-7/11/15 with 0% discount', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    const onFormChange = jest.fn();

    const mockJackhammer = {
      code: 'JAKR',
      type: 'jackhammer',
      brand: 'Ridgid',
      charge: {
        dailyCharge: 2.99,
        weekdayCharge: true,
        weekendCharge: false,
        holidayCharge: false,
      },
    };

    const mockAgreement: RentalAgreement = {
      toolCode: 'JAKR',
      toolType: 'jackhammer',
      checkoutDate: '2015-07-02',
      returnDate: '2015-07-11',
      dailyCharge: 2.99,
      chargeableDays: 7,
      prediscountAmount: 20.93,
      discountPercent: 0,
      discountAmount: 0,
      finalAmount: 20.93,
    };

    renderWithProviders(
      <RentalForm
        selectedTool={mockJackhammer}
        agreement={mockAgreement}
        onSubmit={onSubmit}
        onFormChange={onFormChange}
      />
    );

    // Open checkout date popover
    const checkoutButton = screen.getByRole('button', {
      name: 'Checkout Date',
    });
    await user.click(checkoutButton);

    // Calculate months to navigate back
    const targetDate = parse('2015-07-02', 'yyyy-MM-dd', new Date());
    const currentDate = new Date();
    const monthsToGoBack = differenceInMonths(currentDate, targetDate);

    // Navigate to July 2015
    const dialog = screen.getByRole('dialog');
    const prevMonthButton = within(dialog).getByRole('button', {
      name: 'Go to previous month',
    });

    // Click previous month button multiple times to reach July 2015
    for (let i = 0; i < monthsToGoBack; i++) {
      await user.click(prevMonthButton);
    }

    // Select July 2nd
    const dateCells = within(dialog).getAllByRole('gridcell');
    const july2nd = dateCells.find(
      (cell) =>
        cell.textContent === '2' && !cell.className.includes('day-outside')
    );

    if (!july2nd) {
      throw new Error('Could not find date cell for September 2rd');
    }
    await user.click(july2nd);

    // Open return date picker
    const returnButton = screen.getByRole('button', { name: 'Return Date' });
    await user.click(returnButton);

    // Select July 11th
    const returnDialog = screen.getByRole('dialog');
    const returnDateCells = within(returnDialog).getAllByRole('gridcell');
    const july11th = returnDateCells.find(
      (cell) =>
        cell.textContent === '11' && !cell.className.includes('day-outside')
    );

    if (!july11th) {
      throw new Error('Could not find date cell for July 11th');
    }
    await user.click(july11th);

    // Set 0% discount
    const discountInput = screen.getByRole('spinbutton', {
      name: /discount/i,
    });
    await user.clear(discountInput);
    await user.type(discountInput, '0');

    // Submit form
    const submitButton = screen.getByRole('button', {
      name: /generate rental agreement/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      const [[formData]] = onSubmit.mock.calls;
      expect(formData).toEqual({
        toolCode: 'JAKR',
        checkoutDate: expect.any(String),
        returnDate: expect.any(String),
        discountPercent: 0,
      });
    });
    // Verify the rental agreement preview
    const preview = screen.getByText('Rental Agreement Preview').parentElement
      ?.parentElement;

    if (!preview) {
      throw new Error('Preview section not found');
    }

    const values = within(preview);
    const chargeableDaysRow = values
      .getByText('Chargeable Days:')
      .closest('div');
    const dailyChargeRow = values
      .getByText('Daily Rental Charge:')
      .closest('div');
    const prediscountRow = values
      .getByText('Pre-discount Amount:')
      .closest('div');
    const discountAmountRow = values
      .getByText('Discount Amount:')
      .closest('div');
    const finalAmountRow = values.getByText('Final Amount:').closest('div');

    if (
      !chargeableDaysRow ||
      !dailyChargeRow ||
      !prediscountRow ||
      !discountAmountRow ||
      !finalAmountRow
    ) {
      throw new Error('Could not find all required rows');
    }

    expect(within(chargeableDaysRow).getByText('7')).toBeInTheDocument();
    expect(within(dailyChargeRow).getByText('$2.99')).toBeInTheDocument();
    expect(within(prediscountRow).getByText('$20.93')).toBeInTheDocument();
    expect(within(discountAmountRow).getByText('$0.00')).toBeInTheDocument();
    expect(within(finalAmountRow).getByText('$20.93')).toBeInTheDocument();
  });

  it('calculates rental agreement for JAKR 7/2/20-7/6/20 with 50% discount', async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    const onFormChange = jest.fn();

    const mockJackhammer = {
      code: 'JAKR',
      type: 'jackhammer',
      brand: 'Ridgid',
      charge: {
        dailyCharge: 2.99,
        weekdayCharge: true,
        weekendCharge: false,
        holidayCharge: false,
      },
    };

    const mockAgreement: RentalAgreement = {
      toolCode: 'JAKR',
      toolType: 'jackhammer',
      checkoutDate: '2020-07-02',
      returnDate: '2020-07-06',
      dailyCharge: 2.99,
      chargeableDays: 2,
      prediscountAmount: 5.98,
      discountPercent: 50,
      discountAmount: 2.99,
      finalAmount: 2.99,
    };

    renderWithProviders(
      <RentalForm
        selectedTool={mockJackhammer}
        agreement={mockAgreement}
        onSubmit={onSubmit}
        onFormChange={onFormChange}
      />
    );

    // Open checkout date popover
    const checkoutButton = screen.getByRole('button', {
      name: 'Checkout Date',
    });
    await user.click(checkoutButton);

    // Calculate months to navigate back
    const targetDate = parse('2020-07-02', 'yyyy-MM-dd', new Date());
    const currentDate = new Date();
    const monthsToGoBack = differenceInMonths(currentDate, targetDate);

    // Navigate to July 2020
    const dialog = screen.getByRole('dialog');
    const prevMonthButton = within(dialog).getByRole('button', {
      name: 'Go to previous month',
    });

    // Click previous month button multiple times to reach July 2015
    for (let i = 0; i < monthsToGoBack; i++) {
      await user.click(prevMonthButton);
    }

    // Select July 2nd
    const dateCells = within(dialog).getAllByRole('gridcell');
    const july2nd = dateCells.find(
      (cell) =>
        cell.textContent === '2' && !cell.className.includes('day-outside')
    );

    if (!july2nd) {
      throw new Error('Could not find date cell for September 2nd');
    }
    await user.click(july2nd);

    // Open return date picker
    const returnButton = screen.getByRole('button', { name: 'Return Date' });
    await user.click(returnButton);

    // Select July 6th
    const returnDialog = screen.getByRole('dialog');
    const returnDateCells = within(returnDialog).getAllByRole('gridcell');
    const july6th = returnDateCells.find(
      (cell) =>
        cell.textContent === '6' && !cell.className.includes('day-outside')
    );

    if (!july6th) {
      throw new Error('Could not find date cell for July 6th');
    }
    await user.click(july6th);

    // Set 50% discount
    const discountInput = screen.getByRole('spinbutton', {
      name: /discount/i,
    });
    await user.clear(discountInput);
    await user.type(discountInput, '50');

    // Submit form
    const submitButton = screen.getByRole('button', {
      name: /generate rental agreement/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      const [[formData]] = onSubmit.mock.calls;
      expect(formData).toEqual({
        toolCode: 'JAKR',
        checkoutDate: expect.any(String),
        returnDate: expect.any(String),
        discountPercent: 50,
      });
    });
    // Verify the rental agreement preview
    const preview = screen.getByText('Rental Agreement Preview').parentElement
      ?.parentElement;

    if (!preview) {
      throw new Error('Preview section not found');
    }

    const values = within(preview);
    const chargeableDaysRow = values
      .getByText('Chargeable Days:')
      .closest('div');
    const dailyChargeRow = values
      .getByText('Daily Rental Charge:')
      .closest('div');
    const prediscountRow = values
      .getByText('Pre-discount Amount:')
      .closest('div');
    const discountAmountRow = values
      .getByText('Discount Amount:')
      .closest('div');
    const finalAmountRow = values.getByText('Final Amount:').closest('div');

    if (
      !chargeableDaysRow ||
      !dailyChargeRow ||
      !prediscountRow ||
      !discountAmountRow ||
      !finalAmountRow
    ) {
      throw new Error('Could not find all required rows');
    }

    expect(within(chargeableDaysRow).getByText('2')).toBeInTheDocument();
    expect(within(dailyChargeRow).getByText('$2.99')).toBeInTheDocument();
    expect(within(prediscountRow).getByText('$5.98')).toBeInTheDocument();
    expect(within(discountAmountRow).getByText('$2.99')).toBeInTheDocument();
    expect(within(finalAmountRow).getByText('$2.99')).toBeInTheDocument();
  });
});
