import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import FlipCard from '../../../components/effects/FlipCard';
import TicTacToe from '../../../components/games/TicTacToe';
import MemoryMatch from '../../../components/games/MemoryMatch';

// ============ BLACK BOX TESTS: UI Components & Games ============
// Tests components the way a user interacts with them

describe('Button component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Go</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders different variants', () => {
    const { rerender } = render(<Button variant="primary">A</Button>);
    expect(screen.getByRole('button').className).toContain('bg-primary-500');

    rerender(<Button variant="secondary">A</Button>);
    expect(screen.getByRole('button').className).toContain('border-2');
  });

  it('full width class applied when requested', () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole('button').className).toContain('w-full');
  });
});

describe('Input component', () => {
  it('renders label and placeholder', () => {
    render(<Input label="Your Name" placeholder="Enter name" value="" onChange={() => {}} />);
    expect(screen.getByText(/Your Name/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('shows required asterisk', () => {
    render(<Input label="Email" required value="" onChange={() => {}} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('calls onChange with new value', () => {
    const handleChange = vi.fn();
    render(<Input label="Name" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalledWith('Hello');
  });

  it('renders textarea when multiline', () => {
    render(<Input label="Message" multiline value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
  });

  it('shows character counter when maxLength set', () => {
    render(<Input label="Title" value="abc" onChange={() => {}} maxLength={100} />);
    expect(screen.getByText('3/100')).toBeInTheDocument();
  });
});

describe('Modal component', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}} title="Hidden">
        Content
      </Modal>
    );
    expect(container.querySelector('[role="dialog"], .fixed')).toBeNull();
  });

  it('renders title and content when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="My Modal">
        <p>Modal body</p>
      </Modal>
    );
    expect(screen.getByText('My Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal body')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="X">
        Body
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('Close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape pressed', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="X">
        Body
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

describe('FlipCard component', () => {
  it('renders front content initially', () => {
    render(
      <FlipCard front={<span>FRONT</span>} back={<span>BACK</span>} />
    );
    expect(screen.getByText('FRONT')).toBeInTheDocument();
    expect(screen.getAllByText(/tap to flip/i).length).toBeGreaterThan(0);
  });

  it('flips when clicked', () => {
    render(<FlipCard front={<span>FRONT</span>} back={<span>BACK</span>} />);
    fireEvent.click(screen.getByText('FRONT').closest('[role="button"]'));
    expect(document.querySelector('.flipped')).toBeTruthy();
  });

  it('renders back content', () => {
    render(<FlipCard front={<span>FRONT</span>} back={<span>SECRET</span>} />);
    expect(screen.getByText('SECRET')).toBeInTheDocument(); // in DOM, CSS hides visually
  });
});

describe('TicTacToe game', () => {
  it('renders game title and empty board', () => {
    render(<TicTacToe />);
    expect(screen.getByText(/Tic-Tac-Toe/)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(9);
  });

  it('shows player turn indicator', () => {
    render(<TicTacToe player1Name="Alice" player2Name="Bob" />);
    expect(screen.getByText(/Alice's turn/)).toBeInTheDocument();
  });

  it('alternates turns when cells clicked', () => {
    render(<TicTacToe player1Name="Alice" player2Name="Bob" />);
    const cells = screen.getAllByRole('button').slice(0, 9);

    fireEvent.click(cells[0]);
    expect(screen.getByText(/Bob's turn/)).toBeInTheDocument();

    fireEvent.click(cells[1]);
    expect(screen.getByText(/Alice's turn/)).toBeInTheDocument();
  });

  it('places marks on clicked cells', () => {
    render(<TicTacToe />);
    const cells = screen.getAllByRole('button').slice(0, 9);
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('❌');
  });

  it('does not allow clicking already-marked cell', () => {
    render(<TicTacToe />);
    const cells = screen.getAllByRole('button').slice(0, 9);
    fireEvent.click(cells[0]);
    fireEvent.click(cells[0]); // second click on same cell
    expect(cells[0]).toHaveTextContent('❌'); // still X, not O
    expect(screen.getByText(/Player 2's turn/)).toBeInTheDocument(); // turn didn't change
  });

  it('declares winner with three in a row', () => {
    render(<TicTacToe player1Name="Alice" player2Name="Bob" />);
    const cells = screen.getAllByRole('button').slice(0, 9);

    // X: 0,1 / O: 3,4 / X: 2 (wins top row)
    fireEvent.click(cells[0]);
    fireEvent.click(cells[3]);
    fireEvent.click(cells[1]);
    fireEvent.click(cells[4]);
    fireEvent.click(cells[2]);

    expect(screen.getByText(/Alice wins/)).toBeInTheDocument();
  });

  it('prevents moves after game over', () => {
    render(<TicTacToe />);
    const cells = screen.getAllByRole('button').slice(0, 9);

    fireEvent.click(cells[0]);
    fireEvent.click(cells[3]);
    fireEvent.click(cells[1]);
    fireEvent.click(cells[4]);
    fireEvent.click(cells[2]); // X wins

    fireEvent.click(cells[5]); // should be blocked
    expect(cells[5]).toHaveTextContent(''); // empty
  });

  it('resets board on New Game', () => {
    render(<TicTacToe />);
    const cells = screen.getAllByRole('button').slice(0, 9);
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('❌');

    fireEvent.click(screen.getByText(/New Game/));
    expect(cells[0]).toHaveTextContent('');
  });
});

describe('MemoryMatch game', () => {
  it('renders game title', () => {
    render(<MemoryMatch pairs={4} />);
    expect(screen.getByText(/Memory Match/)).toBeInTheDocument();
  });

  it('shows move counter starting at 0', () => {
    render(<MemoryMatch pairs={4} />);
    expect(screen.getByText(/Moves:/)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('flips card on click', () => {
    render(<MemoryMatch pairs={4} />);
    const cards = screen.getAllByRole('button').filter((b) => b.textContent === '?');
    fireEvent.click(cards[0]);
    expect(cards[0]).not.toHaveTextContent('?');
  });

  it('counts a move after two cards flipped', () => {
    render(<MemoryMatch pairs={4} />);
    const cards = screen.getAllByRole('button').filter((b) => b.textContent === '?');

    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);

    expect(screen.getByText('Moves:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('prevents flipping more than 2 cards at once', () => {
    render(<MemoryMatch pairs={4} />);
    const cards = screen.getAllByRole('button').filter((b) => b.textContent === '?');

    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);
    fireEvent.click(cards[2]); // third - should be blocked while checking

    expect(cards[2]).toHaveTextContent('?');
  });
});
