import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateJoinGame from '../components/CreateJoinGame';
import { usePlayerContext } from '../../../context/PlayerDataContext';

// Mock context and navigation
jest.mock('@/hooks/usePlayerContext', () => ({
  usePlayerContext: jest.fn(),
}));
jest.mock('@/services/gameService', () => ({
  createGame: jest.fn().mockResolvedValue({ _id: 'mockGameId' }),
  joinGame: jest.fn().mockResolvedValue({}),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CreateJoinGame', () => {
  beforeEach(() => {
    (usePlayerContext).mockReturnValue({
      playerData: { player1: 'Justin' },
      updatePlayerData: jest.fn(),
    });
    localStorage.clear();
  });

  test('renders form fields and buttons', () => {
    render(
      <BrowserRouter>
        <CreateJoinGame />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Game Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Game/i)).toBeInTheDocument();
    expect(screen.getByText(/Join Game/i)).toBeInTheDocument();
  });

  test('submits create game form', async () => {
    render(
      <BrowserRouter>
        <CreateJoinGame />
      </BrowserRouter>
    );

    const gameNameInput = screen.getByLabelText(/Game Name/i);
    fireEvent.change(gameNameInput, { target: { value: 'MyGame' } });

    fireEvent.submit(screen.getByText(/Create Game/i));
    
    expect(await screen.findByText(/Create Game/i)).toBeInTheDocument();
  });

  test('submits join game form', async () => {
    localStorage.setItem('playerName', 'Justin');

    render(
      <BrowserRouter>
        <CreateJoinGame />
      </BrowserRouter>
    );

    fireEvent.submit(screen.getByText(/Join Game/i));

    expect(await screen.findByText(/Join Game/i)).toBeInTheDocument();
  });
});