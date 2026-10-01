import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    min-height: 100vh;
    background: var(--background-color);
    width: 100%;
  }

  /* Content area next to BigSidebar */
  .dashboard-content,
  .dashboard > div {
    min-width: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .dashboard-page {
    width: 92%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 0 3rem;
    min-height: calc(100vh - var(--nav-height));
    flex: 1;
    min-width: 0;
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    .dashboard-page {
      width: 92%;
      max-width: 1400px;
      padding: 2rem 0 3rem;
    }
  }

  @media (min-width: 1400px) {
    .dashboard-page {
      width: 90%;
      max-width: 1560px;
    }
  }

  @media (max-width: 768px) {
    .dashboard-page {
      width: 94%;
      padding: 1.5rem 0 2.5rem;
    }
  }

  @media (max-width: 480px) {
    .dashboard-page {
      width: 95%;
      padding: 1rem 0 2rem;
    }
  }

  @media (max-width: 360px) {
    .dashboard-page {
      width: 96%;
      padding: 0.75rem 0 1.5rem;
    }
  }
`;

export default Wrapper;
