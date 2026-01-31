import type { SVGProps } from 'react';

interface ArrowLeftIconProps extends SVGProps<SVGSVGElement> {}

export default function ArrowLeftIcon({ className, ...props }: ArrowLeftIconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12 L5 12 M5 12 L12 5 M5 12 L12 19" />
    </svg>
  );
}
