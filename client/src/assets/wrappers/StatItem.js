import styled from "styled-components";

const Wrapper = styled.article`
  padding: 2rem;
  background: ${(props) => props.bcg || "rgba(255, 255, 255, 0.95)"};
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => props.color || "#ff6000"};
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .count {
    font-size: 3rem;
    font-weight: 800;
    color: ${(props) => props.color || "#ff6000"};
    line-height: 1;
    word-break: break-all;
    flex: 1;
    min-width: 0; /* Allows text truncation */
  }

  .icon {
    width: 70px;
    height: 70px;
    background: ${(props) => props.color || "#ff6000"};
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.8rem;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  &:hover .icon {
    transform: scale(1.1) rotate(5deg);
  }

  .title {
    margin: 0.5rem 0;
    text-transform: capitalize;
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    line-height: 1.4;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  /* New description styling */
  .description {
    color: #6b7280;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0.5rem 0 1rem 0;
    flex: 1;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  /* New trend indicator styling */
  .trend-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto; /* Push to bottom */
    padding-top: 1rem;
  }

  .trend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;

    /* Trend color variations */
    &.monthly {
      background: #ff6000;
    }
    &.active {
      background: #f59e0b;
    }
    &.completed {
      background: #10b981;
    }
    &.delayed {
      background: #ef4444;
    }
    &.performance {
      background: #3b82f6;
    }
    &.coverage {
      background: #8b5cf6;
    }
    &.positive {
      background: #10b981;
    }
    &.negative {
      background: #ef4444;
    }
    &.neutral {
      background: #6b7280;
    }
  }

  .trend-text {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: capitalize;
    color: #6b7280;
    word-break: break-word;
  }

  /* ===== RESPONSIVE BREAKPOINTS ===== */

  /* Large Desktop (1440px and above) */
  @media (min-width: 1440px) {
    padding: 2.5rem;

    .count {
      font-size: 3.5rem;
    }

    .icon {
      width: 80px;
      height: 80px;
      font-size: 2rem;
    }

    .title {
      font-size: 1.4rem;
    }

    .description {
      font-size: 1rem;
    }
  }

  /* Standard Desktop (1200px - 1439px) */
  @media (min-width: 1200px) and (max-width: 1439px) {
    padding: 2rem;

    .count {
      font-size: 3rem;
    }

    .icon {
      width: 70px;
      height: 70px;
      font-size: 1.8rem;
    }
  }

  /* Small Desktop (1024px - 1199px) */
  @media (min-width: 1024px) and (max-width: 1199px) {
    padding: 1.75rem;

    .count {
      font-size: 2.8rem;
    }

    .icon {
      width: 65px;
      height: 65px;
      font-size: 1.7rem;
    }

    .title {
      font-size: 1.2rem;
    }
  }

  /* Tablets Landscape (768px - 1023px) */
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 1.5rem;

    .count {
      font-size: 2.5rem;
    }

    .icon {
      width: 60px;
      height: 60px;
      font-size: 1.6rem;
    }

    .title {
      font-size: 1.15rem;
    }

    .description {
      font-size: 0.85rem;
    }
  }

  /* Tablets Portrait (600px - 767px) */
  @media (min-width: 600px) and (max-width: 767px) {
    padding: 1.25rem;

    header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .count {
      font-size: 2.5rem;
      order: 2;
    }

    .icon {
      width: 55px;
      height: 55px;
      font-size: 1.5rem;
      order: 1;
    }

    .title {
      font-size: 1.1rem;
      order: 3;
      width: 100%;
    }
  }

  /* Mobile Large (480px - 599px) */
  @media (min-width: 480px) and (max-width: 599px) {
    padding: 1.5rem;

    header {
      flex-direction: row;
      align-items: center;
    }

    .count {
      font-size: 2.2rem;
    }

    .icon {
      width: 50px;
      height: 50px;
      font-size: 1.4rem;
    }

    .title {
      font-size: 1.1rem;
    }

    .description {
      font-size: 0.85rem;
    }
  }

  /* Mobile Medium (375px - 479px) */
  @media (min-width: 375px) and (max-width: 479px) {
    padding: 1.25rem;

    .count {
      font-size: 2rem;
    }

    .icon {
      width: 45px;
      height: 45px;
      font-size: 1.3rem;
    }

    .title {
      font-size: 1rem;
    }

    .description {
      font-size: 0.8rem;
    }

    .trend-indicator {
      flex-wrap: wrap;
    }
  }

  /* Mobile Small (320px - 374px) */
  @media (min-width: 320px) and (max-width: 374px) {
    padding: 1rem;

    header {
      flex-direction: column;
      align-items: flex-start;
      text-align: center;
    }

    .count {
      font-size: 1.8rem;
      width: 100%;
      text-align: center;
    }

    .icon {
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
      align-self: center;
    }

    .title {
      font-size: 0.95rem;
      text-align: center;
    }

    .description {
      font-size: 0.75rem;
      text-align: center;
    }

    .trend-indicator {
      justify-content: center;
      text-align: center;
    }
  }

  /* Extra Small Mobile (below 320px) */
  @media (max-width: 319px) {
    padding: 0.75rem;

    header {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.5rem;
    }

    .count {
      font-size: 1.6rem;
      width: 100%;
    }

    .icon {
      width: 35px;
      height: 35px;
      font-size: 1rem;
    }

    .title {
      font-size: 0.9rem;
    }

    .description {
      font-size: 0.7rem;
      text-align: center;
    }

    .trend-indicator {
      flex-direction: column;
      gap: 0.25rem;
      align-items: center;
    }
  }

  /* High DPI/Retina Displays */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .icon {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }

  /* Print Styles */
  @media print {
    background: white !important;
    box-shadow: none !important;
    border: 1px solid #ddd !important;

    .count {
      color: #333 !important;
    }

    .icon {
      background: #333 !important;
    }

    &::before {
      background: #333 !important;
    }
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }

    .icon {
      transition: none;

      &:hover {
        transform: none;
      }
    }
  }

  /* High Contrast Mode Support */
  @media (prefers-contrast: high) {
    background: white;
    border: 2px solid black;

    .count {
      color: black;
    }

    .icon {
      background: black;
      border: 1px solid black;
    }

    &::before {
      background: black;
      height: 3px;
    }
  }

  /* Dark Mode Support */
  @media (prefers-color-scheme: dark) {
    background: rgba(30, 30, 30, 0.95);
    color: white;

    .title {
      color: white;
    }

    .description {
      color: #ccc;
    }

    .trend-text {
      color: #ccc;
    }
  }
`;

export default Wrapper;
