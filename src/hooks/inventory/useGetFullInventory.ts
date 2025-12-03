'use client';
import useAuthStore from '@/zustand/useAuthStore';
import { useState, useEffect, useMemo } from 'react';
import { AuthUser } from '@/zustand/useAuthStore';

interface Product {
  _id: string;
  name: string;
  type: string;
  category: string;
  inStock: boolean;
  costPrice: number;
  salePrice: number;
  createdAt: string;
  specialty: AuthUser['specialty'];
  updatedAt: string;
}

interface InventoryItem {
  _id: string;
  product: Product;
  productType: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  createdAt: string;
  updatedAt: string;
}

export function useGetFullInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();

  async function fetchInventory() {
    try {
      setLoading(true);
      const res = await fetch('/api/inventory', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error('Error fetching inventory data');
      }

      const data: InventoryItem[] = await res.json();

      const filtered =
        user?.role === 'employee' || !user?.specialty
          ? data
          : data.filter(
              (item) => item?.product?.specialty && item?.product?.specialty === user?.specialty
            );

      setInventory(filtered);
    } catch (err: any) {
      console.error('Inventory fetch error:', err);
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    fetchInventory();
  }, [user]);

  const criticalItems = useMemo(
    () => inventory.filter((i) => i.quantity < i.minStock),
    [inventory]
  );

  const lowItems = useMemo(() => inventory.filter((i) => i.quantity === i.minStock), [inventory]);

  const totalAlerts = useMemo(
    () => criticalItems.length + lowItems.length,
    [criticalItems, lowItems]
  );

  return {
    inventory,
    loading,
    error,
    setInventory,

    criticalItems,
    lowItems,
    totalAlerts,

    // Manual refetch
    refetch: fetchInventory,
  };
}
