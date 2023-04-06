import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa componente Pokedex', () => {
  test('testa se a pagina contem um heading com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(title).toBeInTheDocument();
  });
  test('testa se o proximo pokemon da lista é exibido ao clicar no botão', () => {
    renderWithRouter(<App />);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const proxButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(proxButton);
    const secondPokemon = screen.getByText(/charmander/i);
    expect(secondPokemon).toBeInTheDocument();
    userEvent.click(proxButton);
    const terceiroPokemon = screen.getByText(/caterpie/i);
    expect(terceiroPokemon).toBeInTheDocument();
  });
  test('testa se aparece apenas um pokemon', () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getAllByRole('link', { name: /more details/i });
    expect(buttonDetails.length).toBe(1);
  });
  test('testa se os botões de filtro estão na pagina', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.map((typeButton) => {
      const sla = screen.getByRole('button', { name: typeButton.innerHTML });
      expect(sla).toBeInTheDocument();
      userEvent.click(sla);
      const typeNames = screen.getAllByText(typeButton.innerHTML);
      expect(typeNames.length).toBe(2);
      return sla;
    });
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  // xtest('', () => {

  // });
});
