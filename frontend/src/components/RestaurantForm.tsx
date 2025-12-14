import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Restaurant, RestaurantFormData } from '@/types/restaurant';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const cuisineTypes = [
  'Italian',
  'Japanese',
  'Indian',
  'Mexican',
  'Chinese',
  'Thai',
  'French',
  'American',
  'Mediterranean',
  'Other',
];

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  address: z.string().min(5, 'Address must be at least 5 characters').max(200),
  phone: z.string().min(10, 'Phone must be at least 10 characters').max(20),
  email: z.string().email('Invalid email address').max(100),
  cuisine: z.string().min(1, 'Please select a cuisine type'),
});

interface RestaurantFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurant?: Restaurant | null;
  onSubmit: (data: RestaurantFormData) => void;
}

export const RestaurantForm = ({
  open,
  onOpenChange,
  restaurant,
  onSubmit,
}: RestaurantFormProps) => {
  const isEditing = !!restaurant;

  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      cuisine: '',
    },
  });

  useEffect(() => {
    if (restaurant) {
      form.reset({
        name: restaurant.name,
        address: restaurant.address,
        phone: restaurant.phone,
        email: restaurant.email,
        cuisine: restaurant.cuisine,
      });
    } else {
      form.reset({
        name: '',
        address: '',
        phone: '',
        email: '',
        cuisine: '',
      });
    }
  }, [restaurant, form]);

  const handleSubmit = (data: RestaurantFormData) => {
    onSubmit(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="The Golden Fork" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cuisine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cuisine type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cuisineTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street, Downtown" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="info@restaurant.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {isEditing ? 'Save Changes' : 'Add Restaurant'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
