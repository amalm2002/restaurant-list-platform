import { useState, useMemo } from 'react';
import { useRestaurants } from '@/hooks/useRestaurants';
import { Restaurant, RestaurantFormData } from '@/types/restaurant';
import { RestaurantCard } from '@/components/RestaurantCard';
import { RestaurantForm } from '@/components/RestaurantForm';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, UtensilsCrossed } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { restaurants, isLoading, addRestaurant, updateRestaurant, deleteRestaurant } =
    useRestaurants();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const filteredRestaurants = useMemo(() => {
    if (!searchQuery.trim()) return restaurants;
    const query = searchQuery.toLowerCase();
    return restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        r.cuisine.toLowerCase().includes(query) ||
        r.address.toLowerCase().includes(query)
    );
  }, [restaurants, searchQuery]);

  const handleAdd = () => {
    setSelectedRestaurant(null);
    setFormOpen(true);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setFormOpen(true);
  };

  const handleDelete = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setDeleteOpen(true);
  };

  const handleFormSubmit = (data: RestaurantFormData) => {
    if (selectedRestaurant) {
      updateRestaurant(selectedRestaurant.id, data);
      toast({
        title: 'Restaurant Updated',
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      addRestaurant(data);
      toast({
        title: 'Restaurant Added',
        description: `${data.name} has been added to the list.`,
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedRestaurant) {
      deleteRestaurant(selectedRestaurant.id);
      toast({
        title: 'Restaurant Deleted',
        description: `${selectedRestaurant.name} has been removed.`,
        variant: 'destructive',
      });
      setDeleteOpen(false);
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <UtensilsCrossed className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Restaurant Hub
                </h1>
                <p className="text-sm text-muted-foreground">
                  {restaurants.length} restaurants listed
                </p>
              </div>
            </div>
            <Button onClick={handleAdd} className="gap-2 shadow-soft">
              <Plus className="h-4 w-4" />
              Add Restaurant
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        {/* <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, cuisine, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div> */}

        {/* Restaurant Grid */}
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <UtensilsCrossed className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              {searchQuery ? 'No restaurants found' : 'No restaurants yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Add your first restaurant to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={handleAdd} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Restaurant
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Forms & Dialogs */}
      <RestaurantForm
        open={formOpen}
        onOpenChange={setFormOpen}
        restaurant={selectedRestaurant}
        onSubmit={handleFormSubmit}
      />
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        restaurant={selectedRestaurant}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Index;
