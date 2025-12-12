import { useEffect, useRef, useState } from "react"
import { Input } from "./components/atoms/Input"
import { useDebounce } from "./hooks/useDebounce"
import { InfiniteGifGrid } from "./components/organims/InfiniteGifGrid"
import { CartSidebar } from "./components/organims/CartSidebar"
import { useCartStore } from "./store/useCartStore"


export const App = () => {

  const [value, setValue] = useState('')

  const handleSearch = ( event ) => {
    setValue( event.target.value )
  }

  const debounceSearch = useDebounce( value, 700 );

  const isOpen        = useCartStore((state) => state.isOpen);
  const toggleSidebar = useCartStore((state) => state.toggleSidebar);
  const cart          = useCartStore((state) => state.cart);

  // const elementoObjetivo = useRef(null);

  // useEffect(() => {
    
  //   if (!elementoObjetivo.current) return;

  //   elementoObjetivo.current.style.backgroundColor = 'red';

  // }, [elementoObjetivo])
  

  return (
    <div className="flex min-h-screen bg-slate-950 text-white p-4 overflow-hidden">

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="p-4 bg-slate-900 rounded-md backdrop-blur-md sticky top-0 z-30 border-b border-slate-800 flex justify-between items-center">

          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-400 bg-linear-to-r from purple-400 to-pink-600">
            Giffy 
            <span className="text-white">
              Shop
            </span>
          </h1>

          {/* buscador */}
          <div className="flex-1 max-w-xl mx-4">
            <Input
              placeholder="Buscar gifs..."
              value={value}
              onChange={handleSearch}
            />

            <span>Escribe que gifs quieres buscar.</span>

          </div>

          <button
            className="relative p-2 text-2xl"
            onClick={toggleSidebar}
          >
            <span className="absolute -top-2 -left-2 bg-pink-600 rounded-full w-5 h-6 flex justify-center items-center text-white font-bold p-3 text-sm">
              {
                cart.length
              }
            </span>
            🛒
          </button>

        </header>

        <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <h2 className="text-2xl font-bold mb-4">Tendencias</h2>
          
          {
            debounceSearch 
            ? 'Buscando gifs de: ' + debounceSearch 
            : 'Mostrando gifs de tendencias'
          }

          <InfiniteGifGrid category={debounceSearch}/>

        </main>

      </div>

      {/* <div ref={elementoObjetivo}>
        Hola soy el final
      </div> */}

      {
        isOpen == true ? <CartSidebar/> : null
      }

    </div>
  )
}
