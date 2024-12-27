import { InventoryData, ColorSizeInventory } from '../types/inventory';

export function checkColorAvailability(inventory: ColorSizeInventory, color: string): boolean {
  if (!inventory || !inventory[color]) return false;
  
  return Object.values(inventory[color]).some(quantity => quantity > 0);
}

export function getAvailableSizes(inventory: ColorSizeInventory, color: string): string[] {
  if (!inventory || !inventory[color]) return [];
  
  return Object.entries(inventory[color])
    .filter(([_, quantity]) => quantity > 0)
    .map(([size]) => size);
}

export function getStockQuantity(
  inventory: ColorSizeInventory,
  color: string,
  size: string
): number {
  try {
    return inventory?.[color]?.[size] ?? 0;
  } catch {
    return 0;
  }
}

export function getTotalStockForColor(inventory: ColorSizeInventory, color: string): number {
  if (!inventory?.[color]) return 0;
  
  return Object.values(inventory[color]).reduce((sum, qty) => sum + qty, 0);
}

export function getStockStatus(quantity: number): {
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  message: string;
} {
  if (quantity === 0) {
    return { status: 'out-of-stock', message: 'Out of Stock' };
  }
  if (quantity <= 5) {
    return { status: 'low-stock', message: `Only ${quantity} left` };
  }
  return { status: 'in-stock', message: 'In Stock' };
}