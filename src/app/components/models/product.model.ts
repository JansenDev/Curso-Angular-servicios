export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

// Extiende product y omite id y category
export interface ProductDTO extends Omit<Product, 'id' | 'category'> {
  category: string;
}

export interface UpdateProductDTO extends Partial<Product> {}
