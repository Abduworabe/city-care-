import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${(props) => props.color || "#ff6000"};
    border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-3);
  }

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
    gap: 0.75rem;
  }

  .count {
    font-size: 2.5rem;
    font-weight: 800;
    color: ${(props) => props.color || "#ff6000"};
    line-height: 1;
    flex: 1;
    min-width: 0;
    word-break: break-all;
  }

  .icon {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    background: ${(props) => props.bcg || "rgba(255,96,0,0.1)"};
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.color || "#ff6000"};
    font-size: 1.6rem;
    transition: transform 0.3s ease;
    border: 1px solid ${(props) => props.color ? props.color + '22' : 'rgba(255,96,0,0.15)'};
  }

  &:hover .icon {
    transform: scale(1.08) rotate(5deg);
  }

  .title {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-color);
    text-transform: capitalize;
    line-height: 1.4;
    letter-spacing: 0.3px;
  }

  .description {
    color: var(--text-secondary-color);
    font-size: 0.82rem;
    line-height: 1.5;
    margin-top: 0.35rem;
    flex: 1;
  }

  .trend-indicator {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-color);
  }

  .trend-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
    background: ${(props) => props.color || "#ff6000"};
  }

  .trend-text {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-secondary-color);
    text-transform: capitalize;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;

    .count { font-size: 2rem; }
    .icon { width: 46px; height: 46px; font-size: 1.3rem; }
    .title { font-size: 0.85rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
    &:hover .icon { transform: none; }
  }

  @media (prefers-contrast: high) {
    border: 2px solid ${(props) => props.color || "#ff6000"};
  }
`;

export default Wrapper;
