import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('testa page NotFound', () => {
  test('', () => {
    renderWithRouter(<NotFound />);
    const textNotFound = screen.getByRole('heading', { name: /page requested not found/i, level: 2 });
    expect(textNotFound).toBeInTheDocument();
  });
  test('', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
