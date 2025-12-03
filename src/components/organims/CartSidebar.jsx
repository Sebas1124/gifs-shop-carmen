import { useCartStore } from "../../store/useCartStore"
import { CartItem } from "../molec/CartItem";

export const CartSidebar = () => {

    // estado que voy a observar
    const isOpen        = useCartStore((state) => state.isOpen);

    // funcion de abrir/cerrar sidebar
    const toggleSidebar = useCartStore((state) => state.toggleSidebar);

    // obtener el estado del carrito
    const cart = useCartStore((state) => state.cart);

    const totalCarrito = useCartStore((state) => state.totalPrice);

  return (

    <>
        
        {
            isOpen == true ? (
                <div 
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={toggleSidebar}
                >

                </div>
            ) : null
        }

        <aside className={`fixed top-0 right-0 h-full w-80 bg-slate-900 z-40 border-l border-slate-800 text-white transform transition-transform duration-300 ease-in-out ${ isOpen ? 'translate-x-0' : 'translate-x-full' }`}>
            <div className="p-6 h-full flex flex-col">
                <h2 className="text-2xl font-bold mb-6 text-pink-500">Tu carrito</h2>

                <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                    {
                    cart.length === 0 
                        ?
                        (
                            <p className="text-slate-400">El carrito está vacío.</p>
                        )
                        : cart.map((item) => (
                            <CartItem 
                                key={item.id}
                                id={item.id}
                                img={item.url}
                                titulo={item.title}
                                precio={item.price + '€'}
                                cantidad={item.cantidad}
                            />
                        ))
                    }
                </div>

                <div className="border-t border-slate-700 pt-4 mt-4">
                    <div className="flex justify-between text-xl font-bold mb-4">
                        <span>Total:</span>
                        <span>{totalCarrito()}</span>
                    </div>

                </div>

            </div>
        </aside>
    </>
  )
}
