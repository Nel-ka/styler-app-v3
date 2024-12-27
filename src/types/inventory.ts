export interface SizeInventory {
  [size: string]: number;
}

export interface ColorSizeInventory {
  [color: string]: SizeInventory;
}

export interface InventoryData {
  inventory: ColorSizeInventory;
  selectedColor: string | null;
  selectedSize: string | null;
}