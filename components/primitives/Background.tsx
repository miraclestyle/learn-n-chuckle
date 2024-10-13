import React from 'react'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
}

const Backdrop = ({ children }: Props) => {
  const bgImage = `bg-[url('https://msfpfmwdawonueqaevru.supabase.co/storage/v1/object/public/img/comedyclub.png')]`
  return (
    <div
      className={clsx(
        'overflow-y-auto relative bg-cover bg-center bg-amber-800 w-full h-full',
        bgImage,
      )}
    >
      {children}
    </div>
  )
}

export default Backdrop
