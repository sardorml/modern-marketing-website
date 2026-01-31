import type { SVGProps } from 'react';

interface ChevronRightIconProps extends SVGProps<SVGSVGElement> {}

export default function ChevronRightIcon({ className, ...props }: ChevronRightIconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
