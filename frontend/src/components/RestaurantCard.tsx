import { Restaurant } from '@/types/restaurant';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Pencil, Trash2, Utensils } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (restaurant: Restaurant) => void;
}

export const RestaurantCard = ({ restaurant, onEdit, onDelete }: RestaurantCardProps) => {
  return (
    <Card className="group shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary to-primary/70" />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-semibold text-foreground truncate">
              {restaurant.name}
            </h3>
            <Badge variant="secondary" className="mt-2 bg-accent text-accent-foreground">
              <Utensils className="w-3 h-3 mr-1" />
              {restaurant.cuisine}
            </Badge>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-accent"
              onClick={() => onEdit(restaurant)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(restaurant)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-start gap-3 text-sm">
          <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <span className="text-muted-foreground">{restaurant.address}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="h-4 w-4 text-primary shrink-0" />
          <span className="text-muted-foreground">{restaurant.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Mail className="h-4 w-4 text-primary shrink-0" />
          <span className="text-muted-foreground truncate">{restaurant.email}</span>
        </div>
      </CardContent>
    </Card>
  );
};
