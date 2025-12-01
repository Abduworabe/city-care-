import styled from "styled-components";

const Wrapper = styled.section`
  /* Mobile First Design */
  height: auto;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.75rem;
  width: 100%;

  .btn-container {
    background: #ffeeee;
    border-radius: 12px;
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    overflow: hidden;
  }

  /* Page Button Styles */
  .page-btn {
    background: transparent;
    border: none;
    width: 40px;
    height: 35px;
    font-weight: 600;
    font-size: 0.9rem;
    color: #000000;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;

    &:hover:not(.dots) {
      background: rgba(255, 96, 0, 0.1);
      transform: translateY(-1px);
    }
  }

  .active {
    background: #ff6000;
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(255, 96, 0, 0.3);
  }

  /* Prev/Next Button Styles */
  .prev-btn,
  .next-btn {
    background: #ffeeee;
    border: none;
    border-radius: 10px;
    width: auto;
    min-width: 80px;
    height: 35px;
    color: #ff6000;
    text-transform: capitalize;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.375rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 600;
    font-size: 0.85rem;
    padding: 0 0.75rem;

    &:hover {
      background: #ff6000;
      color: #ffffff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 96, 0, 0.3);
    }

    .btn-text {
      display: inline;
    }
  }

  .dots {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    color: #666666;
    font-size: 0.8rem;
    min-width: 30px;
  }

  /* Tablet Styles (768px - 991px) */
  @media (min-width: 768px) {
    margin-top: 2rem;
    gap: 1rem;
    justify-content: flex-end;
    padding: 1rem;

    .btn-container {
      gap: 0.375rem;
      padding: 0.375rem;
    }

    .page-btn {
      width: 45px;
      height: 40px;
      font-size: 1rem;
      min-width: 45px;
    }

    .prev-btn,
    .next-btn {
      min-width: 100px;
      height: 40px;
      font-size: 0.9rem;
      padding: 0 1rem;
    }

    .dots {
      min-width: 35px;
    }
  }

  /* Desktop Styles (992px - 1199px) */
  @media (min-width: 992px) {
    margin-top: 2.5rem;

    .page-btn {
      width: 50px;
      height: 40px;
      font-size: 1.1rem;
    }

    .prev-btn,
    .next-btn {
      min-width: 110px;
      height: 42px;
      font-size: 0.95rem;
    }
  }

  /* Large Desktop (1200px+) */
  @media (min-width: 1200px) {
    .btn-container {
      gap: 0.5rem;
    }

    .page-btn {
      width: 50px;
      height: 42px;
    }
  }

  /* Small Mobile (480px and below) */
  @media (max-width: 480px) {
    margin-top: 1rem;
    gap: 0.5rem;
    padding: 0.5rem;

    .btn-container {
      gap: 0.125rem;
      padding: 0.2rem;
      border-radius: 10px;
    }

    .page-btn {
      width: 35px;
      height: 32px;
      font-size: 0.8rem;
      min-width: 35px;
      border-radius: 6px;
    }

    .prev-btn,
    .next-btn {
      min-width: 70px;
      height: 32px;
      font-size: 0.8rem;
      padding: 0 0.5rem;
      border-radius: 8px;

      .btn-text {
        display: inline;
      }
    }

    .dots {
      min-width: 25px;
      font-size: 0.7rem;
    }
  }

  /* Extra Small Mobile (360px and below) */
  @media (max-width: 360px) {
    flex-direction: column;
    gap: 0.75rem;

    .btn-container {
      order: 2;
    }

    .prev-btn,
    .next-btn {
      order: 1;
      width: 100%;
      max-width: 200px;
    }

    .page-btn {
      width: 32px;
      height: 30px;
      font-size: 0.75rem;
      min-width: 32px;
    }
  }

  /* Landscape Mode for Mobile */
  @media (max-height: 500px) and (orientation: landscape) {
    margin-top: 1rem;
    padding: 0.5rem;

    .page-btn {
      height: 30px;
    }

    .prev-btn,
    .next-btn {
      height: 30px;
    }
  }

  /* High DPI Screens */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .page-btn,
    .prev-btn,
    .next-btn {
      border: 0.5px solid rgba(255, 96, 0, 0.1);
    }
  }

  /* Reduced motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .page-btn,
    .prev-btn,
    .next-btn {
      transition: none;
    }

    .page-btn:hover:not(.dots),
    .prev-btn:hover,
    .next-btn:hover {
      transform: none;
    }
  }

  /* Print Styles */
  @media print {
    background: none;
    box-shadow: none;

    .btn-container {
      background: none;
    }

    .page-btn,
    .prev-btn,
    .next-btn {
      background: none;
      border: 1px solid #000;
      color: #000;
    }
  }
`;

export default Wrapper;
