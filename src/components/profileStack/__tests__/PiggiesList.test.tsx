// PiggiesList.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import PiggiesList from '@/components/profileStack/PiggiesList';
import type { Backend } from '@/types';

const mockPiggies: Backend.User[] = [
  { id: 1, fullName: 'Piggy 1' },
  { id: 2, fullName: 'Piggy 2' },
];

describe('PiggiesList', () => {
  // it('should render the PiggiesList component', () => {
  //   const { getByText } = render(<PiggiesList piggies={mockPiggies} />);

  //   expect(getByText('Tus Piggies')).toBeTruthy();
  // });

  it('should display piggies when piggies are provided', () => {
    const { getByText } = render(<PiggiesList piggies={mockPiggies} />);

    mockPiggies.forEach((piggy) => {
      expect(getByText(piggy.fullName)).toBeTruthy();
    });
  });

  it('should display "No has agregado piggies" when no piggies are provided', () => {
    const { getByText } = render(<PiggiesList piggies={[]} />);

    expect(getByText('No has agregado piggies')).toBeTruthy();
  });
});
