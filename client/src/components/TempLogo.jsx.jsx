import styled from "styled-components";
import logo from "../assets/images/logo.svg";

const LogoImg = styled.img`
  display: block;
  width: auto;
  height: 32px; /* Very compact professional size */
  object-fit: contain;
  transition: all 0.2s ease;

  /* Navigation - very compact */
  .nav & {
    height: 28px; /* Minimal in navigation */
  }

  /* Footer - minimal presence without border */
  .footer & {
    height: 30px; /* Minimal presence in footer */
    background-color: transparent;
    border-radius: 0;
    padding: 0;
    box-shadow: none;
  }

  /* Hero section - subtle prominence */
  .hero-content & {
    height: 36px;
    margin-bottom: 1rem;
  }

  /* Forms - compact size */
  .form & {
    height: 34px;
    margin: 0 auto 0.8rem;
  }

  /* Hover effects - very subtle */
  &:hover {
    transform: scale(1.02);
    filter: brightness(1.03);
  }

  /* Large screens - tiny scaling */
  @media (min-width: 1440px) {
    height: 34px;

    .nav & {
      height: 30px;
    }

    .footer & {
      height: 32px;
    }

    .hero-content & {
      height: 38px;
    }
  }

  /* Tablets */
  @media (max-width: 1024px) {
    height: 30px;

    .nav & {
      height: 26px;
    }

    .footer & {
      height: 28px;
    }

    .hero-content & {
      height: 34px;
    }

    .form & {
      height: 32px;
    }
  }

  /* Small tablets */
  @media (max-width: 768px) {
    height: 28px;

    .nav & {
      height: 24px;
    }

    .footer & {
      height: 26px;
    }

    .hero-content & {
      height: 30px;
    }

    .form & {
      height: 28px;
    }
  }

  /* Mobile */
  @media (max-width: 480px) {
    height: 26px;

    .nav & {
      height: 22px;
    }

    .footer & {
      height: 24px;
    }

    .hero-content & {
      height: 28px;
    }

    .form & {
      height: 26px;
      margin-bottom: 0.6rem;
    }
  }

  /* Extra small mobile */
  @media (max-width: 360px) {
    height: 24px;

    .nav & {
      height: 20px;
    }

    .footer & {
      height: 22px;
    }

    .hero-content & {
      height: 26px;
    }

    .form & {
      height: 24px;
    }
  }

  /* Ultra small devices */
  @media (max-width: 320px) {
    height: 22px;

    .nav & {
      height: 18px;
    }

    .footer & {
      height: 20px;
    }

    .hero-content & {
      height: 24px;
    }

    .form & {
      height: 22px;
    }
  }

  /* Print styles */
  @media print {
    height: 28px;

    .nav &,
    .footer &,
    .hero-content &,
    .form & {
      height: 28px;
      filter: grayscale(100%) contrast(130%);
    }
  }
`;

const Logo = () => {
  return <LogoImg src={logo} alt="CityCare" />;
};

export default Logo;
