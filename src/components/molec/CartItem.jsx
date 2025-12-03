import React from 'react'
import { useCartStore } from '../../store/useCartStore'

export const CartItem = ({ id, img, titulo, precio, cantidad }) => {

    const eliminar = useCartStore((state) => state.removeFromcart);
    const incrementar = useCartStore((state) => state.addToCart);
    const decrementar = useCartStore((state) => state.decrementeQuantity);

  return (
    <div className='flex gap-3 bg-slate-800 p-2 rounded-lg'>
        <img
            src={img}
            alt={titulo}
            className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{titulo}</p>
            <p className="text-xs text-pink-400">{precio}</p>

            <div className="flex items-center gap-2 mt-2">
                <button 
                    onClick={() => decrementar({ id })}
                    className="cursor-pointer px-2 bg-slate-700 rounded text-xs"
                >
                    -1
                </button>
                <span>{cantidad}</span>
                <button 
                    onClick={() => incrementar({ id })}
                    className="cursor-pointer px-2 bg-slate-700 rounded text-xs"
                >
                    +1
                </button>
                <button 
                    onClick={() => eliminar(id)}
                    className="cursor-pointer ml-auto text-xs text-red-400"
                >
                    🗑️
                </button>
            </div>
        </div>
    </div>
  )
}
