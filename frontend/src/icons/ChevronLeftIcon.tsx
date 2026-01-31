import type { SVGProps } from 'react';

interface ChevronLeftIconProps extends SVGProps<SVGSVGElement> {}

export default function ChevronLeftIcon({ className, ...props }: ChevronLeftIconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}
