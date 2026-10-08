"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UtensilsCrossed,
  Settings,
  Calendar,
  Image as ImageIcon,
  Compass,
  ArrowLeft,
  CheckCircle,
  Database,
  Lock,
  LogOut,
  Edit2,
  Trash2,
  Plus,
  Save,
  X,
  Search,
  Filter,
  Shield,
  Activity,
  Phone,
  Mail,
  Clock,
  MapPin,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { MenuItem, MenuCategory, Reservation, CafeSettings, Destination, GalleryItem, AuditLog, AdminUser } from "@/types";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Current session user
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Tabs
  const [activeTab, setActiveTab] = useState<
    "overview" | "menu" | "reservations" | "gallery" | "destinations" | "settings" | "audit"
  >("overview");

  // State data
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [settings, setSettings] = useState<CafeSettings | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Filtering & search
  const [menuSearch, setMenuSearch] = useState("");
  const [reservationFilter, setReservationFilter] = useState<string>("ALL");

  // Modals & Editing States
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemData, setNewItemData] = useState<Partial<MenuItem>>({
    name: "",
    categoryId: "coffee",
    price: 200,
    currency: "Rs.",
    description: "",
    image: "/images/coffee-macro.jpg",
    available: true,
    featured: false,
    isVegetarian: true,
  });

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Load session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
        const data = await res.json();
        setCurrentUser(data.user);
        setAuthLoading(false);
        loadAllData();
      } catch {
        router.push("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  const loadAllData = async () => {
    try {
      const [menuRes, setRes, resRes, destRes, galRes, logRes] = await Promise.all([
        fetch("/api/menu"),
        fetch("/api/settings"),
        fetch("/api/reservations"),
        fetch("/api/destinations"),
        fetch("/api/gallery?admin=true"),
        fetch("/api/audit-logs"),
      ]);

      if (menuRes.ok) {
        const d = await menuRes.json();
        setMenuItems(d.items || []);
        setCategories(d.categories || []);
      }
      if (setRes.ok) setSettings(await setRes.json());
      if (resRes.ok) setReservations(await resRes.json());
      if (destRes.ok) setDestinations(await destRes.json());
      if (galRes.ok) setGallery(await galRes.json());
      if (logRes.ok) setAuditLogs(await logRes.json());
    } catch (err) {
      console.error("Data load error", err);
    }
  };

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Update Menu Item Price & Details
  const handleSaveMenuItem = async (item: MenuItem) => {
    try {
      const res = await fetch(`/api/menu/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) {
        const err = await res.json();
        showNotification(err.error || "Update failed", "error");
        return;
      }

      const data = await res.json();
      setMenuItems((prev) => prev.map((i) => (i.id === item.id ? data.item : i)));
      setEditingItem(null);
      showNotification(`Updated "${item.name}" price to ${item.currency} ${item.price}`);
      loadAllData();
    } catch {
      showNotification("Failed to save changes", "error");
    }
  };

  // Create New Menu Item
  const handleCreateMenuItem = async () => {
    try {
      if (!newItemData.name || !newItemData.price) {
        showNotification("Please provide name and price", "error");
        return;
      }

      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItemData),
      });

      if (!res.ok) {
        const err = await res.json();
        showNotification(err.error || "Failed to create item", "error");
        return;
      }

      const data = await res.json();
      setMenuItems((prev) => [...prev, data.item]);
      setIsAddingItem(false);
      setNewItemData({
        name: "",
        categoryId: "coffee",
        price: 200,
        currency: "Rs.",
        description: "",
        image: "/images/coffee-macro.jpg",
        available: true,
        featured: false,
        isVegetarian: true,
      });
      showNotification(`Added new item "${data.item.name}"`);
      loadAllData();
    } catch {
      showNotification("Failed to create menu item", "error");
    }
  };

  // Delete Menu Item
  const handleDeleteMenuItem = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the menu?`)) return;

    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (!res.ok) {
        showNotification("Delete failed", "error");
        return;
      }
      setMenuItems((prev) => prev.filter((i) => i.id !== id));
      showNotification(`Deleted "${name}"`);
      loadAllData();
    } catch {
      showNotification("Failed to delete item", "error");
    }
  };

  // Reservation Status Change
  const handleUpdateReservationStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        showNotification("Status update failed", "error");
        return;
      }

      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: status as any } : r))
      );
      showNotification(`Reservation status updated to ${status}`);
      loadAllData();
    } catch {
      showNotification("Failed to update reservation", "error");
    }
  };

  // Update Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        showNotification("Settings update failed", "error");
        return;
      }

      showNotification("Cafe operational settings updated successfully!");
      loadAllData();
    } catch {
      showNotification("Failed to update settings", "error");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#070809] flex items-center justify-center text-[#f4ede4] font-mono text-xs uppercase tracking-widest">
        Verifying administrator credentials...
      </div>
    );
  }

  // Filtered menu items
  const filteredMenuItems = menuItems.filter((i) =>
    i.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
    i.description.toLowerCase().includes(menuSearch.toLowerCase())
  );

  // Filtered reservations
  const filteredReservations = reservations.filter((r) =>
    reservationFilter === "ALL" ? true : r.status === reservationFilter
  );

  return (
    <div className="min-h-screen bg-[#070809] text-[#f4ede4] font-sans">
      {/* Top Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xs border text-xs shadow-2xl flex items-center gap-2 animate-in fade-in ${
            notification.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-300"
              : "bg-rose-950/90 border-rose-500/50 text-rose-300"
          }`}
        >
          <CheckCircle size={14} />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="border-b border-[#f4ede4]/10 bg-[#0a0b0d] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-1.5 rounded-full border border-[#f4ede4]/15 hover:border-[#c46845] text-[#9c9488] hover:text-[#f4ede4] transition-colors"
              title="Return to public site"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl tracking-wider text-[#f4ede4]">MUSAFIRCAFE</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#c46845]/20 text-[#c46845] border border-[#c46845]/40 uppercase">
                  {currentUser?.role || "ADMIN"}
                </span>
              </div>
              <span className="text-[10px] font-sans tracking-widest text-[#9c9488] uppercase block">
                Single Source of Truth CMS · {settings?.location || "Kathmandu"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <span className="text-xs text-[#f4ede4] block font-medium">{currentUser?.name}</span>
              <span className="text-[10px] text-[#9c9488]">{currentUser?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-[#f4ede4]/20 hover:border-rose-500 text-xs text-[#9c9488] hover:text-rose-400 transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-6 overflow-x-auto text-xs tracking-wider uppercase border-t border-[#f4ede4]/5">
          {[
            { id: "overview", label: "Overview & KPIs", icon: Activity },
            { id: "menu", label: `Menu (${menuItems.length})`, icon: UtensilsCrossed },
            { id: "reservations", label: `Reservations (${reservations.length})`, icon: Calendar },
            { id: "destinations", label: "Destinations", icon: Compass },
            { id: "gallery", label: "Gallery Moments", icon: ImageIcon },
            { id: "settings", label: "Cafe Settings", icon: Settings },
            { id: "audit", label: "Audit Trail", icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#c46845] text-[#f4ede4] font-medium"
                    : "border-transparent text-[#9c9488] hover:text-[#f4ede4]"
                }`}
              >
                <Icon size={14} className={activeTab === tab.id ? "text-[#c46845]" : ""} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="p-6 bg-[#131417] border border-[#f4ede4]/10 rounded-sm">
                <div className="flex items-center justify-between text-[#9c9488] mb-3">
                  <span className="text-xs uppercase tracking-wider">Pending Reservations</span>
                  <Calendar size={16} className="text-[#c46845]" />
                </div>
                <div className="font-serif text-4xl text-[#f4ede4]">
                  {reservations.filter((r) => r.status === "PENDING").length}
                </div>
                <div className="text-[11px] text-[#9c9488] mt-2">
                  {reservations.length} total customer bookings
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 bg-[#131417] border border-[#f4ede4]/10 rounded-sm">
                <div className="flex items-center justify-between text-[#9c9488] mb-3">
                  <span className="text-xs uppercase tracking-wider">Active Menu Items</span>
                  <UtensilsCrossed size={16} className="text-[#c46845]" />
                </div>
                <div className="font-serif text-4xl text-[#f4ede4]">
                  {menuItems.filter((i) => i.available).length}
                </div>
                <div className="text-[11px] text-[#9c9488] mt-2">
                  across {categories.length} categories
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 bg-[#131417] border border-[#f4ede4]/10 rounded-sm">
                <div className="flex items-center justify-between text-[#9c9488] mb-3">
                  <span className="text-xs uppercase tracking-wider">Featured Specialties</span>
                  <Sparkles size={16} className="text-[#d49b61]" />
                </div>
                <div className="font-serif text-4xl text-[#f4ede4]">
                  {menuItems.filter((i) => i.featured).length}
                </div>
                <div className="text-[11px] text-[#9c9488] mt-2">
                  highlighted on public menu
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-6 bg-[#131417] border border-[#f4ede4]/10 rounded-sm">
                <div className="flex items-center justify-between text-[#9c9488] mb-3">
                  <span className="text-xs uppercase tracking-wider">Booking Status</span>
                  <CheckCircle size={16} className="text-emerald-400" />
                </div>
                <div className="font-serif text-3xl text-[#f4ede4]">
                  {settings?.isReservationsEnabled ? "Open" : "Paused"}
                </div>
                <div className="text-[11px] text-[#9c9488] mt-2">
                  {settings?.openingHours}
                </div>
              </div>
            </div>

            {/* Quick Action & Owner Note */}
            <div className="p-6 sm:p-8 bg-[#131417] border border-[#f4ede4]/10 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-[#c46845] uppercase tracking-widest mb-2">
                <Shield size={14} />
                <span>Zero-Code Owner Control Verified</span>
              </div>
              <h2 className="font-serif text-2xl uppercase text-[#f4ede4] mb-2">
                Live Single Source of Truth
              </h2>
              <p className="text-xs sm:text-sm text-[#9c9488] leading-relaxed max-w-3xl mb-6">
                Any modifications made here (prices, descriptions, hours, new items, or gallery photos) immediately update the persistent database. The public website reads directly from this service without needing developer changes or redeployments.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("menu")}
                  className="px-4 py-2 bg-[#c46845] hover:bg-[#b05837] text-xs font-sans tracking-widest uppercase rounded-xs transition-colors cursor-pointer"
                >
                  Edit Menu Prices →
                </button>
                <button
                  onClick={() => setActiveTab("reservations")}
                  className="px-4 py-2 border border-[#f4ede4]/20 hover:border-[#f4ede4] text-xs font-sans tracking-widest uppercase rounded-xs transition-colors cursor-pointer"
                >
                  View Reservation Queue ({reservations.filter((r) => r.status === "PENDING").length})
                </button>
              </div>
            </div>

            {/* Recent Audit Activity Snapshot */}
            <div className="bg-[#131417] border border-[#f4ede4]/10 rounded-sm p-6">
              <h3 className="font-serif text-xl uppercase mb-4">Recent Audit Activity</h3>
              <div className="divide-y divide-[#f4ede4]/5 text-xs">
                {auditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-[#c46845] text-[10px] mr-2">[{log.action}]</span>
                      <span className="text-[#f4ede4]">{log.details}</span>
                    </div>
                    <div className="text-[10px] text-[#9c9488] font-mono">
                      {new Date(log.timestamp).toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })} · {log.performedBy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MENU MANAGER */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131417] p-4 rounded-sm border border-[#f4ede4]/10">
              <div className="relative flex-1 max-w-md">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9c9488]" />
                <input
                  type="text"
                  placeholder="Filter menu items..."
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs pl-9 pr-4 py-2 text-xs text-[#f4ede4] focus:outline-none focus:border-[#c46845]"
                />
              </div>

              <button
                onClick={() => setIsAddingItem(true)}
                className="px-4 py-2 bg-[#c46845] hover:bg-[#b05837] text-[#f4ede4] text-xs font-sans tracking-widest uppercase rounded-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Add New Menu Item</span>
              </button>
            </div>

            {/* Menu Items Table */}
            <div className="bg-[#131417] border border-[#f4ede4]/10 rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#0a0b0d] text-[#9c9488] uppercase tracking-wider border-b border-[#f4ede4]/10">
                    <tr>
                      <th className="p-4">Item Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price (NPR)</th>
                      <th className="p-4">Dietary</th>
                      <th className="p-4">Featured</th>
                      <th className="p-4">Availability</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4ede4]/5">
                    {filteredMenuItems.map((item) => (
                      <tr key={item.id} className="hover:bg-[#18191d] transition-colors">
                        <td className="p-4">
                          <span className="font-medium text-[#f4ede4] block">{item.name}</span>
                          <span className="text-[10px] text-[#9c9488] line-clamp-1">{item.description}</span>
                        </td>
                        <td className="p-4 uppercase text-[#9c9488] font-mono text-[11px]">{item.categoryId}</td>
                        <td className="p-4 font-mono font-medium text-[#c46845] text-sm">
                          {item.currency} {item.price}
                        </td>
                        <td className="p-4">
                          {item.isVegetarian ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                              Veg
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-neutral-800 text-neutral-300">
                              Non-Veg
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          {item.featured ? (
                            <span className="text-[#d49b61] font-mono text-[10px]">★ Featured</span>
                          ) : (
                            <span className="text-[#9c9488]/50">—</span>
                          )}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() =>
                              handleSaveMenuItem({ ...item, available: !item.available })
                            }
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono cursor-pointer transition-colors ${
                              item.available
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                                : "bg-rose-950 text-rose-300 border border-rose-500/30"
                            }`}
                          >
                            {item.available ? "In Stock" : "Unavailable"}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingItem(item)}
                              className="p-1.5 rounded-xs border border-[#f4ede4]/10 hover:border-[#c46845] text-[#9c9488] hover:text-[#f4ede4] transition-colors cursor-pointer"
                              title="Edit item price & details"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteMenuItem(item.id, item.name)}
                              className="p-1.5 rounded-xs border border-[#f4ede4]/10 hover:border-rose-500 text-[#9c9488] hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Edit Item Modal */}
            {editingItem && (
              <div className="fixed inset-0 z-50 bg-[#070809]/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in">
                <div className="relative max-w-lg w-full bg-[#131417] border border-[#f4ede4]/20 p-8 rounded-sm shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-[#f4ede4]/10 mb-6">
                    <h3 className="font-serif text-2xl uppercase text-[#f4ede4]">Edit Menu Item</h3>
                    <button
                      onClick={() => setEditingItem(null)}
                      className="text-[#9c9488] hover:text-[#f4ede4] p-1 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs font-sans">
                    <div>
                      <label className="block text-[#9c9488] uppercase tracking-wider mb-1">Item Name</label>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs p-2.5 text-[#f4ede4]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#9c9488] uppercase tracking-wider mb-1">Price (NPR)</label>
                        <input
                          type="number"
                          value={editingItem.price}
                          onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                          className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs p-2.5 text-[#f4ede4] font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[#9c9488] uppercase tracking-wider mb-1">Category</label>
                        <select
                          value={editingItem.categoryId}
                          onChange={(e) => setEditingItem({ ...editingItem, categoryId: e.target.value as any })}
                          className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs p-2.5 text-[#f4ede4]"
                        >
                          {categories.map((c) => (
                            <option key={c.slug} value={c.slug}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#9c9488] uppercase tracking-wider mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs p-2.5 text-[#f4ede4]"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingItem.available}
                          onChange={(e) => setEditingItem({ ...editingItem, available: e.target.checked })}
                        />
                        <span>Available for order</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingItem.featured}
                          onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                        />
                        <span>Featured item</span>
                      </label>
                    </div>

                    <div className="pt-6 border-t border-[#f4ede4]/10 flex justify-end gap-3">
                      <button
                        onClick={() => setEditingItem(null)}
                        className="px-4 py-2 border border-[#f4ede4]/20 text-[#9c9488] hover:text-[#f4ede4] rounded-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveMenuItem(editingItem)}
                        className="px-6 py-2 bg-[#c46845] hover:bg-[#b05837] text-[#f4ede4] rounded-xs cursor-pointer uppercase tracking-wider font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add Item Modal */}
            {isAddingItem && (
              <div className="fixed inset-0 z-50 bg-[#070809]/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in">
                <div className="relative max-w-lg w-full bg-[#131417] border border-[#f4ede4]/20 p-8 rounded-sm shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-[#f4ede4]/10 mb-6">
                    <h3 className="font-serif text-2xl uppercase text-[#f4ede4]">Add New Menu Item</h3>
                    <button
                      onClick={() => setIsAddingItem(false)}
                      className="text-[#9c9488] hover:text-[#f4ede4] p-1 cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs font-sans">
                    <div>
                      <label className="block text-[#9c9488] uppercase tracking-wider mb-1">Item Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Cardamom Cold Foam Cold Brew"
                        value={newItemData.name || ""}
                        onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                        className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs p-2.5 text-[#f4ede4]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#9c9488] uppercase tracking-wider mb-1">Price (NPR) *</label>
                        <input
                          type="number"
                          value={newItemData.price || 0}
                          onChange={(e) => setNewItemData({ ...newItemData, price: Number(e.target.value) })}
                          className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs p-2.5 text-[#f4ede4] font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[#9c9488] uppercase tracking-wider mb-1">Category</label>
                        <select
                          value={newItemData.categoryId}
                          onChange={(e) => setNewItemData({ ...newItemData, categoryId: e.target.value as any })}
                          className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs p-2.5 text-[#f4ede4]"
                        >
                          {categories.map((c) => (
                            <option key={c.slug} value={c.slug}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#9c9488] uppercase tracking-wider mb-1">Description *</label>
                      <textarea
                        rows={3}
                        placeholder="Describe flavor notes, ingredients, preparation..."
                        value={newItemData.description || ""}
                        onChange={(e) => setNewItemData({ ...newItemData, description: e.target.value })}
                        className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 rounded-xs p-2.5 text-[#f4ede4]"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newItemData.isVegetarian}
                          onChange={(e) => setNewItemData({ ...newItemData, isVegetarian: e.target.checked })}
                        />
                        <span>Vegetarian</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newItemData.featured}
                          onChange={(e) => setNewItemData({ ...newItemData, featured: e.target.checked })}
                        />
                        <span>Featured</span>
                      </label>
                    </div>

                    <div className="pt-6 border-t border-[#f4ede4]/10 flex justify-end gap-3">
                      <button
                        onClick={() => setIsAddingItem(false)}
                        className="px-4 py-2 border border-[#f4ede4]/20 text-[#9c9488] hover:text-[#f4ede4] rounded-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateMenuItem}
                        className="px-6 py-2 bg-[#c46845] hover:bg-[#b05837] text-[#f4ede4] rounded-xs cursor-pointer uppercase tracking-wider font-medium"
                      >
                        Create Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: RESERVATIONS MANAGER */}
        {activeTab === "reservations" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex items-center justify-between gap-4 bg-[#131417] p-4 rounded-sm border border-[#f4ede4]/10">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#9c9488] uppercase tracking-wider mr-2">Status Filter:</span>
                {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setReservationFilter(st)}
                    className={`px-3 py-1 rounded-xs text-[11px] font-mono tracking-wider transition-colors cursor-pointer ${
                      reservationFilter === st
                        ? "bg-[#c46845] text-[#f4ede4]"
                        : "bg-[#0a0b0d] text-[#9c9488] hover:text-[#f4ede4]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <span className="text-xs text-[#9c9488] font-mono">
                Showing {filteredReservations.length} of {reservations.length} total
              </span>
            </div>

            {/* Reservations Table */}
            <div className="bg-[#131417] border border-[#f4ede4]/10 rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#0a0b0d] text-[#9c9488] uppercase tracking-wider border-b border-[#f4ede4]/10">
                    <tr>
                      <th className="p-4">Reference</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Guests</th>
                      <th className="p-4">Notes / Occasion</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f4ede4]/5">
                    {filteredReservations.map((res) => (
                      <tr key={res.id} className="hover:bg-[#18191d] transition-colors">
                        <td className="p-4 font-mono font-medium text-[#c46845]">{res.code}</td>
                        <td className="p-4">
                          <span className="font-medium text-[#f4ede4] block">{res.name}</span>
                          <span className="text-[10px] text-[#9c9488] block">{res.phone}</span>
                          <span className="text-[10px] text-[#9c9488]">{res.email}</span>
                        </td>
                        <td className="p-4 font-mono text-[#f4ede4]">
                          <div>{res.date}</div>
                          <div className="text-[#9c9488] text-[10px]">{res.time}</div>
                        </td>
                        <td className="p-4">{res.guests} Guests</td>
                        <td className="p-4 max-w-xs text-[#9c9488] text-[11px]">
                          {res.occasion && <span className="text-[#d49b61] block font-medium">[{res.occasion}]</span>}
                          {res.notes || "No special requests"}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                              res.status === "CONFIRMED"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                                : res.status === "PENDING"
                                ? "bg-amber-950 text-amber-300 border border-amber-500/30"
                                : res.status === "COMPLETED"
                                ? "bg-blue-950 text-blue-300 border border-blue-500/30"
                                : "bg-neutral-800 text-neutral-400"
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {res.status !== "CONFIRMED" && (
                              <button
                                onClick={() => handleUpdateReservationStatus(res.id, "CONFIRMED")}
                                className="px-2 py-1 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 rounded-xs text-[10px] cursor-pointer"
                              >
                                Confirm
                              </button>
                            )}
                            {res.status !== "COMPLETED" && (
                              <button
                                onClick={() => handleUpdateReservationStatus(res.id, "COMPLETED")}
                                className="px-2 py-1 bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/40 rounded-xs text-[10px] cursor-pointer"
                              >
                                Complete
                              </button>
                            )}
                            {res.status !== "CANCELLED" && (
                              <button
                                onClick={() => handleUpdateReservationStatus(res.id, "CANCELLED")}
                                className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border border-neutral-700 rounded-xs text-[10px] cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DESTINATIONS */}
        {activeTab === "destinations" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d) => (
              <div key={d.id} className="p-6 bg-[#131417] border border-[#f4ede4]/10 rounded-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-2xl uppercase text-[#f4ede4]">{d.name}</h3>
                    <span className="text-xs text-[#9c9488]">{d.nepaliName}</span>
                  </div>
                  <span className="text-xs font-mono text-[#c46845] block mb-2">{d.elevation} · {d.distanceFromKathmandu}</span>
                  <p className="text-xs text-[#9c9488] leading-relaxed mb-4">{d.description}</p>
                  <p className="text-[11px] p-2 bg-[#0a0b0d] rounded-xs text-[#f4ede4]/80 border border-[#f4ede4]/5">
                    {d.culturalNote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: GALLERY */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((g) => (
                <div key={g.id} className="p-5 bg-[#131417] border border-[#f4ede4]/10 rounded-sm">
                  <div className="flex items-center justify-between text-xs text-[#9c9488] mb-2 uppercase font-mono">
                    <span>{g.category}</span>
                    <span>{g.aspectRatio}</span>
                  </div>
                  <h4 className="font-serif text-xl uppercase text-[#f4ede4] mb-1">{g.title}</h4>
                  <p className="text-xs text-[#9c9488] line-clamp-2">{g.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CAFE SETTINGS */}
        {activeTab === "settings" && settings && (
          <form onSubmit={handleSaveSettings} className="bg-[#131417] border border-[#f4ede4]/10 rounded-sm p-6 sm:p-10 space-y-6 max-w-4xl">
            <div className="flex items-center justify-between border-b border-[#f4ede4]/10 pb-4">
              <div>
                <h3 className="font-serif text-2xl uppercase text-[#f4ede4]">Cafe Operational Parameters</h3>
                <p className="text-xs text-[#9c9488]">Changes saved here reflect across the public website immediately.</p>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#c46845] hover:bg-[#b05837] text-[#f4ede4] text-xs font-sans tracking-widest uppercase rounded-xs transition-colors cursor-pointer font-medium flex items-center gap-1.5"
              >
                <Save size={14} />
                <span>Save All Settings</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="text-[#9c9488] uppercase tracking-wider block mb-1">Cafe Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 p-2.5 rounded-xs text-[#f4ede4]"
                />
              </div>

              <div>
                <label className="text-[#9c9488] uppercase tracking-wider block mb-1">Owner Line</label>
                <input
                  type="text"
                  value={settings.owner}
                  onChange={(e) => setSettings({ ...settings, owner: e.target.value })}
                  className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 p-2.5 rounded-xs text-[#f4ede4]"
                />
              </div>

              <div>
                <label className="text-[#9c9488] uppercase tracking-wider block mb-1">Opening Hours</label>
                <input
                  type="text"
                  value={settings.openingHours}
                  onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                  className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 p-2.5 rounded-xs text-[#f4ede4]"
                />
              </div>

              <div>
                <label className="text-[#9c9488] uppercase tracking-wider block mb-1">Location / City</label>
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 p-2.5 rounded-xs text-[#f4ede4]"
                />
              </div>

              <div>
                <label className="text-[#9c9488] uppercase tracking-wider block mb-1">Address Detail</label>
                <input
                  type="text"
                  value={settings.address || ""}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 p-2.5 rounded-xs text-[#f4ede4]"
                />
              </div>

              <div>
                <label className="text-[#9c9488] uppercase tracking-wider block mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settings.email || ""}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full bg-[#0a0b0d] border border-[#f4ede4]/15 p-2.5 rounded-xs text-[#f4ede4]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#f4ede4]/10 flex items-center gap-8">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.isReservationsEnabled}
                  onChange={(e) => setSettings({ ...settings, isReservationsEnabled: e.target.checked })}
                />
                <span className="text-[#f4ede4] font-medium">Public Reservations Enabled</span>
              </label>

              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.isHolidayClosed}
                  onChange={(e) => setSettings({ ...settings, isHolidayClosed: e.target.checked })}
                />
                <span className="text-[#f4ede4] font-medium">Holiday Closed Status</span>
              </label>
            </div>
          </form>
        )}

        {/* TAB 7: AUDIT LOGS */}
        {activeTab === "audit" && (
          <div className="bg-[#131417] border border-[#f4ede4]/10 rounded-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#f4ede4]/10">
              <h3 className="font-serif text-2xl uppercase">Security & Content Audit Trail</h3>
              <span className="text-xs font-mono text-[#9c9488]">{auditLogs.length} events logged</span>
            </div>

            <div className="divide-y divide-[#f4ede4]/5 text-xs font-mono">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#c46845]/15 text-[#c46845] text-[10px]">
                      {log.action}
                    </span>
                    <span className="text-[#f4ede4]">{log.details}</span>
                  </div>
                  <div className="text-[10px] text-[#9c9488] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })} · {log.performedBy} ({log.role})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
