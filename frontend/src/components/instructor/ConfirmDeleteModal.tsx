import Modal from "./Modal";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  itemLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({ isOpen, itemLabel, onCancel, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title=""
      footer={
        <>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </>
      }
    >
      <div className="confirm-content">
        <div className="confirm-icon">!</div>
        <h2>Delete this {itemLabel}?</h2>
        <p>This action cannot be undone. Are you sure you want to remove this {itemLabel}?</p>
      </div>
    </Modal>
  );
}
