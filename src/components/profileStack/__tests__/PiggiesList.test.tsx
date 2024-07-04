import React from 'react';
import { render } from '@testing-library/react-native';
import PiggiesList from '@/components/profileStack/PiggiesList';
import type { Backend } from '@/types';

const mockPiggies: Backend.User[] = [
  { userId: '1', firstName: 'Piggy 1' },
  { userId: '2', firstName: 'Piggy 2' },
];

describe('PiggiesList', () => {
  it('should display piggies when piggies are provided', () => {
    const { getByText } = render(<PiggiesList piggies={mockPiggies} />);

    mockPiggies.forEach((piggy) => {
      expect(getByText(piggy.firstName)).toBeTruthy();
    });
  });

  it('should display "No has agregado piggies" when no piggies are provided', () => {
    const { getByText } = render(<PiggiesList piggies={[]} />);

    expect(getByText('No has agregado piggies')).toBeTruthy();
  });
});
