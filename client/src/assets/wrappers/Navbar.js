import styled from "styled-components";

const Wrapper = styled.nav`
  /* Base Styles - Mobile First */
  z-index: 1000;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #101010;
  color: #ffffff;
  box-shadow: 0 1px 0 0 rgba(255, 96, 0, 0.3);
  position: sticky;
  top: 0;
  padding: 0 1rem;

  .nav-center {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .toggle-btn {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    color: #ffffff;
    cursor: pointer;
    transition: 0.3s ease;
    padding: 0.5rem;
    border-radius: 4px;

    &:hover {
      color: #ff6000;
      background: rgba(255, 96, 0, 0.1);
    }
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    justify-content: center;
  }

  .logo {
    display: flex;
    align-items: center;
    width: 40px;
    height: 40px;
  }

  .logo-text {
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    display: none;
  }

  .btn-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  /* USER PROFILE DROPDOWN - Mobile First */
  .user-profile {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    color: #ffffff;
    padding: 0.4rem 0.8rem;
    border: 1.5px solid #ff6000;
    border-radius: 6px;
    transition: all 0.3s ease;
    background: rgba(255, 96, 0, 0.05);

    .user-avatar-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #ff6000;
      box-shadow: 0 0 5px rgba(255, 96, 0, 0.7);
      background-color: #ffffff;
      transition: all 0.3s ease;
    }

    .user-icon {
      font-size: 1.4rem;
      background: #ff6000;
      border-radius: 50%;
      padding: 2px;
      transition: all 0.3s ease;
    }

    .user-name {
      font-size: 0.9rem;
      font-weight: 500;
    }

    .down-icon {
      font-size: 0.8rem;
      transition: transform 0.3s ease;
    }

    &:hover {
      background: #ff6000;
      color: #101010;

      .user-icon {
        background: #ffffff;
        color: #ff6000;
      }

      .user-avatar-img {
        transform: scale(1.1);
        box-shadow: 0 0 10px rgba(255, 96, 0, 0.9);
      }

      .down-icon {
        transform: rotate(180deg);
      }
    }

    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: #101010;
      border: 1px solid #ff6000;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      min-width: 140px;
      z-index: 1001;
      overflow: hidden;
      margin-top: 0.5rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

      &.show-dropdown {
        animation: dropdownFade 0.2s ease;
      }

      .dropdown-link,
      .dropdown-btn {
        background: transparent;
        color: #ffffff;
        border: none;
        padding: 0.75rem 1rem;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;
        display: block;
        font-size: 0.9rem;
        border-bottom: 1px solid rgba(255, 96, 0, 0.2);

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background: #ff6000;
          color: #101010;
        }
      }
    }
  }

  /* Dropdown Animation */
  @keyframes dropdownFade {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Tablet Styles (768px - 991px) */
  @media (min-width: 768px) {
    padding: 0 1.5rem;

    .nav-center {
      gap: 1.5rem;
    }

    .toggle-btn {
      font-size: 1.75rem;
      padding: 0.6rem;
    }

    .logo {
      width: 45px;
      height: 45px;
    }

    .logo-text {
      font-size: 1.25rem;
    }

    .btn-container {
      gap: 1rem;
    }

    .user-profile {
      padding: 0.5rem 1rem;

      .user-avatar-img {
        width: 35px;
        height: 35px;
      }

      .user-icon {
        font-size: 1.5rem;
      }

      .user-name {
        font-size: 1rem;
      }
    }
  }

  /* Desktop Styles (992px and above) */
  @media (min-width: 992px) {
    .nav-center {
      width: 90%;
      margin: 0 auto;
    }

    .logo-section {
      justify-content: flex-start;
      flex: none;
    }

    .logo {
      display: none;
    }

    .logo-text {
      display: block;
      font-size: 1.5rem;
    }

    .toggle-btn {
      font-size: 1.75rem;
    }

    .user-profile {
      .user-avatar-img {
        width: 38px;
        height: 38px;
      }

      .user-name {
        font-size: 1rem;
      }
    }
  }

  /* Large Desktop Styles (1200px and above) */
  @media (min-width: 1200px) {
    .nav-center {
      width: 95%;
      max-width: 1400px;
    }

    .logo-text {
      font-size: 1.75rem;
    }
  }

  /* Small Mobile Styles (480px and below) */
  @media (max-width: 480px) {
    padding: 0 0.75rem;
    height: 3.5rem;

    .nav-center {
      gap: 0.5rem;
    }

    .toggle-btn {
      font-size: 1.3rem;
      padding: 0.4rem;
    }

    .logo {
      width: 35px;
      height: 35px;
    }

    .btn-container {
      gap: 0.5rem;
    }

    .user-profile {
      padding: 0.3rem 0.6rem;

      .user-avatar-img {
        width: 28px;
        height: 28px;
      }

      .user-icon {
        font-size: 1.3rem;
      }

      .user-name {
        display: none; /* Hide name on very small screens */
      }

      .down-icon {
        font-size: 0.7rem;
      }

      .dropdown {
        min-width: 120px;

        .dropdown-link,
        .dropdown-btn {
          padding: 0.6rem 0.8rem;
          font-size: 0.85rem;
        }
      }
    }
  }

  /* Extra Small Mobile Styles (360px and below) */
  @media (max-width: 360px) {
    padding: 0 0.5rem;

    .toggle-btn {
      font-size: 1.2rem;
      padding: 0.3rem;
    }

    .logo {
      width: 30px;
      height: 30px;
    }

    .user-profile {
      padding: 0.25rem 0.5rem;

      .user-avatar-img {
        width: 26px;
        height: 26px;
      }

      .user-icon {
        font-size: 1.2rem;
      }
    }
  }

  /* Landscape Mode for Mobile */
  @media (max-height: 500px) and (orientation: landscape) {
    height: 3rem;

    .user-profile {
      padding: 0.2rem 0.6rem;

      .dropdown {
        top: 100%;
        margin-top: 0.3rem;
      }
    }
  }

  /* High DPI Screens */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .user-avatar-img {
      border-width: 1.5px;
    }
  }

  /* Reduced motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .user-profile,
    .toggle-btn,
    .dropdown {
      transition: none;
      animation: none;
    }

    .user-profile:hover .down-icon {
      transform: none;
    }
  }
`;

export default Wrapper;
