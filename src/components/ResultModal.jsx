import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
const ResultModal = forwardRef(
  ({ targetTime, timeRemaining, onReset }, ref) => {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        },
      };
    });

    const userLost = timeRemaining <= 0;
    const formattedRemainingTime = (timeRemaining / 1000).toFixed(2);
    const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);
    return createPortal(
      <dialog
        ref={dialog}
        className='result-modal'
        onClose={onReset}>
        <h2>You {userLost ? "lost!" : "won!"}</h2>
        {!userLost && <h2>Your score: {score}</h2>}
        <p>
          The target time was <strong>{targetTime}</strong> seconds.
        </p>
        <p>
          You stopped the time with
          <strong> {formattedRemainingTime} seconds left.</strong>
        </p>
        <form
          method='dialog'
          onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    );
  }
);

export default ResultModal;
