import {create} from 'zustand';

const initalState = {
    isOpen: false,
    cart: [],
}

export const useCartStore = create((set, get) => ({
    ...initalState,

    // metodo
    toggleSidebar: () => set( (state) => ({ isOpen: !state.isOpen }) ),

    //este ahora sirve solo para agregar al carrito, no para incrementar la cantidad
    addToCart: ( producto ) => {
        const cart = get().cart;

        const existe = cart.find((item) => item.id === producto.id );

        if ( existe ) {
            set({
                cart: cart.map((item) => 
                    item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1}
                    : item
                )
            })
        }else {
            const productoConCantidad = {
                ...producto,
                cantidad: 1
            }
    
            set({
                cart: [ ...cart, productoConCantidad ]
            })
        }


    },

    removeFromcart: ( productId ) => {
        const cart = get().cart;
        set({
            cart: cart.filter((item) => item.id !== productId)
        })
    },

    //ya no sirve porque tenemos el updateQuantity
    decrementeQuantity: ( producto ) => {
        const cart = get().cart;

        const existe = cart.find((item) => item.id === producto.id );

        if ( existe && existe.cantidad === 1) return;

        if ( existe ) {
            set({
                cart: cart.map((item) => 
                    item.id === producto.id
                    ? { ...item, cantidad: item.cantidad - 1}
                    : item
                )
            })
            
        }
    },

    totalPrice: () => {
        const cart = get().cart;
        // cart -> es el carrito
        // reduce -> metodo avanzado de array para acumular valores
        // (acc, item)
        // acc -> acumulador (valor que se va acumulando)
        // item -> cada uno de los elementos del array
        // => indica la función que se va a ejecutar
        // acc + item.precio * item.quantity
        // 0 -> valor inicial del acumulador
        // inicia en 0
        // el primer producto cuesta 10 y la cantidad es 2
        // acc = 0 + 10 * 2 = 20
        // el segundo producto cuesta 5 y la cantidad es 1
        // acc = 20 + 5 * 1 = 25
        // el tercer producto cuesta 10 y la cantidad es 3
        // acc = 25 + 10 * 3 = 55
        // fin no hay más productos
        // -> entonces devuelve 55
        const total = cart.reduce(
            (acc, item) => acc + item.price * item.cantidad
        , 0);

        return total;
    },
    updateQuantity:(id, amount) => set((state)=>({
        cart: state.cart.map(producto => {
            if(producto.id == id){
                return {
                    ...producto, 
                    cantidad: Math.max(1, producto.cantidad + amount) //amount siempre será -1 o +1
                }
            }
            return producto; 
        })
    }))
}))