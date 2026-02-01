"use client";

import { Product } from "@/src/types";
import { useState, useEffect, use } from "react";
import { useCart } from "@/src/hooks/useCart";
import ProductCard from "@/src/components/ProductCard";
import { mock } from "node:test";

const mockProducts: Product[] = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1500000,
        imageUrl: "/images/headphones.jpg",
        stock: 10,
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        price: 2000000,
        imageUrl: "/images/keyboard.jpg",
        stock: 3,
    },
    {
        id: 3,
        name: "Gaming Mouse",
        price: 800000,
        imageUrl: "/images/mouse.jpg",
        stock: 0,
    },
]

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {addToCart,totalItems,totalPrice} = useCart();

    useEffect(() => {
        let cancelled = false;

        const fetchProducts = async () => {
            await new Promise((r) => setTimeout(r, 1000));
            if (cancelled) return;

            setProducts(mockProducts);
            setIsLoading(false);
        }

        fetchProducts();

        return () => {
            cancelled = true;
        }


    }, []);

    const handleAddAddToCart = (id: number) => {
        const product = products.find((p) => p.id === id);
        if (product) {
            addToCart(product);
        }

    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl"> Loading Product...</div>
            </div>
        )
    }


    return(
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                <div className="rounded-lg bg-white p-4 shadow">
                    <span className="text-gray-600">Cart :</span>
                    <span className="font-semibold">{totalItems} items</span>
                    <span className="mx-2">|</span>
                    <span className="font-bold text-green-600">
                        {new Intl.NumberFormat("id-ID",{
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits:0
                        }).format(totalPrice)}
                    </span>

                </div>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product)=>(
                    <ProductCard
                    key={product.id}
                    id = {product.id}
                    name = {product.name}
                    price = {product.price}
                    imageUrl = {product.imageUrl}
                    stock = {product.stock}
                    onAddToCart={handleAddAddToCart}
                    />
                ))}
            </div>

        </div>
    )
}