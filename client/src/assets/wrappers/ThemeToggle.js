import styled from "styled-components";

const Wrapper = styled.div`
  background: transparent;
  border-color: transparent;
  width: 3.5rem;
  height: 2.2rem;
  display: grid;
  place-items: center;
  cursor: pointer;

  /* ICON COLOR RULES */
  .toggle-icon {
    font-size: 1.5rem;

    /* Fallback icon color */
    color: #ff6000;

    /* If parent sets a theme variable, use it */
    transition: color 0.3s ease-in-out;
  }

  &:hover .toggle-icon {
    color: #ffffff; /* white on hover for better visibility */
  }
`;

export default Wrapper;
