import { Button } from './ui/button';
import {
  AlertTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PackageOpenIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Input } from './ui/input';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './ui/empty';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

export const EntityHeader = (props: EntityHeaderProps) => {
  const {
    title,
    description,
    newButtonLabel,
    disabled,
    isCreating,
    onNew,
    newButtonHref,
  } = props;
  return (
    <div className="flex gap-x-4 items-center justify-between">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {onNew && !newButtonHref && (
        <Button disabled={disabled || isCreating} onClick={onNew} size="sm">
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
      )}

      {newButtonHref && !onNew && (
        <Button asChild size="sm">
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="size-4" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  search: React.ReactNode;
  pagination: React.ReactNode;
};

export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-6 md:py-6 h-full">
      <div className="w-full flex flex-col gap-y-8 h-full">
        {header}
        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};

interface EntitySearchProps {
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}

export const EntitySearch = (props: EntitySearchProps) => {
  const { onChange, placeholder, value } = props;

  return (
    <div className="relative ml-auto">
      <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="max-w-[200px] bg-background shadow-none pl-8 border-border"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

export const EntityPagination = (props: EntityPaginationProps) => {
  const { page, totalPages, disabled, onPageChange } = props;

  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          <ChevronLeftIcon className="size-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled || page === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};

interface StateViewProps {
  message?: string;
}

interface LoadingViewProps extends StateViewProps {
  entity?: string;
}

export const LoadingView = (props: LoadingViewProps) => {
  const { message } = props;

  return (
    <div className="flex flex-col items-center justify-center h-full flex-1 gap-y-4">
      <Loader2Icon className="size-6 animate-spin text-muted-foreground" />

      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export const ErrorView = (props: StateViewProps) => {
  const { message } = props;

  return (
    <div className="flex flex-col items-center justify-center h-full flex-1 gap-y-4">
      <AlertTriangleIcon className="size-6 text-destructive" />

      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
}

export const EmptyView = (props: EmptyViewProps) => {
  const { message, onNew } = props;

  return (
    <Empty className="border border-dashed bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon className="size-6 text-muted-foreground" />
        </EmptyMedia>
      </EmptyHeader>

      <EmptyTitle>No items found</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}

      {onNew && (
        <Button size="sm" onClick={onNew}>
          <PlusIcon className="size-4" />
          Add new
        </Button>
      )}
    </Empty>
  );
};

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
}

export const EntityList = <T,>(props: EntityListProps<T>) => {
  const { items, renderItem, getKey, emptyView, className } = props;

  if (items.length === 0 && emptyView) return emptyView;

  return (
    <div className={cn('flex flex-col gap-y-4', className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

interface EntityItemProps {
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void;
  isRemoving?: boolean;
  className?: string;
  href: string;
}

export const EntityItem = (props: EntityItemProps) => {
  const {
    title,
    subtitle,
    image,
    actions,
    onRemove,
    isRemoving,
    className,
    href,
  } = props;

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRemoving) return;
    onRemove?.();
  };

  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          'p-4 shadow-none hover:shadow cursor-pointer border-border',
          isRemoving && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <CardContent className="flex items-center justify-between p-0">
          <div className="flex items-center gap-3">
            {image}

            <div>
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              {!!subtitle && (
                <CardDescription className="text-xs text-muted-foreground">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>

          {actions ||
            (onRemove && (
              <div className="flex items-center gap-x-4">
                {actions}

                {!!onRemove && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVerticalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="border-border"
                      side="bottom"
                      align="end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenuItem onClick={handleRemove}>
                        <TrashIcon className="size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
        </CardContent>
      </Card>
    </Link>
  );
};
