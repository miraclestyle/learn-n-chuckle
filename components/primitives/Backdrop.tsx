import React from 'react'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
}

const Backdrop = ({ children }: Props) => (
  <div
    className={clsx(' grid items-center justify-items-center min-h-screen p-8')}
  >
    {children}
  </div>
)

export default Backdrop
