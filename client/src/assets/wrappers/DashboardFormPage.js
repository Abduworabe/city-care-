import styled from "styled-components";

const Wrapper = styled.section`
  /* Mobile First Design */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 252, 0.95) 100%
  );
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;

  /* Futuristic background pattern */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(59, 130, 246, 0.02) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(16, 185, 129, 0.02) 0%,
        transparent 50%
      );
    border-radius: 12px;
    pointer-events: none;
    z-index: -1;
  }

  .form-title {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
    text-align: center;
    background: linear-gradient(
      135deg,
      var(--primary-600) 0%,
      var(--secondary-500) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid;
    border-image: linear-gradient(
        90deg,
        var(--primary-500),
        var(--secondary-400)
      )
      1;
  }

  .form {
    max-width: 100%;
    margin: 0 auto;
  }
  .form-btn {
    margin-top: 1.7rem;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }

  .form-label {
    display: block;
    font-size: 0.8rem;
    margin-bottom: 0.375rem;
    font-weight: 600;
    color: var(--grey-700);
    text-transform: capitalize;
    letter-spacing: 0.5px;
  }

  .form-input,
  .form-select {
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(203, 213, 225, 0.6);
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);

    &:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 2px 6px rgba(59, 130, 246, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
      background: rgba(255, 255, 255, 0.95);
    }
  }

  .form-actions {
    grid-column: 1 / -1;
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 0.75rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    min-width: 100px;
    box-shadow: 0 2px 4px rgba(255, 96, 0, 0.2);
  }

  .reset-btn {
    background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
    color: white;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(107, 114, 128, 0.25);
    }
  }

  .apply-btn {
    background: #ff6000;
    color: white;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(255, 96, 0, 0.3);
      background: #e55d00;
    }
  }

  /* Tablet Styles (768px - 991px) */
  @media (min-width: 768px) {
    padding: 1.5rem;
    border-radius: 14px;

    .form-title {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .form-center {
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
    }

    .form-actions {
      justify-content: flex-end;
    }

    .btn {
      min-width: 120px;
      padding: 0.75rem 1.5rem;
    }
  }

  /* Desktop Styles (992px - 1199px) */
  @media (min-width: 992px) {
    padding: 2rem;
    border-radius: 16px;

    .form-center {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 1.5rem;
    }

    .form-title {
      font-size: 1.375rem;
    }
  }

  /* Large Desktop (1200px+) */
  @media (min-width: 1200px) {
    .form-center {
      gap: 1.5rem;
    }
  }

  /* Small Mobile (480px and below) */
  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 10px;

    .form-title {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    .form-center {
      gap: 0.875rem;
    }

    .form-input,
    .form-select {
      padding: 0.625rem;
      font-size: 0.85rem;
    }

    .form-actions {
      flex-direction: column;
    }

    .btn {
      width: 100%;
      min-width: auto;
      padding: 0.875rem 1rem;
    }
  }

  /* Extra Small Mobile (360px and below) */
  @media (max-width: 360px) {
    padding: 0.75rem;

    .form-title {
      font-size: 0.95rem;
    }

    .form-center {
      gap: 0.75rem;
    }

    .form-input,
    .form-select {
      padding: 0.5rem 0.75rem;
    }
  }

  /* Landscape Mode for Mobile */
  @media (max-height: 500px) and (orientation: landscape) {
    padding: 1rem;

    .form-center {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }

  /* Loading state */
  &.loading {
    .form-input,
    .form-select {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .form-input,
    .form-select,
    .btn {
      transition: none;
    }

    .btn:hover {
      transform: none;
    }
  }
`;

export default Wrapper;
