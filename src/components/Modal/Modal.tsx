import { ReactNode } from 'react';
import './Modal.scss';

interface ModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  children?: ReactNode;
}

export default function Modal({ onCancel, onConfirm, children }: ModalProps) {
  return (
    <div className='modal'>
      <div className='modal-dialog blue-container'>
        { children }
        <div className='modal-actions'>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
