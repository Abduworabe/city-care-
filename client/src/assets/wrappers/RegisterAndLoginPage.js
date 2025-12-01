import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 1;

  /* Ensure form is readable over 3D background */
  .form {
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
    padding: 2.5rem 2rem;
    border-top: 5px solid #ff6000;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(255, 96, 0, 0.15);
    position: relative;
    z-index: 2;
  }

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.5rem;
    max-width: 120px;
    height: auto;
  }

  h4 {
    text-align: center;
    margin-bottom: 0.5rem;
    color: #333;
    font-size: 1.8rem;
    font-weight: 700;
  }

  .form-subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 2rem;
    font-size: 0.95rem;
  }

  .form-row {
    margin-bottom: 1.2rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.4rem;
    font-weight: 600;
    color: #444;
    font-size: 0.9rem;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.9);
  }

  .form-input:focus {
    outline: none;
    border-color: #ff6000;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 3px rgba(255, 96, 0, 0.1);
    transform: translateY(-1px);
  }

  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
    font-size: 0.9rem;
    color: #555;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.75rem;
    margin-top: 1rem;
    background: #ff6000;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .btn:hover {
    background: #e05500;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 96, 0, 0.3);
  }

  .btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .member-btn {
    color: #ff6000;
    letter-spacing: 0.5px;
    margin-left: 0.25rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .member-btn:hover {
    color: #e05500;
    text-decoration: underline;
  }

  /* New styles for enhanced components */
  .form-footer {
    text-align: center;
    margin: 2rem 0 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .security-notice {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #666;
    font-size: 0.85rem;
    margin-top: 1rem;

    .security-icon {
      font-size: 1rem;
    }
  }

  .benefits-preview,
  .features-preview {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    h5 {
      text-align: center;
      color: #444;
      margin-bottom: 1rem;
      font-size: 1rem;
      font-weight: 600;
    }
  }

  .benefits-list,
  .features-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .benefit-item,
  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(255, 96, 0, 0.05);
    border-radius: 8px;
    font-size: 0.85rem;
    color: #444;

    .benefit-icon,
    .feature-icon {
      font-size: 1.1rem;
      flex-shrink: 0;
    }
  }

  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 768px) {
    padding: 1rem;

    .form {
      padding: 2rem 1.5rem;
      background: rgba(255, 255, 255, 0.98);
    }

    h4 {
      font-size: 1.5rem;
    }

    .btn {
      font-size: 0.95rem;
      padding: 0.7rem;
    }
  }

  @media (max-width: 480px) {
    .logo {
      max-width: 100px;
    }

    .form {
      padding: 1.5rem 1.25rem;
    }

    h4 {
      font-size: 1.3rem;
    }

    .btn {
      font-size: 0.9rem;
      padding: 0.65rem;
    }

    p {
      font-size: 0.85rem;
    }

    .form-input {
      padding: 0.65rem 0.85rem;
    }
  }

  /* Animation for form appearance */
  @keyframes formAppear {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .form {
    animation: formAppear 0.6s ease-out;
  }

  /* Enhanced focus states for accessibility */
  .btn:focus-visible,
  .form-input:focus-visible {
    outline: 2px solid #ff6000;
    outline-offset: 2px;
  }
`;

export default Wrapper;
