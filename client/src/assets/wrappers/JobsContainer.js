import styled from "styled-components";

const Wrapper = styled.section`
  /* Mobile First Design */
  margin-top: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);

  /* Responsive height management */
  max-height: calc(100vh - 12rem);
  overflow-y: auto;

  /* Futuristic background pattern */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(59, 130, 246, 0.03) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(16, 185, 129, 0.03) 0%,
        transparent 50%
      );
    border-radius: 16px;
    pointer-events: none;
    z-index: -1;
  }

  h2 {
    text-transform: none;
    color: var(--grey-700);
    font-weight: 600;
    text-align: center;
    margin-bottom: 0;
    font-size: 1.5rem;
    background: linear-gradient(
      135deg,
      var(--primary-600) 0%,
      var(--secondary-500) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--grey-800);
    font-size: 1.25rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid;
    border-image: linear-gradient(
        90deg,
        var(--primary-500),
        var(--secondary-400)
      )
      1;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: "🚨";
      font-size: 1.5rem;
    }
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .job-card {
    transition: all 0.3s ease;
    border-radius: 12px;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }
  }

  /* Enhanced empty state */
  &:has(h2) {
    text-align: center;
    padding: 3rem 1.5rem;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    max-height: none;
    overflow-y: visible;

    h2 {
      font-size: 1.75rem;
      margin-bottom: 1rem;
    }

    &::before {
      content: "🏢";
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
      animation: float 3s ease-in-out infinite;
    }

    &::after {
      content: "No complaints reported yet. Be the first to report an issue!";
      display: block;
      color: var(--grey-500);
      font-size: 1rem;
      margin-top: 0.5rem;
    }
  }

  /* Pagination container */
  .pagination-container {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  /* Floating animation */
  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  /* Tablet Styles (768px - 991px) */
  @media (min-width: 768px) {
    margin-top: 2rem;
    padding: 2rem;

    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    & > h5 {
      font-size: 1.375rem;
      margin-bottom: 2rem;
    }

    &:has(h2) {
      padding: 4rem 2rem;

      h2 {
        font-size: 2rem;
      }
    }
  }

  /* Desktop Styles (992px - 1199px) */
  @media (min-width: 992px) {
    margin-top: 2.5rem;
    padding: 2.5rem;

    .jobs {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }

    & > h5 {
      font-size: 1.5rem;
    }
  }

  /* Large Desktop (1200px+) */
  @media (min-width: 1200px) {
    .jobs {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 1.5rem;
    }
  }

  /* Small Mobile (480px and below) */
  @media (max-width: 480px) {
    margin-top: 0.5rem;
    padding: 1rem;
    border-radius: 12px;

    .jobs {
      gap: 1rem;
      margin-top: 1rem;
    }

    & > h5 {
      font-size: 1.125rem;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
    }

    &:has(h2) {
      padding: 2rem 1rem;

      h2 {
        font-size: 1.5rem;
      }

      &::before {
        font-size: 2.5rem;
      }

      &::after {
        font-size: 0.9rem;
      }
    }
  }

  /* Extra Small Mobile (360px and below) */
  @media (max-width: 360px) {
    padding: 0.75rem;

    .jobs {
      gap: 0.75rem;
    }

    & > h5 {
      font-size: 1rem;
    }
  }

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      135deg,
      var(--primary-500),
      var(--secondary-400)
    );
    border-radius: 8px;
  }

  /* Landscape mode for mobile */
  @media (max-height: 500px) and (orientation: landscape) {
    max-height: calc(100vh - 8rem);
  }

  /* Reduced motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .job-card,
    & {
      transition: none;
      animation: none;
    }

    .job-card:hover {
      transform: none;
    }
  }
`;

export default Wrapper;
