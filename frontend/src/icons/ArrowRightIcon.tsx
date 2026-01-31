import type { SVGProps } from 'react';

interface ArrowRightIconProps extends SVGProps<SVGSVGElement> {}

export default function ArrowRightIcon({ className, ...props }: ArrowRightIconProps) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-7-7m7 7l-7 7" />
    </svg>
  );
}
