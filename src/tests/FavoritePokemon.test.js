import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

describe('testa FavoritePokemon', () => {
  test('testa se aparece o texto No favorite Pokémon found na pagina Favorite Pokemon', () => {
    renderWithRouter(<FavoritePokemon />);
    const textNoPokemon = screen.getByText(/no favorite pokémon found/i);
    expect(textNoPokemon).toBeInTheDocument();
  });
  test('testa se ao favoritar pokemon ele realmente aparece favoritado', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    const namePokemon = screen.getByText(/pikachu/i);
    expect(moreDetails).toBeInTheDocument();
    expect(namePokemon).toBeInTheDocument();
    userEvent.click(moreDetails);
    const testSumaryText = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(testSumaryText).toBeInTheDocument();
    const buttonFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(buttonFavorite);
    const abaFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(abaFavorite);
    const imgPokemonInFavoritePage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgPokemonInFavoritePage).toBeInTheDocument();
  });
});
