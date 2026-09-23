import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 1;

  .form {
    max-width: 460px;
    width: 100%;
    margin: 0 auto;
    padding: 2.5rem 2rem;
    border-top: 5px solid #ff6000;
    border-radius: 14px;
    background: #ffffff;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18), 0 4px 16px rgba(255, 96, 0, 0.12);
    position: relative;
    z-index: 2;
    animation: formAppear 0.5s ease-out;
  }

  @keyframes formAppear {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Logo */
  .logo {
    display: block;
    margin: 0 auto 1.5rem;
    max-width: 120px;
    height: auto;
  }

  /* Title */
  h4 {
    text-align: center;
    margin-bottom: 0.35rem;
    color: #1a1a2e;
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.3px;
  }

  .form-subtitle {
    text-align: center;
    color: #64748b;
    margin-bottom: 1.75rem;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  /* Form rows */
  .form-row {
    margin-bottom: 1.1rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.45rem;
    font-weight: 600;
    color: #334155;
    font-size: 0.88rem;
    letter-spacing: 0.2px;
  }

  .form-input {
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #1e293b;
    background: #f8fafc;
    transition: all 0.2s ease;
    font-family: inherit;

    &::placeholder {
      color: #94a3b8;
      font-size: 0.9rem;
    }

    &:focus {
      outline: none;
      border-color: #ff6000;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(255, 96, 0, 0.1);
    }
  }

  /* Button */
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.8rem;
    margin-top: 0.75rem;
    background: #ff6000;
    color: #ffffff;
    font-size: 0.97rem;
    font-weight: 700;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.25s ease;
    letter-spacing: 0.3px;
    min-height: 46px;

    &:hover {
      background: #e05500;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(255, 96, 0, 0.3);
    }

    &:disabled {
      opacity: 0.65;
      cursor: not-allowed;
      transform: none;
    }

    &:focus-visible {
      outline: 2px solid #ff6000;
      outline-offset: 2px;
    }
  }

  /* Links */
  p {
    margin-top: 1.1rem;
    text-align: center;
    line-height: 1.6;
    font-size: 0.88rem;
    color: #64748b;
  }

  .member-btn {
    color: #ff6000;
    margin-left: 0.3rem;
    font-weight: 700;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #e05500;
      text-decoration: underline;
    }
  }

  /* Footer */
  .form-footer {
    text-align: center;
    margin-top: 1.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid #f1f5f9;
  }

  .security-notice {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    color: #94a3b8;
    font-size: 0.8rem;
    margin-top: 0.75rem;
  }

  /* Spinner */
  .spinner {
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Responsive */
  @media (max-width: 520px) {
    padding: 1rem;

    .form {
      padding: 2rem 1.25rem;
    }

    h4 { font-size: 1.5rem; }
    .btn { font-size: 0.92rem; }
  }

  @media (max-width: 380px) {
    .form { padding: 1.5rem 1rem; }
    h4 { font-size: 1.3rem; }
  }
`;

export default Wrapper;
