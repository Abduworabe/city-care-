import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0;

  .job-icon {
    font-size: 1rem;
    color: var(--primary-accent);
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .job-text {
    text-transform: capitalize;
    font-size: 0.88rem;
    color: var(--text-secondary-color);
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default Wrapper;
