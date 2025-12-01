import styled from "styled-components";

const Wrapper = styled.main`
  /* Enhanced Color Variables */
  --primary-orange: #ff6000;
  --primary-dark: #e05500;
  --primary-light: #ff8c00;
  --white: #ffffff;
  --light-black: #101010;
  --dark-gray: #2d3748;
  --light-gray: #f8fafc;
  --text-gray: #64748b;
  --text-dark: #334155;
  --shadow-light: rgba(0, 0, 0, 0.1);
  --shadow-medium: rgba(0, 0, 0, 0.15);
  --shadow-heavy: rgba(0, 0, 0, 0.25);

  position: relative;
  z-index: 1;
  min-height: 100vh;
  overflow-x: hidden;

  /* Ensure content is readable over canvas background */
  .hero,
  .features,
  .stats,
  .map-preview,
  .cta,
  .footer {
    position: relative;
    z-index: 2;
  }

  /* Enhanced background effects for better readability */
  .hero-content,
  .feature-card,
  .stat-card {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(20px) saturate(180%);
    border-radius: 20px;
    padding: 2.5rem;
    margin: 1rem 0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .hero-content {
    background: linear-gradient(
      135deg,
      rgba(255, 96, 0, 0.15) 0%,
      rgba(255, 255, 255, 0.9) 100%
    );
    backdrop-filter: blur(25px) saturate(200%);
    border: 1px solid rgba(255, 96, 0, 0.3);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent,
        var(--primary-orange),
        transparent
      );
      animation: shimmer 3s ease-in-out infinite;
    }
  }

  @keyframes shimmer {
    0%,
    100% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
  }

  /* Enhanced Navigation */
  .nav {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px) saturate(180%);
    padding: 1rem 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
    }
  }

  .nav-center {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .nav-btn {
    padding: 0.75rem 2rem;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s;
    }

    &:hover::before {
      left: 100%;
    }

    &:first-child {
      background: transparent;
      color: var(--primary-orange);
      border: 2px solid var(--primary-orange);
      box-shadow: 0 4px 15px rgba(255, 96, 0, 0.2);

      &:hover {
        background: var(--primary-orange);
        color: var(--white);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 96, 0, 0.4);
      }
    }

    &:last-child {
      background: var(--primary-orange);
      color: var(--white);
      border: 2px solid var(--primary-orange);
      box-shadow: 0 4px 15px rgba(255, 96, 0, 0.3);

      &:hover {
        background: var(--primary-dark);
        border-color: var(--primary-dark);
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(255, 96, 0, 0.5);
      }
    }
  }

  /* Stats Section */
  .stats {
    padding: 6rem 0;
    background: transparent;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2.5rem;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(20px) saturate(180%);
    padding: 2.5rem 2rem;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(
        90deg,
        var(--primary-orange),
        var(--primary-light)
      );
    }

    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 60px rgba(255, 96, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    &.live {
      .live-indicator {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 12px;
        height: 12px;
        background: #00ff00;
        border-radius: 50%;
        animation: pulse 2s infinite;
      }
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
    }
  }

  .stat-card h3 {
    font-size: 3rem;
    margin-bottom: 0.75rem;
    color: var(--primary-orange);
    font-weight: 800;
    background: linear-gradient(
      135deg,
      var(--primary-orange),
      var(--primary-light)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-card p {
    color: var(--text-dark);
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  .stat-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  /* Section Center Utility */
  .section-center {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Enhanced Hero Section */
  .hero {
    background: transparent;
    color: var(--light-black);
    padding: 10rem 0 6rem;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-center {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .hero-content {
    h1 {
      font-size: 4rem;
      margin-bottom: 1.5rem;
      font-weight: 800;
      color: var(--light-black);
      line-height: 1.1;
      text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);

      .brand {
        background: linear-gradient(
          135deg,
          var(--primary-orange),
          var(--primary-light)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--primary-orange),
            var(--primary-light)
          );
          border-radius: 2px;
        }
      }
    }

    h2 {
      font-size: 1.8rem;
      margin-bottom: 2rem;
      font-weight: 400;
      color: var(--text-dark);
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
    }

    .hero-text {
      font-size: 1.3rem;
      margin-bottom: 3rem;
      line-height: 1.7;
      color: var(--text-gray);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
    }

    .hero-buttons {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-bottom: 3rem;
    }

    .feature-highlights {
      display: flex;
      gap: 2rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 3rem;
    }

    .feature-highlight {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      border: 2px solid transparent;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover,
      &.active {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }

      .feature-icon {
        font-size: 2rem;
      }

      .feature-info {
        text-align: left;

        h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          color: var(--text-dark);
        }

        p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-gray);
          font-weight: 600;
        }
      }
    }
  }

  /* Section Subtitle */
  .section-subtitle {
    text-align: center;
    font-size: 1.2rem;
    color: var(--text-gray);
    margin-bottom: 4rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  /* Enhanced Features Section */
  .features {
    padding: 8rem 0;
    background: transparent;
  }

  .features h2 {
    text-align: center;
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--light-black);
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 3rem;
  }

  .feature-card {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(20px) saturate(180%);
    padding: 3rem 2.5rem;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(
        180deg,
        var(--primary-orange),
        var(--primary-light)
      );
      transition: width 0.3s ease;
    }

    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 25px 60px rgba(255, 96, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);

      &::before {
        width: 6px;
      }
    }

    &.active {
      transform: translateY(-5px);
      box-shadow: 0 20px 50px rgba(255, 96, 0, 0.2);
    }
  }

  .feature-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    display: block;
    transition: transform 0.3s ease;
  }

  .feature-card:hover .feature-icon {
    transform: scale(1.1) rotate(5deg);
  }

  .feature-card h3 {
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
    color: var(--light-black);
    font-weight: 700;
  }

  .feature-card p {
    color: var(--text-gray);
    line-height: 1.7;
    font-size: 1.05rem;
    margin-bottom: 1.5rem;
  }

  .feature-stats {
    margin-bottom: 2rem;
  }

  .stat-badge {
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .feature-actions {
    .btn-feature {
      padding: 0.75rem 2rem;
      border: 2px solid;
      border-radius: 12px;
      background: transparent;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: inherit;
        color: white;
        transform: translateY(-2px);
      }
    }
  }

  /* Map Preview Section */
  .map-preview {
    padding: 6rem 0;
    background: transparent;
    text-align: center;
  }

  .map-preview h2 {
    font-size: 3rem;
    margin-bottom: 3rem;
    color: var(--light-black);
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
  }

  .map-features {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .map-feature {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .feature-marker {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  /* Enhanced CTA Section */
  .cta {
    padding: 8rem 0;
    background: transparent;
    color: var(--light-black);
    text-align: center;

    &.enhanced {
      .cta-content {
        background: linear-gradient(
          135deg,
          rgba(255, 96, 0, 0.1) 0%,
          rgba(255, 255, 255, 0.9) 100%
        );
        backdrop-filter: blur(20px);
        padding: 4rem;
        border-radius: 25px;
        border: 1px solid rgba(255, 96, 0, 0.2);
      }
    }
  }

  .cta h2 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
  }

  .cta p {
    font-size: 1.3rem;
    margin-bottom: 3rem;
    color: var(--text-gray);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  }

  .cta-features {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }

  .cta-feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    font-weight: 600;
    color: var(--text-dark);
  }

  .cta-buttons {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  }

  /* Enhanced Footer */
  .footer {
    background: linear-gradient(
      135deg,
      rgba(16, 16, 16, 0.95) 0%,
      rgba(45, 55, 72, 0.95) 100%
    );
    color: var(--white);
    padding: 4rem 0 1rem;
    backdrop-filter: blur(20px) saturate(180%);
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    &.enhanced {
      .footer-content {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        padding: 3rem;
        border-radius: 20px;
        margin-bottom: 2rem;
      }
    }
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .footer-section h4 {
    margin-bottom: 1.5rem;
    color: var(--primary-orange);
    font-size: 1.2rem;
    font-weight: 600;
  }

  .footer-section a {
    display: block;
    color: #cbd5e1;
    text-decoration: none;
    margin-bottom: 0.75rem;
    transition: all 0.3s ease;
    padding: 0.25rem 0;

    &:hover {
      color: var(--primary-orange);
      transform: translateX(5px);
    }
  }

  .footer-section p {
    color: #cbd5e1;
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1.2rem;
      text-decoration: none;

      &:hover {
        background: var(--primary-orange);
        transform: translateY(-2px);
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 2rem;
    text-align: center;
    color: #94a3b8;
    font-size: 0.9rem;

    a {
      color: #cbd5e1;
      text-decoration: none;
      margin: 0 0.5rem;

      &:hover {
        color: var(--primary-orange);
      }
    }
  }

  /* Enhanced Button Styles */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2.5rem;
    border-radius: 15px;
    text-decoration: none;
    font-weight: 700;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    font-size: 1.05rem;
    gap: 0.5rem;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s;
    }

    &:hover::before {
      left: 100%;
    }
  }

  .btn-primary {
    background: linear-gradient(
      135deg,
      var(--primary-orange),
      var(--primary-light)
    );
    color: var(--white);
    box-shadow: 0 8px 30px rgba(255, 96, 0, 0.4);

    &:hover {
      background: linear-gradient(
        135deg,
        var(--primary-dark),
        var(--primary-orange)
      );
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 15px 40px rgba(255, 96, 0, 0.6);
    }
  }

  .btn-secondary {
    background: transparent;
    color: var(--primary-orange);
    border: 2px solid var(--primary-orange);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(255, 96, 0, 0.2);

    &:hover {
      background: var(--primary-orange);
      color: var(--white);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 12px 35px rgba(255, 96, 0, 0.4);
    }
  }

  .btn-large {
    padding: 1.25rem 3rem;
    font-size: 1.15rem;
    border-radius: 18px;
  }

  /* Enhanced Responsive Design */
  @media (max-width: 1200px) {
    .hero-content h1 {
      font-size: 3.5rem;
    }

    .features h2,
    .cta h2,
    .map-preview h2 {
      font-size: 2.8rem;
    }
  }

  @media (max-width: 768px) {
    .nav {
      padding: 0.75rem 0;
    }

    .nav-center {
      padding: 0 1.5rem;
      flex-direction: column;
      gap: 1rem;
    }

    .nav-links {
      gap: 1rem;
    }

    .nav-btn {
      padding: 0.6rem 1.5rem;
      font-size: 0.9rem;
    }

    .hero {
      padding: 8rem 0 3rem;
    }

    .hero-content h1 {
      font-size: 2.8rem;
    }

    .hero-content h2 {
      font-size: 1.4rem;
    }

    .hero-content .hero-text {
      font-size: 1.1rem;
    }

    .features,
    .cta,
    .stats,
    .map-preview {
      padding: 5rem 0;
    }

    .features h2,
    .cta h2,
    .map-preview h2 {
      font-size: 2.2rem;
    }

    .hero-buttons,
    .cta-buttons {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .btn {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .stat-card {
      padding: 2rem 1.5rem;
    }

    .stat-card h3 {
      font-size: 2.5rem;
    }

    .features-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .feature-card {
      padding: 2.5rem 2rem;
    }

    .feature-highlights {
      flex-direction: column;
      align-items: center;
    }

    .map-features {
      flex-direction: column;
      align-items: center;
    }

    .cta-features {
      flex-direction: column;
      align-items: center;
    }
  }

  @media (max-width: 480px) {
    .hero-content h1 {
      font-size: 2.2rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .section-center {
      padding: 0 1.5rem;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .feature-card,
    .stat-card,
    .hero-content {
      padding: 2rem 1.5rem;
    }

    .nav-btn {
      padding: 0.5rem 1.2rem;
      font-size: 0.85rem;
    }

    .cta.enhanced .cta-content {
      padding: 2rem 1.5rem;
    }
  }

  /* Additional responsive styles for very small devices */
  @media (max-width: 360px) {
    .hero-content h1 {
      font-size: 2rem;
    }

    .hero-content h2 {
      font-size: 1.2rem;
    }
    .logo {
      width: 70px;
      height: auto;
    }
    .features h2,
    .cta h2,
    .map-preview h2 {
      font-size: 1.8rem;
    }

    .btn {
      padding: 0.9rem 2rem;
      font-size: 0.95rem;
    }
  }
`;

export default Wrapper;
