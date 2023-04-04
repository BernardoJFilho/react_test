import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('testa a pokedex', () => {
  test('testa se contem um h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const textHome = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(textHome).toBeInTheDocument();
  });
  test('testa se tem dois paragrafos com texto sombre a pokedex', () => {
    renderWithRouter(<About />);
    const paragrafoOne = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const paragrafoTwo = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    expect(paragrafoOne).toBeInTheDocument();
    expect(paragrafoTwo).toBeInTheDocument();
  });
  test('testa se a pagina tem uma imagem em especifico', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
