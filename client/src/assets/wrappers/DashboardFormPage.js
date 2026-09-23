import styled from "styled-components";

const Wrapper = styled.section`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius-lg);
  padding: 1.75rem 1.5rem;
  box-shadow: var(--shadow-2);
  border: 1px solid var(--border-color);
  position: relative;

  .form-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
    color: var(--text-color);
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--primary-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .form {
    max-width: 100%;
    margin: 0 auto;
    background: transparent;
    box-shadow: none;
    padding: 0;
  }

  .form-btn {
    margin-top: 1.5rem;
  }

  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.1rem;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
  }

  .form-label {
    display: block;
    font-size: 0.85rem;
    margin-bottom: 0.45rem;
    font-weight: 600;
    color: var(--text-color);
    text-transform: capitalize;
    letter-spacing: 0.3px;
  }

  .form-input,
  .form-select {
    width: 100%;
    background: var(--input-bg);
    border: 1.5px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 0.95rem;
    color: var(--text-color);
    padding: 0.65rem 0.9rem;
    min-height: 42px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-accent);
      box-shadow: 0 0 0 3px rgba(255, 96, 0, 0.1);
    }

    &::placeholder {
      color: var(--grey-400);
    }
  }

  .form-actions {
    grid-column: 1 / -1;
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 0.5rem;
    padding-top: 1.1rem;
    border-top: 1px solid var(--border-color);
  }

  .btn {
    padding: 0.65rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 42px;
    min-width: 100px;
  }

  .reset-btn {
    background: var(--grey-200);
    color: var(--grey-700);
    border: 1.5px solid var(--border-color);

    &:hover {
      background: var(--grey-300);
      transform: translateY(-1px);
    }
  }

  .apply-btn {
    background: var(--primary-accent);
    color: white;

    &:hover {
      background: var(--primary-accent-dark);
      transform: translateY(-1px);
      box-shadow: var(--shadow-orange);
    }
  }

  /* Tablet */
  @media (min-width: 768px) {
    padding: 2rem;

    .form-title {
      font-size: 1.35rem;
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
    }
  }

  /* Desktop */
  @media (min-width: 992px) {
    padding: 2.25rem 2rem;

    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.5rem;
    }

    .form-title {
      font-size: 1.5rem;
    }
  }

  /* Large Desktop */
  @media (min-width: 1200px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  /* Mobile */
  @media (max-width: 480px) {
    padding: 1.25rem 1rem;

    .form-title {
      font-size: 1.05rem;
      margin-bottom: 1.1rem;
    }

    .form-actions {
      flex-direction: column;

      .btn {
        width: 100%;
        min-width: auto;
      }
    }
  }
`;

export default Wrapper;
