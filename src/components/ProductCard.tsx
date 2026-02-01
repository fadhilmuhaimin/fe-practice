"use client";
import Image from "next/image";

type ProductCardProps = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    stock: number;
    onAddToCart: (id: number) => void;
};


export default function ProductCard({
    id,
    name,
    price,
    imageUrl,
    stock,
    onAddToCart
}: ProductCardProps) {

    const isOutOfStock = stock <= 0;
    const isLowStock = stock > 0 && stock <= 5;

    const handleAddToCart = () => {
        onAddToCart(id);
    };
    return (
        <div className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">

            {isLowStock && (
                <span className="absolute right-2 top-2 z-10 rounded-full bg-orange-500 px-2 py-1 text-xs font-semibold text-white">Low Stock</span>
            )}

            {/* image */}
            <div className="relative mb-4 aspect-square overflow-hidden rounded-md">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                />
            </div>


            <h3 className="mb-2 text-lg font-semibold text-gray-900">{name}</h3>
            <p className="mb-4 text-xl font-bold text-green-600">
                {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0
                }).format(price
                )}
            </p>

            <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
            >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>

        </div>
    );
}