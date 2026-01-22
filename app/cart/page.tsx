"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/site-layout";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  Package,
  ChevronRight,
} from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setCouponApplied(true);
      setCouponDiscount(totalPrice * 0.1);
    }
  };

  const shippingCost = totalPrice > 999 ? 0 : 99;
  const finalTotal = totalPrice - couponDiscount + shippingCost;

  if (items.length === 0) {
    return (
      <SiteLayout>
        <section className="min-h-[60vh] flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you have not added any items to your cart yet. Start exploring our
              collection!
            </p>
            <Link href="/products">
              <Button size="lg" className="gap-2">
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Shopping Cart</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold">
              Shopping Cart
              <Badge variant="secondary" className="ml-3 text-base">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </Badge>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Product Image */}
                          <div className="relative w-full sm:w-40 h-40 bg-secondary/50 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div>
                                  <Link
                                    href={`/products/${item.id}`}
                                    className="font-semibold text-lg hover:text-primary transition-colors"
                                  >
                                    {item.name}
                                  </Link>
                                  {item.selectedColor && (
                                    <p className="text-sm text-muted-foreground">
                                      Color: {item.selectedColor}
                                    </p>
                                  )}
                                  {item.selectedSize && (
                                    <p className="text-sm text-muted-foreground">
                                      Size: {item.selectedSize}
                                    </p>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-muted-foreground hover:text-destructive -mt-1"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="w-5 h-5" />
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-9 w-9 bg-transparent"
                                  onClick={() =>
                                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-9 w-9 bg-transparent"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <p className="font-bold text-lg">
                                  Rs. {(item.price * item.quantity).toLocaleString()}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Rs. {item.price.toLocaleString()} each
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Clear Cart */}
              <div className="flex justify-end pt-4">
                <Button variant="ghost" className="text-muted-foreground" onClick={clearCart}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>

                    {/* Coupon Code */}
                    <div className="mb-6">
                      <label className="text-sm font-medium mb-2 block">
                        Have a coupon?
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="pl-10"
                            disabled={couponApplied}
                          />
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleApplyCoupon}
                          disabled={!couponCode || couponApplied}
                        >
                          Apply
                        </Button>
                      </div>
                      {couponApplied && (
                        <p className="text-sm text-accent mt-2">
                          Coupon SAVE10 applied! You saved Rs. {couponDiscount.toLocaleString()}
                        </p>
                      )}
                      {!couponApplied && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Try SAVE10 for 10% off
                        </p>
                      )}
                    </div>

                    <Separator className="my-6" />

                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>Rs. {totalPrice.toLocaleString()}</span>
                      </div>
                      {couponApplied && (
                        <div className="flex justify-between text-accent">
                          <span>Discount</span>
                          <span>-Rs. {couponDiscount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>
                          {shippingCost === 0 ? (
                            <span className="text-accent">FREE</span>
                          ) : (
                            `Rs. ${shippingCost}`
                          )}
                        </span>
                      </div>
                      {shippingCost > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Free shipping on orders above Rs. 999
                        </p>
                      )}
                    </div>

                    <Separator className="my-6" />

                    <div className="flex justify-between items-center mb-6">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="font-bold text-2xl text-primary">
                        Rs. {finalTotal.toLocaleString()}
                      </span>
                    </div>

                    <Button size="lg" className="w-full gap-2 mb-4">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5" />
                    </Button>

                    <Link href="/products">
                      <Button variant="outline" size="lg" className="w-full bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Truck className="w-5 h-5 text-primary" />
                          </div>
                          <p className="text-xs text-muted-foreground">Fast Delivery</p>
                        </div>
                        <div className="text-center">
                          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Shield className="w-5 h-5 text-accent" />
                          </div>
                          <p className="text-xs text-muted-foreground">Secure Payment</p>
                        </div>
                        <div className="text-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Package className="w-5 h-5 text-primary" />
                          </div>
                          <p className="text-xs text-muted-foreground">Quality Pack</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
