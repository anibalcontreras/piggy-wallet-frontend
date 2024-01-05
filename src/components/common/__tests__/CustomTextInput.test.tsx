import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import CustomTextInput from '../CustomTextInput';

describe('CustomTextInput Component', () => {
  it('renders custom text input correctly', () => {
    const tree = renderer.create(<CustomTextInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('passes the correct props to TextInput', () => {
    const placeholderText = 'Test Placeholder';
    const tree = renderer.create(<CustomTextInput placeholder={placeholderText} />).toJSON();
    expect(tree).toHaveProperty(['props', 'placeholder'], placeholderText);
  });

  it('handles onChangeText event', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomTextInput onChangeText={mockOnChangeText} placeholder="Test Placeholder" />
    );

    fireEvent.changeText(getByPlaceholderText('Test Placeholder'), 'New Text');
    expect(mockOnChangeText).toHaveBeenCalledWith('New Text');
  });
});
