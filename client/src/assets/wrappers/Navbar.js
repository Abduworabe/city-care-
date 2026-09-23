import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height, 64px);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #0f0c29 0%, #1a1a2e 60%, #16213e 100%);
  padding: 0 1.25rem;
  border-bottom: 1px solid rgba(255, 96, 0, 0.25);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);

  .nav-center {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  /* ---- LEFT ---- */
  .nav-left {
    display: flex;
    align-items: center;
  }

  /* Hamburger — only visible below 992px */
  .hamburger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    background: rgba(255, 96, 0, 0.12);
    border: 1px solid rgba(255, 96, 0, 0.35);
    border-radius: 10px;
    color: #ffcc00;
    font-size: 1.25rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 96, 0, 0.25);
      border-color: rgba(255, 96, 0, 0.6);
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  @media (min-width: 992px) {
    .hamburger-btn {
      display: none;
    }
  }

  /* ---- RIGHT ---- */
  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-left: auto;
  }

  /* Generic icon button */
  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 96, 0, 0.2);
    border-radius: 50%;
    color: #ff9a3c;
    font-size: 1.05rem;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 96, 0, 0.18);
      border-color: rgba(255, 96, 0, 0.5);
      color: #ffcc00;
      transform: translateY(-1px);
    }
  }

  /* ---- PROFILE BUTTON ---- */
  .profile-container {
    position: relative;
  }

  .profile-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 96, 0, 0.25);
    border-radius: 50px;
    padding: 0.3rem 0.75rem 0.3rem 0.3rem;
    cursor: pointer;
    color: white;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 96, 0, 0.15);
      border-color: rgba(255, 96, 0, 0.5);
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .profile-img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #ff6000;
    flex-shrink: 0;
  }

  .profile-icon {
    font-size: 2.1rem;
    color: #ff9a3c;
    flex-shrink: 0;
  }

  .profile-name {
    font-size: 0.88rem;
    font-weight: 600;
    color: white;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    /* Hide on very small screens */
    @media (max-width: 480px) {
      display: none;
    }
  }

  .chevron {
    font-size: 0.7rem;
    color: #ff9a3c;
    transition: transform 0.25s ease;
    flex-shrink: 0;

    &.open {
      transform: rotate(180deg);
    }
  }

  /* ---- DROPDOWN ---- */
  .dropdown {
    position: absolute;
    top: calc(100% + 0.6rem);
    right: 0;
    min-width: 230px;
    background: #1a1a2e;
    border: 1px solid rgba(255, 96, 0, 0.3);
    border-radius: 14px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    z-index: 9000;
    overflow: hidden;
    animation: dropIn 0.2s ease;

    /* On very small screens, stretch to viewport */
    @media (max-width: 420px) {
      position: fixed;
      top: var(--nav-height, 64px);
      right: 8px;
      left: 8px;
      min-width: unset;
    }
  }

  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .dropdown-head {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1rem 1.25rem;
    background: rgba(255, 96, 0, 0.08);
    border-bottom: 1px solid rgba(255, 96, 0, 0.18);
  }

  .dropdown-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #ff6000;
    background: linear-gradient(135deg, #ff6000, #ffcc00);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.6rem;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .dropdown-name {
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0 0 0.15rem;
  }

  .dropdown-email {
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.78rem;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }

  .dropdown-divider {
    height: 1px;
    background: rgba(255, 96, 0, 0.15);
    margin: 0.25rem 0;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.25rem;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9rem;
    text-decoration: none;
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;

    &:hover {
      background: rgba(255, 96, 0, 0.1);
      border-left-color: #ff6000;
      color: white;
      padding-left: 1.5rem;
    }

    &.logout {
      color: #ff6b6b;

      &:hover {
        background: rgba(255, 107, 107, 0.1);
        border-left-color: #ff6b6b;
      }
    }
  }
`;

export default Wrapper;
