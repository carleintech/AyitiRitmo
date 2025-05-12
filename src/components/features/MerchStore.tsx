// src/components/features/MerchStore.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '@/utils/payment';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  artistId: string;
  inStock: boolean;
}

interface MerchStoreProps {
  readonly products: Product[];
  readonly artistName: string;
}

export function MerchStore({ products, artistName }: MerchStoreProps) {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);

  const updateQuantity = (productId: string, change: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      const currentQty = newCart[productId] || 0;
      const newQty = Math.max(0, currentQty + change);
      
      if (newQty === 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = newQty;
      }
      
      return newCart;
    });
  };

  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product?.price ?? 0) * quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    const total = calculateTotal();
    const items = Object.entries(cart).map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId)!;
      return {
        productId,
        name: product.name,
        price: product.price,
        quantity,
      };
    });

    setLoading(true);
    
    try {
      // Create payment intent for merchandise
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          type: 'merchandise',
          artistId: products[0]?.artistId,
          items,
        }),
      });

      await response.json();
      
      // Integration with Stripe Elements would go here
      // Confirm payment after successful authentication
      
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const totalAmount = calculateTotal();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{artistName}'s Store</h2>
        {cartItemCount > 0 && (
          <Button className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart ({cartItemCount})
            <span className="absolute -top-2 -right-2 bg-haitian-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
                <span className="font-bold">{formatCurrency(product.price)}</span>
              </div>
              
              {product.inStock ? (
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => updateQuantity(product.id, -1)}
                    disabled={!cart[product.id]}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{cart[product.id] || 0}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => updateQuantity(product.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Out of Stock</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {totalAmount > 0 && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">Total:</span>
            <span className="text-xl font-bold">{formatCurrency(totalAmount)}</span>
          </div>
          <Button 
            className="w-full bg-haitian-blue hover:bg-haitian-blue/90"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Checkout'}
          </Button>
        </Card>
      )}
    </div>
  );
}