import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    background: #fff; /* main background */
    color: #101010; /* main text */
  }

  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
    background: #fff; /* page background */
    color: #101010; /* text color */
  }

  /* Example: headings inside dashboard */
  h2,
  h3,
  h4 {
    color: #101010;
  }

  /* Primary highlight class for buttons, borders, important text */
  .highlight {
    color: #ff6000;
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr; /* sidebar + content */
    }

    .dashboard-page {
      width: 90%;
    }
  }
`;

export default Wrapper;
