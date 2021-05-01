import { screen, cleanup } from '@testing-library/react';
import List from './List';
import renderWithRouter from '../configs/renderWithRouter';
import userEvent from '@testing-library/user-event';
import carouselInitialState from '../data/carouselInitialState';
import { createMemoryHistory } from 'history';

let newHistory;

beforeAll(() => {
  newHistory = createMemoryHistory();
  newHistory.push('/list');
});

beforeEach(() => {
  localStorage.setItem('blog', JSON.stringify(carouselInitialState));
});

afterEach(() => {
  cleanup();
});

describe('List.js page', () => {
  test('should render', () => {
    renderWithRouter(<List history={newHistory} />, '/list');

    const header = screen.getAllByText(/article/i);
    expect(header.length).toBe(10);
    expect(header[0]).toBeInTheDocument();
  });

  test('should be able to type on texts inputs', () => {
    renderWithRouter(<List history={newHistory} />, '/list');
  });

  test('filtering by quer `article five`, expected to be empty', () => {
    renderWithRouter(<List history={newHistory} />, '/list');

    const cardRows = screen.getAllByTestId(/card-row-/i);
    expect(cardRows.length).toBe(3); // to change this count check Favorites state
    expect(cardRows[0].childElementCount).toBe(4);

    const filterInput = screen.getByTestId('filtering-input');

    userEvent.type(filterInput, 'article five');

    const emptyCards = screen.getAllByTestId(/card-row-/i);
    expect(emptyCards[0].childElementCount).toBe(1);
  });
});
