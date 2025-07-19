import { type ReactNode } from 'react';
import Button from '../Button/Button';
import './Modal.scss';

interface ModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  children?: ReactNode;
}

export default function Modal({ onCancel, onConfirm, children }: ModalProps) {
  return (
    <div className='modal' data-testid='modal'>
      <div className='modal-dialog blue-container'>
        { children }
        <div className='modal-actions'>
          <Button
            id='cancel'
            onClick={onCancel}
          >Cancel</Button>
          <Button
            id='confirm'
            onClick={onConfirm}
          >Confirm</Button>
        </div>
      </div>
    </div>
  );
}
