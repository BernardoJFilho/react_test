import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa <Pokemon />', () => {
  test('testa se é renderizado um card com as informações do pokemon', () => {
    renderWithRouter(<App />);
    const buttonFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonFire);
    const name = screen.getByText(/charmander/i);
    const type = screen.getAllByText(/fire/i)[0];
    const average = screen.getByText(/average weight: 8\.5 kg/i);
    const img = screen.getByRole('img', { name: /charmander sprite/i });
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(average).toBeInTheDocument();
    expect(img.src).toContain('https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png');
  });
  test('verifica o titulo da pagina e testa se condiz com o pokemon clicado', () => {
    renderWithRouter(<App />);
    const buttonFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonFire);
    const buttonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(buttonDetails);
    const titlePokemon = screen.getByRole('heading', { name: /charmander details/i });
    expect(titlePokemon).toBeInTheDocument();
    const typePokemon = screen.getByText(/fire/i);
    expect(typePokemon).toBeInTheDocument();
  });
  test('testa se ao clicar em more details vai para a pagina correta com as informações do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const buttonFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonFire);
    const buttonDetails = screen.getByRole('link', { name: /more details/i });
    expect(buttonDetails).toBeInTheDocument();
    userEvent.click(buttonDetails);
    expect(history.location.pathname).toBe('/pokemon/4');
  });
  test('testa se ao clicar em favorito aparece um icone de estrela', () => {
    renderWithRouter(<App />);
    const buttonFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonFire);
    const buttonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(buttonDetails);
    const buttonFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(buttonFavorite);
    const star = screen.getByRole('img', { name: /charmander is marked as favorite/i });
    expect(star).toBeInTheDocument();
    expect(star.src).toContain('/star-icon.svg');
    expect(star.alt).toContain('Charmander is marked as favorite');
  });
});
