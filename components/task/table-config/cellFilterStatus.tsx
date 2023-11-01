import * as React from "react";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  CheckIcon,
  Circle,
  PlusCircle,
  Timer,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Status } from "@prisma/client";

interface CellFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  //   options: {
  //     label: string;
  //     value: string;
  //     icon?: React.ComponentType<{ className?: string }>;
  //   }[];
}

export function CellFilterStatus<TData, TValue>({
  column,
  title,
}: CellFilterProps<TData, TValue>) {
  const options = [
    {
      value: Status.Pending,
      label: "Pending",
      icon: Timer,
      className:
        "hover:bg-accent text-yellow-800 bg-yellow-300/50 hover:text-yellow-300 dark:text-yellow-200 dark:bg-transparent",
    },
    {
      value: Status.InProgress,
      label: "InProgress",
      icon: Circle,
      className: "hover:bg-accent hover:text-accent-foreground",
    },
    {
      value: Status.Complete,
      label: "Complete",
      icon: CheckCircle2,
      className:
        "hover:bg-accent hover:text-green-400 bg-green-300/50 dark:bg-transparent text-green-700 dark:text-green-300",
    },
    {
      value: Status.Cancelled,
      label: "Cancelled",
      icon: XCircle,
      className:
        "hover:bg-accent text-rose-600 hover:text-rose-400 dark:text-rose-400 bg-rose-300/50 dark:bg-transparent",
    },
  ];

  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed flex gap-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                    className="flex gap-4"
                  >
                    {/* <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-background"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-3 w-3")} />
                    </div> */}
                    {isSelected ? (
                      <CheckIcon className="mr-2 h-4 w-4" />
                    ) : (
                      <CheckIcon className="mr-2 h-4 w-4 text-transparent" />
                    )}
                    <div
                      className={cn(
                        "flex px-4 py-1 rounded-sm",
                        option.className
                      )}
                    >
                      {option.icon && (
                        <option.icon className={cn("mr-2 h-4 w-4")} />
                      )}
                      <span>{option.label}</span>
                      {facets?.get(option.value) && (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {facets.get(option.value)}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
