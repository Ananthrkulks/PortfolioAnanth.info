declare module '@splidejs/react-splide' {
  import { ComponentType, ReactNode } from 'react';

  interface SplideProps {
    options?: {
      type?: string;
      perPage?: number;
      perMove?: number;
      gap?: string;
      pagination?: boolean;
      arrows?: boolean;
      drag?: boolean;
      breakpoints?: {
        [key: number]: {
          perPage?: number;
        };
      };
      [key: string]: any;
    };
    children?: ReactNode;
    className?: string;
  }

  interface SplideSlideProps {
    children?: ReactNode;
    className?: string;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
} 