import React from 'react'

import { Button as HeadlessButton, ButtonProps } from '@headlessui/react'

interface Props extends ButtonProps {
  children: React.ReactNode
}

const Button = ({ children, ...props }: Props) => (
  <HeadlessButton
    {...props}
    className="inline-flex justify-center items-center gap-1 rounded-md bg-lime-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
  >
    {children}
  </HeadlessButton>
)

export default Button
