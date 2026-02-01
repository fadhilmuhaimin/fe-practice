"use client";
import { CartItem } from "../types";

type CartDrawerProps = {
    isOpen : boolean;
    onClose : () => void;
    items: CartItem[];
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
    totalPrice: number;
}

export default function CartDrawer({
    isOpen,
    onClose,
    items,
    onUpdateQuantity,
    onRemove,
    totalPrice
}: CartDrawerProps) {
    if (!isOpen) return null;
    return(
        <>
         <div className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}>
         </div>

         <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-gray-100"
                        >x</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ?(
                        <p className="text-center text-gray-500">Your cart is empty</p>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li 
                                    key={item.product.id}
                                    className="flex items-center gap-4 rounded-lg border p-3"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.product.name}</h3>
                                            <p className="text-green-300">
                                                {
                                                    new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        maximumFractionDigits: 0
                                                    }).format(item.product.price)
                                                }
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onUpdateQuantity(item.product.id,item.quantity-1)}
                                                className="h-8 w-8 rounded bg-gray-200">
                                                -
                                            </button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.product.id,item.quantity+1)}
                                                className="h-8 w-8 rounded bg-gray-200">
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={()=> onRemove(item.product.id)}>🗑️</button>
                                        
                                    </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="border-t p-4">
                    <div className="mb-4 flex justify-between text-xl font-bold">
                        <span>Total :</span>
                        <span className="text-green-600">
                            {
                                new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    maximumFractionDigits: 0
                                }).format(totalPrice)
                            }
                        </span>
                    </div>
                    <button className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
                        Checkout
                    </button>
                </div>
            </div>

         </div>
        </>
    )
}