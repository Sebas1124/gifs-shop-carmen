import React from 'react'

export const Input = ({ ...props }) => {
  return (
    <input
        className='w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600
        focus:border-pink-500 focus:ring-2 focus-ring-pink-500 outline-none
        transition-all shadow-sm placeholder-slate-400'
        {...props}
        
    />
  )
}
