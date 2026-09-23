import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    min-height: 100vh;
    background: var(--background-color);
  }

  .dashboard-page {
    width: 92%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 0 3rem;
    min-height: calc(100vh - var(--nav-height));
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    .dashboard-page {
      width: 90%;
    }
  }

  @media (max-width: 480px) {
    .dashboard-page {
      width: 95%;
      padding: 1.25rem 0 2rem;
    }
  }
`;

export default Wrapper;
