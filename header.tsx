import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/components/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: cartItems = [] } = useQuery({
    queryKey: ["/api/cart"],
    enabled: !!user,
  });

  const { data: wishlistItems = [] } = useQuery({
    queryKey: ["/api/wishlist"],
    enabled: !!user,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="bg-primary text-white p-2 rounded-lg mr-3">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">FriendlyCart</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                variant="ghost"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="ghost">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
            
            <Link href="/wishlist">
              <Button variant="ghost" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white text-xs">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Link href="/cart">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{user.name}</span>
                      </div>
                      <Button variant="ghost" onClick={handleLogout} className="justify-start">
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/login">
                      <Button variant="ghost" className="justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                  
                  <Link href="/wishlist">
                    <Button variant="ghost" className="justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist ({wishlistItems.length})
                    </Button>
                  </Link>
                  
                  <Link href="/cart">
                    <Button variant="ghost" className="justify-start">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Cart ({cartItems.length})
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            variant="ghost"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </header>
  );
}
