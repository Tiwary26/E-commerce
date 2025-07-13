import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ProductWithCategory } from "@shared/schema";

interface ProductCardProps {
  product: ProductWithCategory;
  size?: "small" | "medium" | "large";
}

export default function ProductCard({ product, size = "medium" }: ProductCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please log in to add items to cart");
      return apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity: 1,
      });
    },
    onSuccess: () => {
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const toggleWishlistMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please log in to manage your wishlist");
      
      if (isInWishlist) {
        return apiRequest("DELETE", `/api/wishlist/${product.id}`);
      } else {
        return apiRequest("POST", "/api/wishlist", {
          productId: product.id,
        });
      }
    },
    onSuccess: () => {
      setIsInWishlist(!isInWishlist);
      toast({
        title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
        description: `${product.name} has been ${isInWishlist ? "removed from" : "added to"} your wishlist.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const cardClasses = {
    small: "rounded-lg shadow-md",
    medium: "rounded-xl shadow-md",
    large: "rounded-xl shadow-lg",
  };

  const imageClasses = {
    small: "h-32 lg:h-40",
    medium: "h-48",
    large: "h-64",
  };

  return (
    <div className={`bg-white ${cardClasses[size]} hover:shadow-lg transition-shadow duration-300 overflow-hidden group`}>
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full ${imageClasses[size]} object-cover group-hover:scale-105 transition-transform duration-300`}
        />
        {product.isOnSale && (
          <Badge className="absolute top-3 left-3 bg-error text-white">
            {product.salePercentage}% OFF
          </Badge>
        )}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          onClick={() => toggleWishlistMutation.mutate()}
          disabled={toggleWishlistMutation.isPending}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? "fill-error text-error" : "text-gray-400"}`} />
        </Button>
      </div>
      
      <div className={size === "small" ? "p-3" : "p-4"}>
        <h3 className={`font-semibold text-gray-900 mb-2 ${size === "small" ? "text-sm truncate" : ""}`}>
          {product.name}
        </h3>
        
        {size !== "small" && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`font-bold text-gray-900 ${size === "small" ? "text-sm" : "text-lg"}`}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              {product.rating}
            </span>
          </div>
        </div>
        
        {size !== "small" && (
          <Button
            className="w-full"
            onClick={() => addToCartMutation.mutate()}
            disabled={addToCartMutation.isPending}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}
