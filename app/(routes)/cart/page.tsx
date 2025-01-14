"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/formatPrice"
import CartItem from "./components/cart-item"


export default function Page() {
  const { items, removeAll } = useCart()

  const prices = items.map((product => product.price))
  const totalPrice = prices.reduce((total, price) => total + price, 0)

  const sendWhatsAppMessage = () => {
    const customerNumber = "+584141885117"
    const itemsMessage = items
      .map(item => `- ${item.productName}: ${formatPrice(item.price)}`)
      .join("\n")
    const message = `"¡Hola! Quisiera realizar un pedido con los siguientes productos. ¡Muchas gracias!" ♡\n
    Pedido:\n${itemsMessage}\n\nTotal: ${formatPrice(totalPrice)}`

    const whatsappUrl = `https://wa.me/${customerNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }


  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-5 text-3xl font-bold text-primary">Shopping Cart</h1>
      <div className="grid sm:grid-cols-2 sm:gap-5">
        <div>
          {items.length == 0 && (
            <p>No hay productos en el carrito</p>
          )}
          <ul>
            {items.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </ul>
          <Separator className=" bg-primary/30 gap-5 my-4" />

          {items.length > 1 && (
            <Button
              className="gap-3 m-2 float-right"
              variant="destructive"
              onClick={() => {
                if (window.confirm('¿Estás seguro de que deseas remover todos los productos del carrito?')) {
                  removeAll();
                }
              }}
            >
              Remover todo
            </Button>
          )}

        </div>
        {items.length > 0 && (
          <div className="max-w-xl gap-5 my-4">
            <div className="p-6 rounded-lg bg-rose-100">
              <p className="mb-3 text-lg font-semibold dark:text-black">Detalles del Pedido</p>
              <Separator className=" bg-primary/30" />
              <div className="flex justify-between gap-5 my-4">
                <p className=" dark:text-black">Monto Total</p>
                <p className=" dark:text-black font-semibold">{formatPrice(totalPrice)}</p>
              </div>
              <Separator className=" bg-primary/30" />
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400 gap-5 my-4">
                  Al hacer clic en `Comprar`, tu pedido será enviado por WhatsApp a nuestro equipo para procesar el pago.
                </p>
              </div>

              <div className="flex items-center justify-center w-full mt-3">
                <Button
                  className="w-full"
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que deseas realizar la compra?')) {
                      sendWhatsAppMessage();
                    }
                  }}
                >
                  Comprar
                </Button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}
