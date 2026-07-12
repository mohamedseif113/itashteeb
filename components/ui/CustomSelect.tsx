"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder?: string;
  className?: string;
  dropdownZIndex?: number;
  disabled?: boolean;
};

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  searchPlaceholder = "Search...",
  className,
  dropdownZIndex = 50,
  disabled = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          if (disabled) return;
          setOpen((v) => !v);
        }}
        className="relative flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-xl bg-white px-4 text-sm font-medium text-gray-800 shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary-1/10 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="truncate text-start">
          {selected?.label || placeholder}
        </span>
        <HiChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-primary-1 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          className="absolute inset-x-0 top-[calc(100%+6px)] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl ring-1 ring-gray-100"
          style={{ zIndex: dropdownZIndex }}
        >
          <div className="border-b border-gray-100 p-2">
            <div className="relative">
              <HiSearch className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pe-3 ps-9 text-sm text-gray-800 outline-none focus:border-primary-1 focus:ring-2 focus:ring-primary-1/20"
              />
            </div>
          </div>
          <ul
            id={listId}
            role="listbox"
            className="max-h-56 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400">—</li>
            ) : (
              filtered.map((opt) => {
                const active = opt.value === value;
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={cn(
                        "flex w-full px-4 py-2.5 text-start text-sm transition-colors",
                        active
                          ? "bg-primary-1/10 font-semibold text-primary-1"
                          : "text-gray-700 hover:bg-primary-1/5 hover:text-primary-1",
                      )}
                    >
                      {opt.label}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
