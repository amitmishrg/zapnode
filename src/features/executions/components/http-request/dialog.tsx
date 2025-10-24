'use client';

import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { Dialog } from '@/components/ui/dialog';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
  endpoint: z.url('Please enter a valid URL'),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  body: z.string().optional(),
});

export type FormType = z.infer<typeof formSchema>;

interface HttpRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormType) => void;
  defaultEndpoint?: string;
  defaultMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  defaultBody?: string;
}

export const HttpRequestDialog = (props: HttpRequestDialogProps) => {
  const {
    open,
    onOpenChange,
    onSubmit,
    defaultEndpoint,
    defaultMethod = 'GET',
    defaultBody,
  } = props;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endpoint: defaultEndpoint,
      method: defaultMethod,
      body: defaultBody,
    },
  });

  // Reset the form values when the dialog is opened
  useEffect(() => {
    form.reset({
      endpoint: defaultEndpoint,
      method: defaultMethod,
      body: defaultBody,
    });
  }, [open, defaultEndpoint, defaultMethod, defaultBody, form]);

  const watchMethod = form.watch('method');
  const showBodyField = ['POST', 'PUT', 'PATCH'].includes(watchMethod);

  const handleSubmit = (values: FormType) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border">
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Configure settings for the HTTP request.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The HTTP method to use for the request.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://example.com" />
                  </FormControl>
                  <FormDescription>
                    Static URL or use {'{{variables}}'} for simple values or{' '}
                    {'{{json variable}}'} to stringify objects.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showBodyField && (
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={
                          '{\n  "userId": "{{httpResponse.data.id}}"\n  "name": "{{httpResponse.data.name}}"\n}'
                        }
                        className="min-h-[120px] font-mono text-sm"
                      />
                    </FormControl>
                    <FormDescription>
                      JSON with template variables. Use {'{{variables}}'} for
                      simple values or {'{{json variable}}'} to stringify
                      objects.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter className="mt-4">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
