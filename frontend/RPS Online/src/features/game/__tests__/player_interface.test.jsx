import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlayerInterface from '../components/player_interface';
import * as api from '../api'

jest.mock('../features/game/api');

// Mock images to avoid import errors
jest.mock('../assets/Rock', () => 'rock.png');
jest.mock('../assets/Paper', () => 'paper.png');
jest.mock('../assets/Scissors', () => 'scissors.png');
jest.mock('../assets/Fist', () => 'fist.png');

describe('PlayerInterface', () => {
  beforeEach(() => {
    localStorage.setItem('playerName', 'TestPlayer');
    localStorage.setItem('gameId', 'game123');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<PlayerInterface />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays buttons after loading', async () => {
    render(<PlayerInterface />);
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());
    expect(screen.getByText('Rock')).toBeInTheDocument();
    expect(screen.getByText('Paper')).toBeInTheDocument();
    expect(screen.getByText('Scissors')).toBeInTheDocument();
  });

  it('submits a move and triggers polling', async () => {
    jest.spyOn(api, 'submitMove').mockResolvedValue({ success: true });
    jest.spyOn(api, 'getGameStatus').mockResolvedValue({
      player1: 'TestPlayer',
      player2_choice: 'Paper',
      winner: 'TestPlayer',
    });

    render(<PlayerInterface />);
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    fireEvent.click(screen.getByText('Rock'));
    expect(await screen.findByText('Rock')).toBeInTheDocument();

    await waitFor(() => {
      expect(api.submitMove).toHaveBeenCalled();
      expect(api.getGameStatus).toHaveBeenCalled();
    });
  });

  it('disables buttons after making a choice', async () => {
    render(<PlayerInterface />);
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    const rockBtn = screen.getByText('Rock');
    fireEvent.click(rockBtn);

    await waitFor(() => {
      expect(rockBtn.closest('button')).toBeDisabled();
    });
  });
});
