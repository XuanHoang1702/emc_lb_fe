import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock GSAP for unit tests in JSDOM environment
vi.mock('gsap', () => {
  const dummyTween = {
    to: vi.fn(),
    fromTo: vi.fn(),
    kill: vi.fn(),
  };

  const gsapMock = {
    to: vi.fn(() => dummyTween),
    fromTo: vi.fn(() => dummyTween),
    timeline: vi.fn(() => ({
      to: vi.fn(),
      fromTo: vi.fn(),
      play: vi.fn(),
      pause: vi.fn(),
    })),
    set: vi.fn(),
    killTweensOf: vi.fn(),
  };

  return {
    default: gsapMock,
    gsap: gsapMock,
  };
});
