"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Store,
  Bell,
  Mail,
  CreditCard,
  Truck,
  Shield,
  Palette,
  Save,
  Globe,
} from "lucide-react";

const settingsSections = [
  { id: "store", label: "Store Info", icon: Store },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
];

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState("store");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your store configuration</p>
        </div>
        <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-4">
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === "store" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-primary" />
                    Store Information
                  </CardTitle>
                  <CardDescription>
                    Basic information about your store
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input id="storeName" defaultValue="Envelop" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeEmail">Contact Email</Label>
                      <Input id="storeEmail" type="email" defaultValue="hello@envelop.in" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storePhone">Phone Number</Label>
                      <Input id="storePhone" defaultValue="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeWebsite">Website</Label>
                      <Input id="storeWebsite" defaultValue="https://envelop.in" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Address</Label>
                    <Textarea
                      id="storeAddress"
                      defaultValue="123 Stationery Lane, Mumbai, Maharashtra 400001, India"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeDescription">Store Description</Label>
                    <Textarea
                      id="storeDescription"
                      defaultValue="Quality envelopes for every occasion. From retail to bulk corporate orders, we deliver excellence across India."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Regional Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Input id="currency" defaultValue="INR (Rs.)" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Input id="timezone" defaultValue="Asia/Kolkata (IST)" disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeSection === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { id: "newOrders", label: "New Orders", description: "Get notified when a new order is placed", default: true },
                    { id: "orderUpdates", label: "Order Updates", description: "Receive updates on order status changes", default: true },
                    { id: "lowStock", label: "Low Stock Alerts", description: "Alert when product stock falls below threshold", default: true },
                    { id: "newCustomers", label: "New Customers", description: "Notification when new customers register", default: false },
                    { id: "reviews", label: "Customer Reviews", description: "Get notified about new product reviews", default: true },
                    { id: "marketing", label: "Marketing Updates", description: "Receive tips and marketing suggestions", default: false },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch id={item.id} defaultChecked={item.default} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeSection === "shipping" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    Shipping Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Free Shipping</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable free shipping for orders above threshold
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="freeShippingThreshold">Free Shipping Threshold</Label>
                      <Input id="freeShippingThreshold" defaultValue="999" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="standardShippingRate">Standard Shipping Rate</Label>
                      <Input id="standardShippingRate" defaultValue="99" type="number" />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="processingTime">Processing Time (days)</Label>
                    <Input id="processingTime" defaultValue="2-3" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeSection === "payments" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Methods
                  </CardTitle>
                  <CardDescription>Configure accepted payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { id: "upi", label: "UPI Payments", description: "Accept payments via UPI (GPay, PhonePe, etc.)", default: true },
                    { id: "cards", label: "Credit/Debit Cards", description: "Accept Visa, Mastercard, Rupay", default: true },
                    { id: "netbanking", label: "Net Banking", description: "Direct bank transfers", default: true },
                    { id: "cod", label: "Cash on Delivery", description: "Pay at the time of delivery", default: true },
                    { id: "wallets", label: "Digital Wallets", description: "Paytm, Amazon Pay, etc.", default: false },
                  ].map((method) => (
                    <div key={method.id} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor={method.id}>{method.label}</Label>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                      <Switch id={method.id} defaultChecked={method.default} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeSection === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <Label>Change Password</Label>
                    <div className="grid gap-4">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                    <Button variant="outline">Update Password</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
