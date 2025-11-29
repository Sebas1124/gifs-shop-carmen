
export const GifCard = ({  gif }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg bg-slate-900 flex flex-col">
        <div className="relative h-48 overflow-hidden">
            <img
                src={ gif.url }
                alt={ gif.title }
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div>
                {gif.price}€
            </div>
        </div>

        <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
            {/* titlo y stock */}
            <div>
                <h3 className="text-white text-sm font-bold truncate">{gif.title}</h3>
                <p className="text-slate-400 text-xs">Stock: { gif.stock }</p>
            </div>

            {/* acciones */}
            <div>
                <button
                    className="cursor-pointer w-full bg-slate-700 hover:bg-pink-600 text-white text-sm font-semibold rounded"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>

    </div>
  )
}
