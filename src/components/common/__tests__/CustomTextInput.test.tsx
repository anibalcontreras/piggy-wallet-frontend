import React from 'react';
import { render, fireEvent, type RenderResult } from '@testing-library/react-native';
import { Formik } from 'formik';
import CustomTextInput from '../CustomTextInput';

const renderWithFormik = ({ ...props }): RenderResult => {
  return render(
    <Formik initialValues={{ testInput: '' }} onSubmit={jest.fn()}>
      <CustomTextInput
        field={{ name: 'testInput', onBlur: jest.fn(), onChange: jest.fn(), value: '' }}
        form={{ errors: {}, touched: {}, setFieldTouched: jest.fn() }}
        {...props}
      />
    </Formik>
  );
};

describe('CustomTextInput Component', () => {
  it('renders custom text input correctly', () => {
    const { getByPlaceholderText } = renderWithFormik({ placeholder: 'Test Placeholder' });
    expect(getByPlaceholderText('Test Placeholder')).toBeTruthy();
  });

  it('displays error message when there is an error', () => {
    const { getByText } = renderWithFormik({
      field: { name: 'testInput', onBlur: jest.fn(), onChange: jest.fn(), value: '' },
      form: {
        errors: { testInput: 'Error message' },
        touched: { testInput: true },
        setFieldTouched: jest.fn(),
      },
    });

    expect(getByText('Error message')).toBeTruthy();
  });

  it('handles onBlur event', () => {
    const mockOnBlur = jest.fn();
    const { getByPlaceholderText } = renderWithFormik({
      field: { name: 'testInput', onBlur: mockOnBlur, onChange: jest.fn(), value: '' },
      form: { errors: {}, touched: {}, setFieldTouched: jest.fn() },
      placeholder: 'Test Placeholder',
    });

    fireEvent(getByPlaceholderText('Test Placeholder'), 'blur');
    expect(mockOnBlur).toHaveBeenCalledWith('testInput');
  });

  it('calls Formik onChange with the correct value on text change', () => {
    const mockOnChange = jest.fn(() => jest.fn());
    const { getByPlaceholderText } = renderWithFormik({
      field: {
        name: 'testInput',
        onBlur: jest.fn(),
        onChange: mockOnChange,
        value: '',
      },
      form: {
        errors: {},
        touched: {},
        setFieldTouched: jest.fn(),
      },
      placeholder: 'Test Placeholder',
    });

    const input = getByPlaceholderText('Test Placeholder');
    fireEvent.changeText(input, 'new value');

    expect(mockOnChange).toHaveBeenCalledWith('testInput');
    expect(mockOnChange.mock.results[0].value).toHaveBeenCalledWith('new value');
  });
});
