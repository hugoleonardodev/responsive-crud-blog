import { screen, cleanup, fireEvent } from '@testing-library/react';
import Favorites from './Favorites';
import renderWithRouter from '../configs/renderWithRouter';
import userEvent from '@testing-library/user-event';
import carouselInitialState from '../data/carouselInitialState';
import { createMemoryHistory } from 'history';

let newHistory;

beforeAll(() => {
  newHistory = createMemoryHistory();
  newHistory.push('/favorites');
});

beforeEach(() => {
  localStorage.setItem('blog', JSON.stringify(carouselInitialState));
});

afterEach(() => {
  cleanup();
});

describe('Read.js page', () => {
  test('should render', () => {
    renderWithRouter(<Favorites history={newHistory} />, '/favorites');

    const header = screen.getAllByText(/article/i);
    expect(header.length).toBe(2);
    expect(header[0]).toBeInTheDocument();
  });

  test('should be able to type on texts inputs', () => {
    renderWithRouter(<Favorites history={newHistory} />, '/favorites');
  });

  test('filtering by quer `article five`, expected to be empty', () => {
    renderWithRouter(<Favorites history={newHistory} />, '/favorites');

    const cardRows = screen.getAllByTestId(/card-row-/i);
    expect(cardRows.length).toBe(3); // to change this count check Favorites state
    expect(cardRows[0].childElementCount).toBe(1);

    const filterInput = screen.getByTestId('filtering-input');

    userEvent.type(filterInput, 'article five');

    const emptyCards = screen.getAllByTestId(/card-row-/i);
    expect(emptyCards[0].childElementCount).toBe(0);
  });
});
