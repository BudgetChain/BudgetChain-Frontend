import React, { useEffect, useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import Button from '@/components/form/Button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center z-50
        transition-all duration-300 ease-in-out
        ${isAnimating ? 'bg-black/30 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'}
      `}
      onClick={onClose}
    >
      <div
        className={`
          bg-[#171721] rounded-2xl w-full max-w-lg p-6 relative flex flex-col items-center
          transition-all duration-300 ease-in-out
          ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
          <Trash2 className="w-8 h-8 text-red-500" />
        </div>

        <h2 className="text-2xl font-semibold text-[#4F4AE6] mb-4">
          Are you sure?
        </h2>

        <p className="text-center text-gray-400 mb-8">
          If you delete this event now, you can not
          <br />
          later undo this action. You'd have to create
          <br />a new Event afresh.
        </p>

        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={onClose}
          >
            Go Back
          </Button>
          <Button
            variant="secondary"
            className="flex-1 !bg-red-500 hover:!bg-red-600 text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={onConfirm}
          >
            Delete Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
