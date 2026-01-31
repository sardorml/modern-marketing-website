import { ArrowLeftIcon, ArrowRightIcon } from '@/icons';

interface TestimonialNavButtonProps {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
  ariaLabel: string;
}

export default function TestimonialNavButton({ direction, disabled, onClick, ariaLabel }: TestimonialNavButtonProps) {
  const Icon = direction === 'prev' ? ArrowLeftIcon : ArrowRightIcon;
  const isActive = !disabled;

  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
        isActive ? 'bg-white text-brand-brown-500 hover:bg-brand-brown-50' : 'bg-brand-brown-400 text-white'
      }`}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <Icon className="w-5 h-5 rtl:rotate-180" />
    </button>
  );
}
