import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Laptop, Shirt, Home, Star, Dumbbell, Book } from "lucide-react";
import type { Category } from "@shared/schema";

const categoryIcons = {
  electronics: Laptop,
  fashion: Shirt,
  home: Home,
  beauty: Star,
  sports: Dumbbell,
  books: Book,
};

export default function CategoryNav() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto scrollbar-hide py-4">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.slug as keyof typeof categoryIcons] || Star;
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="flex flex-col items-center min-w-0 flex-shrink-0 text-gray-700 hover:text-primary transition-colors duration-200"
              >
                <IconComponent className="h-6 w-6 mb-1" />
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
