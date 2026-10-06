import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Envelope from '../../../components/envelope/Envelope';

describe('Modal accessibility', () => {
  it('exposes dialog role with aria-modal', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Dialog">
        <p>Body</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('labels the dialog by its title', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Your Letter is Ready!">
        <p>Body</p>
      </Modal>
    );
    const dialog = screen.getByRole('dialog', { name: /Your Letter is Ready/ });
    expect(dialog).toBeInTheDocument();
  });

  it('closes on Escape', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Hi">
        <p>Body</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('close button has accessible name', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Hi">
        <p>Body</p>
      </Modal>
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});

describe('Input accessibility', () => {
  it('associates label with input (click label focuses field)', () => {
    render(<Input label="From (Your name)" value="" onChange={() => {}} />);
    const label = screen.getByText(/From \(Your name\)/);
    const input = screen.getByLabelText(/From \(Your name\)/);
    expect(label).toHaveAttribute('for', input.id);
    expect(input).toBeInTheDocument();
  });

  it('required fields announce required via aria not just asterisk', () => {
    render(<Input label="Message" value="" onChange={() => {}} required />);
    const input = screen.getByLabelText(/Message/);
    expect(input).toBeRequired();
  });
});

describe('Envelope accessibility', () => {
  it('is keyboard operable (Enter opens)', () => {
    const onOpen = vi.fn();
    render(
      <Envelope isOpen={false} onOpen={onOpen} theme="romantic">
        Hi
      </Envelope>
    );
    const env = screen.getByRole('button', { name: /open envelope/i });
    fireEvent.keyDown(env, { key: 'Enter' });
    expect(onOpen).toHaveBeenCalled();
  });

  it('Space also opens (standard button behavior)', () => {
    const onOpen = vi.fn();
    render(
      <Envelope isOpen={false} onOpen={onOpen} theme="romantic">
        Hi
      </Envelope>
    );
    const env = screen.getByRole('button', { name: /open envelope/i });
    fireEvent.keyDown(env, { key: ' ' });
    expect(onOpen).toHaveBeenCalled();
  });
});
