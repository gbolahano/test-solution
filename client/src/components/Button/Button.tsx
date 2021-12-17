import clsx from 'clsx';
import * as React from 'react';

import { Spinner } from '../Spinner';

const variants = {
  primary: 'bg-blue-700 hover:bg-blue-800',
  danger: 'bg-red-600 hover:bg-red-700',
  success: 'bg-green-600 hover:bg-green-700',
  default: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-md',
  lg: 'px-8 py-3 text-lg',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      isLoading = false,
      type = 'button',
      variant = 'primary',
      size = 'sm',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        className={clsx(
          'flex items-center text-white rounded-lg',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Spinner variant="default" size="sm" />}
        <span className="mx-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
