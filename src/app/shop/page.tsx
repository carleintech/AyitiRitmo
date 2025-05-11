'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Shirt,
  Disc,
  Ticket,
  Star,
  Heart,
  ShoppingBag,
  Filter,
  Grid,
  List,
  MapPin,
  Calendar
} from 'lucide-react';

const shopCategories = [
  { id: 'merchandise', label: 'Artist Merchandise', icon: Shirt },
  { id: 'branded', label: 'AyitiRitmo Branded', icon: ShoppingBag },
  { id: 'tickets', label: 'Event Tickets', icon: Ticket },
];

const products = [
  // Merchandise
  { 
    id: 1, 
    name: 'Artist Name Tour T-Shirt', 
    price: 29.99, 
    category: 'merchandise', 
    rating: 4.8, 
    image: 'from-haiti-red to-orange-500', 
    artist: 'Artist Name',
    type: 'Apparel'
  },
  { 
    id: 2, 
    name: 'Limited Edition Vinyl', 
    price: 45.99, 
    category: 'merchandise', 
    rating: 4.9, 
    image: 'from-haiti-blue to-blue-500', 
    artist: 'Artist Name',
    type: 'Music'
  },
  { 
    id: 3, 
    name: 'Konpa Dance Hat', 
    price: 19.99, 
    category: 'merchandise', 
    rating: 4.7, 
    image: 'from-purple-600 to-pink-500', 
    artist: 'Artist Name',
    type: 'Accessories'
  },
  // Branded
  { 
    id: 4, 
    name: 'AyitiRitmo Logo Hoodie', 
    price: 59.99, 
    category: 'branded', 
    rating: 4.8, 
    image: 'from-haiti-red to-haiti-blue', 
    type: 'Apparel'
  },
  { 
    id: 5, 
    name: 'AyitiRitmo Headphones', 
    price: 89.99, 
    category: 'branded', 
    rating: 4.6, 
    image: 'from-haiti-gold to-yellow-500', 
    type: 'Electronics'
  },
  { 
    id: 6, 
    name: 'Haitian Flag Tote Bag', 
    price: 24.99, 
    category: 'branded', 
    rating: 4.9, 
    image: 'from-green-600 to-cyan-500', 
    type: 'Accessories'
  },
  // Tickets
  { 
    id: 7, 
    name: 'Carnival 2024 Weekend Pass', 
    price: 149.99, 
    category: 'tickets', 
    date: 'Feb 10-13, 2024', 
    location: 'Port-au-Prince', 
    image: 'from-orange-500 to-red-500',
    type: 'Event'
  },
  { 
    id: 8, 
    name: 'Artist Concert - VIP Experience', 
    price: 89.99, 
    category: 'tickets', 
    date: 'June 15, 2024', 
    location: 'Miami, FL', 
    image: 'from-blue-600 to-purple-500',
    type: 'Concert'
  },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('merchandise');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = products.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Shop</h1>
        <p className="text-white/60">Support Haitian Artists & Culture</p>
      </motion.div>

      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-haiti-red via-orange-500 to-haiti-gold">
          <div className="p-8 relative">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Limited Edition Collection</h2>
              <p className="text-white/90 mb-6">Get exclusive merchandise before it's gone</p>
              <Button className="bg-white text-haiti-red hover:bg-white/90">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Shop Now
              </Button>
            </div>
            <div className="absolute right-8 top-8 opacity-20">
              <ShoppingBag className="h-32 w-32 text-white" />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-slate-800">
              {shopCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="data-[state=active]:bg-haiti-red data-[state=active]:text-white"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Filter className="h-4 w-4" />
              </Button>
              <div className="flex rounded-lg bg-slate-800 p-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setViewMode('grid')}
                  className={`h-8 w-8 ${viewMode === 'grid' ? 'bg-haiti-red text-white' : 'text-white/60 hover:text-white'}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setViewMode('list')}
                  className={`h-8 w-8 ${viewMode === 'list' ? 'bg-haiti-red text-white' : 'text-white/60 hover:text-white'}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {shopCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'space-y-4'}>
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {viewMode === 'grid' ? (
                      // Grid View
                      <div className="cursor-pointer">
                        <div className={`aspect-square bg-gradient-to-br ${product.image} relative overflow-hidden`}>
                          <Button
                            size="icon"
                            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          >
                            <Heart className="h-4 w-4 text-white" />
                          </Button>
                          {product.category === 'tickets' && (
                            <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                              Limited
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium text-white line-clamp-1">{product.name}</h3>
                              {(product as any).artist && (
                                <p className="text-sm text-white/60">{(product as any).artist}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="h-3 w-3 fill-current" />
                              <span className="text-xs">{product.rating}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-lg font-bold text-white">${product.price}</span>
                              {product.category === 'tickets' && (
                                <div className="text-xs text-white/60 mt-1">
                                  {(product as any).date}
                                </div>
                              )}
                            </div>
                            <Button size="sm" className="bg-haiti-red hover:bg-haiti-red/90">
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <div className="flex gap-4 p-4 cursor-pointer">
                        <div className={`w-24 h-24 bg-gradient-to-br ${product.image} rounded-lg flex-shrink-0`} />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-white">{product.name}</h3>
                              {(product as any).artist && (
                                <p className="text-sm text-white/60">{(product as any).artist}</p>
                              )}
                              {product.category === 'tickets' && (
                                <div className="flex items-center gap-4 text-sm text-white/60 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {(product as any).date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {(product as any).location}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-white">${product.price}</div>
                              <div className="flex items-center gap-1 text-yellow-400 justify-end">
                                <Star className="h-3 w-3 fill-current" />
                                <span className="text-xs">{product.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs text-white/50">{product.type}</span>
                            <div className="flex gap-2">
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-white/60 hover:text-white">
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button size="sm" className="bg-haiti-red hover:bg-haiti-red/90">
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Shopping Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="p-6 bg-gradient-to-br from-haiti-red/20 to-haiti-red/5">
          <div className="flex items-center gap-3 mb-2">
            <Shirt className="h-6 w-6 text-haiti-red" />
            <h3 className="font-semibold text-white">Artist Support</h3>
          </div>
          <p className="text-white/60 text-sm">
            Your purchases directly support Haitian artists and their communities
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-haiti-blue/20 to-haiti-blue/5">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="h-6 w-6 text-haiti-blue" />
            <h3 className="font-semibold text-white">Free Shipping</h3>
          </div>
          <p className="text-white/60 text-sm">
            Free worldwide shipping on orders over $50
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-haiti-gold/20 to-haiti-gold/5">
          <div className="flex items-center gap-3 mb-2">
            <Star className="h-6 w-6 text-haiti-gold" />
            <h3 className="font-semibold text-white">Member Perks</h3>
          </div>
          <p className="text-white/60 text-sm">
            Exclusive merchandise and early access for members
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Shop;