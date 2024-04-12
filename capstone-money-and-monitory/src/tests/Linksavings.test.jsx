import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import LinkSavings from '../components/LinkSavings/LinkSavings';
import { toBeEnabled } from '@testing-library/jest-dom/matchers';




test('renders LinkSavings component without crashing', () => {
  render(<LinkSavings/>);
});


test('form input fields render and can be interacted with', () => {
  render(<LinkSavings />);
  
  // Test first name input
  const firstNameInput = screen.getByLabelText(/First Name/i);
  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  expect(firstNameInput.value).toBe('John');

  // Test last name input
  const lastNameInput = screen.getByLabelText(/Last Name/i);
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  expect(lastNameInput.value).toBe('Doe');

  const emailInput = screen.getByLabelText(/Email-ID/i);
  fireEvent.change(emailInput, { target: { value: 'jd@gmail.com' } });
  expect(email.value).toBe('jd@gmail.com');

});


test('form submission works', () => {
  const { getByLabelText, getByText } = render(<LinkSavings />);
  
  // Fill in form fields
  fireEvent.change(getByLabelText('First Name'), { target: { value: 'John' } });
  fireEvent.change(getByLabelText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(getByLabelText('Savings Account balance'),{target:{value: 0.0}});
  fireEvent.change(getByLabelText('Customer Id'),{target:{value:56789091}});
  fireEvent.change(getByLabelText('Primary Account Number-1'),{target:{value: 98765432}});
  fireEvent.change(getByLabelText('Primary Account Number-2'),{target:{value: 98675432}});
  fireEvent.change(getByLabelText('Email-ID'),{target:{value: 'jd@gmail.com'}});
  fireEvent.change(getByLabelText('I wish to enable the Round Up service and transfer the extras to my savings account.'),{target:{value: toBeEnabled}})
  
 
  fireEvent.click(getByText('Link Accounts'));
  
});
