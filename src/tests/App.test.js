import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa <App />', () => {
  test('testa se Home esta na tela', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
  });
  test('testa se about esta na tela', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
  });
  test('testa se favoritePokemon esta na tela', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(linkFavorite).toBeInTheDocument();
  });
  test('test se a aplicação é direciona a pagina home ao clicar em home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const textHome = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(textHome).toBeInTheDocument();
  });
  test('test se a aplicação é direciona a pagina about ao clicar em about', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const textAbout = screen.getByRole('heading', { name: /about pokédex/i });
    expect(textAbout).toBeInTheDocument();
  });
  test('test se a aplicação é direciona a pagina /favorite ao clicar em Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkFavorite);
    const textFavorite = screen.getByRole('heading', { name: /favorite pokémon/i });
    expect(textFavorite).toBeInTheDocument();
  });
  test('test se ao não encontrar a pagina mostra notFound', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('opa');
    });
    const textNatela = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(textNatela).toBeInTheDocument();
  });
});
