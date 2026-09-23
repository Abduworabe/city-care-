import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 1.5rem;

  h2 {
    text-align: center;
    color: var(--text-secondary-color);
    font-size: 1.5rem;
    font-weight: 600;
    padding: 2.5rem 1rem;
  }

  & > h5 {
    font-weight: 700;
    margin-bottom: 1.25rem;
    color: var(--text-color);
    font-size: 1.1rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-secondary-color);
    }
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-top: 1.25rem;
  }

  /* Tablet */
  @media (min-width: 640px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
    }
  }

  /* Desktop */
  @media (min-width: 992px) {
    margin-top: 2rem;

    .jobs {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    & > h5 {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
    }
  }

  /* Large Desktop */
  @media (min-width: 1400px) {
    .jobs {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* Small Mobile */
  @media (max-width: 480px) {
    margin-top: 1rem;

    .jobs {
      gap: 0.9rem;
    }

    & > h5 {
      font-size: 1rem;
    }
  }
`;

export default Wrapper;
