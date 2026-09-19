// Shared UI Components
// Domain-agnostic, reusable UI primitives.
// Re-export from @emc/ui or define app-specific shared components here.

export { Button } from '@emc/ui';
export type { ButtonProps } from '@emc/ui';
export {
  AccordionGallery,
  type AccordionItem,
  type AccordionGalleryProps,
} from './AccordionGallery';
export { InfiniteSpiral, type SpiralItem, type InfiniteSpiralProps } from './InfiniteSpiral';
export { Masonry, type MasonryItem, type MasonryProps } from './Masonry';
