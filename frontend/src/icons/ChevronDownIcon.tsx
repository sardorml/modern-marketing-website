import type { SVGProps } from 'react';

interface ChevronDownIconProps extends SVGProps<SVGSVGElement> {}

export default function ChevronDownIcon({ className, ...props }: ChevronDownIconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
