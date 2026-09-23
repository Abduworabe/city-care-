import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius-lg);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-2);
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-3);
  }

  /* Header */
  header {
    padding: 1.25rem 1.25rem 1rem;
    border-bottom: 1px solid var(--border-color);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 0.9rem;
    background: var(--grey-50);
  }

  .dark-theme & header {
    background: rgba(255, 255, 255, 0.03);
  }

  .main-icon {
    width: 46px;
    height: 46px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, var(--primary-accent), var(--primary-accent-light));
    border-radius: var(--border-radius);
    font-size: 1.15rem;
    font-weight: 800;
    text-transform: uppercase;
    color: white;
    box-shadow: 0 3px 10px rgba(255, 96, 0, 0.3);
    transition: transform 0.3s ease;
  }

  &:hover .main-icon {
    transform: scale(1.08) rotate(3deg);
  }

  .info {
    flex: 1;
    min-width: 0;

    h5 {
      margin: 0 0 0.35rem;
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-color);
      line-height: 1.3;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    p {
      margin: 0;
      color: var(--text-secondary-color);
      font-size: 0.85rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* Content */
  .content {
    padding: 1.1rem 1.25rem 0.85rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .content-center {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    flex: 1;
  }

  /* Status Badge */
  .status {
    border-radius: 2rem;
    text-transform: capitalize;
    letter-spacing: 0.3px;
    text-align: center;
    padding: 0.3rem 0.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.78rem;
    align-self: flex-start;
    margin-top: 0.5rem;
  }

  .status.pending,
  .status.reported {
    background: #fef3c7;
    color: #92400e;
  }
  .status.interview,
  .status.in-progress {
    background: #dbeafe;
    color: #1e40af;
  }
  .status.declined,
  .status.closed {
    background: #fee2e2;
    color: #991b1b;
  }
  .status.resolved {
    background: #d1fae5;
    color: #065f46;
  }

  /* Actions */
  .actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1.25rem;
    border-top: 1px solid var(--border-color);
    background: var(--grey-50);
  }

  .dark-theme & .actions {
    background: rgba(255, 255, 255, 0.03);
  }

  .edit-btn,
  .delete-btn {
    flex: 1;
    height: 38px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    border-radius: var(--border-radius);
    font-weight: 600;
    transition: all 0.25s ease;
    border: none;
    cursor: pointer;
    min-width: 0;
    text-decoration: none;
  }

  .edit-btn {
    background: var(--grey-200);
    color: var(--grey-700);
    border: 1px solid var(--border-color);

    &:hover {
      background: var(--grey-700);
      color: white;
      transform: translateY(-2px);
    }
  }

  .delete-btn {
    background: var(--red-light);
    color: var(--red-dark);
    border: 1px solid #fca5a5;

    &:hover {
      background: var(--red-dark);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 3px 10px rgba(185, 28, 28, 0.3);
    }
  }

  @media (max-width: 480px) {
    header { padding: 1rem; gap: 0.75rem; }
    .main-icon { width: 40px; height: 40px; font-size: 1rem; }
    .content { padding: 0.9rem 1rem 0.75rem; }
    .actions { padding: 0.75rem 1rem; }

    .edit-btn, .delete-btn { height: 35px; font-size: 0.8rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
    &:hover .main-icon { transform: none; }
    .edit-btn:hover, .delete-btn:hover { transform: none; }
  }
`;

export default Wrapper;
