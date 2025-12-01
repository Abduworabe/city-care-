import styled from "styled-components";

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7); /* dark overlay */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }

  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
  }

  .content {
    background: #101010; /* DARK background */
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: #ff6000; /* primary orange */
    cursor: pointer;
  }

  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: #ffffff; /* white text */
    padding: 1rem 0;
    text-transform: capitalize;
    transition: color 0.3s ease-in-out;
  }

  .nav-link:hover {
    color: #ff6000; /* orange hover */
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    color: #ffffff; /* white icons */
  }

  .active {
    color: #ff6000; /* selected page */
  }
`;

export default Wrapper;
