import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ExpenseCard from '@/components/expenses/ExpenseCard';

jest.mock('@expo/vector-icons', () => {
  const { View } = require('react-native');
  return {
    AntDesign: View,
  };
});

describe('ExpenseCard', () => {
  const mockExpense = {
    id: 1,
    amount: 10000,
    category: 1,
    description: 'Test expense',
  };

  const mockCategories = [
    { id: 1, name: 'Food' },
    { id: 2, name: 'Transport' },
  ];

  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnLook = jest.fn();

  it('should render the ExpenseCard component', () => {
    const { getByText } = render(
      <ExpenseCard
        expense={mockExpense}
        categories={mockCategories}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onLook={mockOnLook}
      />
    );

    expect(getByText('$10.000')).toBeTruthy();
    expect(getByText('Food')).toBeTruthy();
  });

  it('should call onDelete when delete button is pressed', () => {
    const { getByTestId } = render(
      <ExpenseCard
        expense={mockExpense}
        categories={mockCategories}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onLook={mockOnLook}
      />
    );

    fireEvent.press(getByTestId('delete-button'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockExpense);
  });

  it('should call onEdit when edit button is pressed', () => {
    const { getByTestId } = render(
      <ExpenseCard
        expense={mockExpense}
        categories={mockCategories}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onLook={mockOnLook}
      />
    );

    fireEvent.press(getByTestId('edit-button'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockExpense);
  });

  it('should call onLook when the card is pressed', () => {
    const { getByTestId } = render(
      <ExpenseCard
        expense={mockExpense}
        categories={mockCategories}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        onLook={mockOnLook}
      />
    );

    fireEvent.press(getByTestId('look-button'));
    expect(mockOnLook).toHaveBeenCalledWith(mockExpense);
  });
});
