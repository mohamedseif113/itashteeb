"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FiSearch } from "react-icons/fi";
import { Link, useRouter } from "@/i18n/navigation";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  getCategories,
  getCitiesByCountry,
  getCountries,
  getSubcategories,
  type CityOption,
  type CountryOption,
  type FilterOption,
} from "@/services/filters";
import { popularSearches } from "@/lib/data";
import { cn } from "@/lib/utils";

type SearchType = "all" | "services" | "professionals" | "idea-book" | "projects";

function budgetBounds(value: string): { min?: string; max?: string } {
  if (!value || value === "custom") return {};
  const [min, max] = value.split("-").map((p) => p.replace("k", "000"));
  return { min, max };
}

export function HeroSearchForm() {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [type, setType] = useState<SearchType>("all");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [contentType, setContentType] = useState("");
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [budget, setBudget] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [finishingDate, setFinishingDate] = useState("");
  const [refineOpen, setRefineOpen] = useState(false);

  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [subcategories, setSubcategories] = useState<FilterOption[]>([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const showCategories =
    type === "all" || type === "services" || type === "professionals";
  const showBudget = type === "all" || type === "services";
  const showContentType = type === "idea-book" || type === "projects";

  const typeOptions = useMemo(
    () => [
      { value: "all", label: isAr ? "كل الأنواع" : "All Types" },
      { value: "services", label: isAr ? "الخدمات" : "Services" },
      { value: "professionals", label: isAr ? "المهنيين" : "Professionals" },
      { value: "idea-book", label: isAr ? "كتاب الأفكار" : "Idea Book" },
      { value: "projects", label: isAr ? "المشاريع" : "Projects" },
    ],
    [isAr],
  );

  const contentTypeOptions = useMemo(() => {
    const base = [
      { value: "", label: isAr ? "كل الأنواع" : "All Types" },
      { value: "residential", label: isAr ? "سكني" : "Residential" },
      { value: "commercial", label: isAr ? "تجاري" : "Commercial" },
      { value: "interior", label: isAr ? "داخلي" : "Interior" },
      { value: "landscape", label: isAr ? "مناظر طبيعية" : "Landscape" },
    ];
    if (type === "idea-book") {
      return [
        ...base,
        { value: "industrial", label: isAr ? "صناعي" : "Industrial" },
        { value: "hospitality", label: isAr ? "ضيافة" : "Hospitality" },
      ];
    }
    return base;
  }, [isAr, type]);

  const budgetOptions = useMemo(
    () => [
      { value: "", label: isAr ? "كل الميزانيات" : "Any Budget" },
      { value: "custom", label: isAr ? "مخصص" : "Custom Range" },
      {
        value: "10k-25k",
        label: isAr ? "10,000 - 25,000 جنيه" : "10,000 - 25,000 EGP",
      },
      {
        value: "25k-50k",
        label: isAr ? "25,000 - 50,000 جنيه" : "25,000 - 50,000 EGP",
      },
      {
        value: "50k-100k",
        label: isAr ? "50,000 - 100,000 جنيه" : "50,000 - 100,000 EGP",
      },
      {
        value: "100k-250k",
        label: isAr ? "100,000 - 250,000 جنيه" : "100,000 - 250,000 EGP",
      },
      {
        value: "250k-500k",
        label: isAr ? "250,000 - 500,000 جنيه" : "250,000 - 500,000 EGP",
      },
    ],
    [isAr],
  );

  const categoryOptions = useMemo(
    () => [
      { value: "", label: t("hero.allCategories") },
      ...categories.map((c) => ({ value: c.slug, label: c.name })),
    ],
    [categories, t],
  );

  const subcategoryOptions = useMemo(
    () => [
      { value: "", label: t("hero.allSubCategories") },
      ...subcategories.map((s) => ({ value: s.slug, label: s.name })),
    ],
    [subcategories, t],
  );

  const countryOptions = useMemo(
    () => [
      { value: "", label: isAr ? "جميع الدول" : "All Countries" },
      ...countries.map((c) => ({ value: String(c.id), label: c.name })),
    ],
    [countries, isAr],
  );

  const cityOptions = useMemo(
    () => [
      { value: "", label: isAr ? "جميع المدن" : "All Cities" },
      ...cities.map((c) => ({ value: String(c.id), label: c.name })),
    ],
    [cities, isAr],
  );

  const selectedFiltersCount = [
    type !== "all",
    !!category,
    !!subcategory,
    !!contentType,
    !!countryId,
    !!cityId,
    !!budget,
    !!finishingDate,
  ].filter(Boolean).length;

  useEffect(() => {
    let cancelled = false;
    setLoadingCats(true);
    Promise.all([getCategories(locale), getCountries(locale)]).then(
      ([cats, countriesData]) => {
        if (cancelled) return;
        setCategories(cats);
        setCountries(countriesData);
        setLoadingCats(false);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [locale]);

  useEffect(() => {
    const selected = categories.find((c) => c.slug === category);
    if (!selected) {
      setSubcategories([]);
      return;
    }
    let cancelled = false;
    getSubcategories(selected.id, locale).then((subs) => {
      if (!cancelled) setSubcategories(subs);
    });
    return () => {
      cancelled = true;
    };
  }, [category, categories, locale]);

  useEffect(() => {
    if (!countryId) {
      setCities([]);
      return;
    }
    let cancelled = false;
    getCitiesByCountry(countryId, locale).then((list) => {
      if (!cancelled) setCities(list);
    });
    return () => {
      cancelled = true;
    };
  }, [countryId, locale]);

  const onTypeChange = (value: string) => {
    setType(value as SearchType);
    setCategory("");
    setSubcategory("");
    setContentType("");
    if (value !== "all" && value !== "services") {
      setBudget("");
      setMinPrice("");
      setMaxPrice("");
      setFinishingDate("");
    }
  };

  const submit = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());

    if (type === "all") {
      if (countryId) params.set("country_id", countryId);
      if (cityId) params.set("city_id", cityId);
      const cat = categories.find((c) => c.slug === category);
      if (cat) params.set("category_id", String(cat.id));
      const sub = subcategories.find((s) => s.slug === subcategory);
      if (sub) params.set("subcategory_id", String(sub.id));
      if (budget === "custom") {
        if (minPrice) params.set("min_price", minPrice.replace(/\D/g, ""));
        if (maxPrice) params.set("max_price", maxPrice.replace(/\D/g, ""));
      } else if (budget) {
        const { min, max } = budgetBounds(budget);
        if (min) params.set("min_price", min);
        if (max) params.set("max_price", max);
      }
      if (finishingDate) {
        const now = new Date();
        const from = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        params.set("from", from);
        params.set("to", finishingDate);
      }
      const qs = params.toString();
      router.push(qs ? `/search?${qs}` : "/search");
      return;
    }

    if (type === "services") {
      params.set("view", "search");
      if (countryId) params.set("country_id", countryId);
      if (cityId) params.set("city_ids", cityId);
      const cat = categories.find((c) => c.slug === category);
      if (cat) params.set("category_ids", String(cat.id));
      const sub = subcategories.find((s) => s.slug === subcategory);
      if (sub) params.set("subcategory_ids", String(sub.id));
      if (budget === "custom") {
        if (minPrice) params.set("min_price", minPrice.replace(/\D/g, ""));
        if (maxPrice) params.set("max_price", maxPrice.replace(/\D/g, ""));
      } else if (budget) {
        const { min, max } = budgetBounds(budget);
        if (min) params.set("min_price", min);
        if (max) params.set("max_price", max);
      }
      const qs = params.toString();
      router.push(qs ? `/services?${qs}` : "/services");
      return;
    }

    if (type === "professionals") {
      params.set("view", "search");
      if (countryId) params.set("country_id", countryId);
      if (cityId) params.set("city_id", cityId);
      const cat = categories.find((c) => c.slug === category);
      if (cat) params.set("category_ids", String(cat.id));
      const qs = params.toString();
      router.push(qs ? `/professionals?${qs}` : "/professionals");
      return;
    }

    if (type === "idea-book") {
      if (contentType) params.set("type", contentType);
      if (countryId) params.set("country_id", countryId);
      if (cityId) params.set("city_id", cityId);
      const qs = params.toString();
      router.push(qs ? `/idea-book?${qs}` : "/idea-book");
      return;
    }

    if (contentType) params.set("type", contentType);
    if (countryId) params.set("country_id", countryId);
    if (cityId) params.set("city_id", cityId);
    const qs = params.toString();
    router.push(qs ? `/projects?${qs}` : "/projects");
  };

  const popular = isAr ? popularSearches.ar : popularSearches.en;

  const filtersBlock = (
    <>
      <div className="grid gap-3 md:grid-cols-9">
        <div className="group rounded-xl bg-gradient-to-br from-gray-50 to-white p-0.5 shadow-inner md:col-span-2">
          <div className="rounded-[11px] bg-white">
            <CustomSelect
              options={typeOptions}
              value={type}
              onChange={onTypeChange}
              placeholder={t("heroExtras.searchType")}
              searchPlaceholder={
                isAr ? "ابحث في النوع" : "Search type"
              }
              dropdownZIndex={10030}
            />
          </div>
        </div>

        {showCategories ? (
          <div className="group rounded-xl bg-gradient-to-br from-gray-50 to-white p-0.5 shadow-inner transition-all duration-300 md:col-span-4">
            <div className="rounded-[11px] bg-white">
              {category ? (
                <div className="flex h-12 items-stretch divide-x divide-gray-200 rtl:divide-x-reverse">
                  <button
                    type="button"
                    onClick={() => {
                      setCategory("");
                      setSubcategory("");
                    }}
                    className="flex flex-1 items-center gap-1.5 px-3 text-xs transition-colors hover:bg-gray-50"
                  >
                    <span className="truncate font-medium text-gray-600">
                      {categoryOptions.find((o) => o.value === category)?.label}
                    </span>
                    <span className="text-gray-400">×</span>
                  </button>
                  <div className="min-w-0 flex-1">
                    <CustomSelect
                      options={subcategoryOptions}
                      value={subcategory}
                      onChange={setSubcategory}
                      placeholder={t("hero.allSubCategories")}
                      searchPlaceholder={t("hero.searchDropdown")}
                      dropdownZIndex={10030}
                    />
                  </div>
                </div>
              ) : (
                <CustomSelect
                  options={categoryOptions}
                  value={category}
                  onChange={(v) => {
                    setCategory(v);
                    setSubcategory("");
                  }}
                  placeholder={
                    loadingCats
                      ? t("heroExtras.loading")
                      : t("hero.allCategories")
                  }
                  searchPlaceholder={t("hero.searchDropdown")}
                  dropdownZIndex={10030}
                />
              )}
            </div>
          </div>
        ) : null}

        {showContentType ? (
          <div className="group rounded-xl bg-gradient-to-br from-gray-50 to-white p-0.5 shadow-inner md:col-span-4">
            <div className="rounded-[11px] bg-white">
              <CustomSelect
                options={contentTypeOptions}
                value={contentType}
                onChange={setContentType}
                placeholder={t("heroExtras.contentType")}
                searchPlaceholder={
                  isAr ? "ابحث في النوع" : "Search type"
                }
                dropdownZIndex={10030}
              />
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "group rounded-xl bg-gradient-to-br from-gray-50 to-white p-0.5 shadow-inner",
            showCategories || showContentType
              ? "md:col-span-3"
              : "md:col-span-7",
          )}
        >
          <div className="rounded-[11px] bg-white">
            {countryId ? (
              <div className="flex h-12 items-stretch divide-x divide-gray-200 rtl:divide-x-reverse">
                <button
                  type="button"
                  onClick={() => {
                    setCountryId("");
                    setCityId("");
                  }}
                  className="flex flex-1 items-center gap-1.5 px-3 text-xs transition-colors hover:bg-gray-50"
                >
                  <span className="truncate font-medium text-gray-600">
                    {countryOptions.find((o) => o.value === countryId)?.label}
                  </span>
                  <span className="text-gray-400">×</span>
                </button>
                <div className="min-w-0 flex-1">
                  <CustomSelect
                    options={cityOptions}
                    value={cityId}
                    onChange={setCityId}
                    placeholder={isAr ? "جميع المدن" : "All Cities"}
                    searchPlaceholder={t("hero.searchDropdown")}
                    dropdownZIndex={10030}
                  />
                </div>
              </div>
            ) : (
              <CustomSelect
                options={countryOptions}
                value={countryId}
                onChange={(v) => {
                  setCountryId(v);
                  setCityId("");
                }}
                placeholder={isAr ? "جميع الدول" : "All Countries"}
                searchPlaceholder={t("hero.searchDropdown")}
                dropdownZIndex={10030}
              />
            )}
          </div>
        </div>
      </div>

      {showBudget ? (
        <div className="grid gap-3 md:grid-cols-2">
          <div className="group rounded-xl bg-gradient-to-br from-gray-50 to-white p-0.5 shadow-inner">
            <div className="rounded-[11px] bg-white">
              <CustomSelect
                options={budgetOptions}
                value={budget}
                onChange={(v) => {
                  setBudget(v);
                  if (v !== "custom") {
                    setMinPrice("");
                    setMaxPrice("");
                  }
                }}
                placeholder={t("heroExtras.anyBudget")}
                searchPlaceholder={isAr ? "ابحث في الميزانية" : "Search budget"}
                dropdownZIndex={10030}
              />
            </div>
            {budget === "custom" ? (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder={t("heroExtras.minPrice")}
                  className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-primary-1 focus:ring-2 focus:ring-primary-1/20"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder={t("heroExtras.maxPrice")}
                  className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-primary-1 focus:ring-2 focus:ring-primary-1/20"
                />
              </div>
            ) : null}
          </div>

          <div className="group rounded-xl bg-gradient-to-br from-gray-50 to-white p-0.5 shadow-inner">
            <div className="rounded-[11px] bg-white">
              <input
                type="date"
                value={finishingDate}
                onChange={(e) => setFinishingDate(e.target.value)}
                aria-label={isAr ? "تاريخ الإنجاز" : "Finishing Date"}
                className="relative flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-xl bg-white px-4 text-sm font-medium text-gray-800 shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary-1/10"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );

  return (
    <form
      data-hero-form
      className="relative z-[7] overflow-visible rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-2xl ring-1 ring-primary-1/10 md:p-8"
      style={{ opacity: 0, transform: "translateY(30px)" }}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className="space-y-4 overflow-visible">
        <div className="group relative rounded-xl bg-gradient-to-br from-gray-50 to-white p-0.5 shadow-inner">
          <div className="relative rounded-[11px] bg-white">
            <FiSearch className="pointer-events-none absolute start-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-primary-1 opacity-70" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("hero.placeholder")}
              className="relative h-14 w-full rounded-xl bg-white px-5 ps-12 text-base font-medium text-gray-800 shadow-sm transition-all placeholder:text-gray-400 hover:shadow-md focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-1/10"
            />
          </div>
        </div>

        {/* Mobile refine */}
        <div className="space-y-3 md:hidden">
          <button
            type="button"
            onClick={() => setRefineOpen((v) => !v)}
            className="flex min-h-[3.5rem] w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-start shadow-sm transition-all hover:border-primary-1/40 hover:shadow-md"
          >
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-slate-900">
                {t("heroExtras.refineSearch")}
                {selectedFiltersCount > 0
                  ? ` · ${selectedFiltersCount}`
                  : ""}
              </span>
              <span className="block text-xs text-slate-500">
                {t("heroExtras.refineHint")}
              </span>
            </span>
            <span className="text-primary-1">{refineOpen ? "▴" : "▾"}</span>
          </button>

          {refineOpen ? <div className="space-y-3">{filtersBlock}</div> : null}

          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-orange-600 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:bg-orange-700 hover:shadow-xl"
          >
            <FiSearch className="me-2 h-5 w-5" />
            {t("hero.search")}
          </button>
        </div>

        {/* Desktop filters */}
        <div className="hidden space-y-4 md:block">{filtersBlock}</div>

        <button
          type="submit"
          className="hidden h-12 w-full items-center justify-center rounded-lg bg-orange-600 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:bg-orange-700 hover:shadow-xl md:inline-flex"
        >
          <FiSearch className="me-2 h-5 w-5" />
          {t("hero.search")}
        </button>

        <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
          <span className="text-xs font-semibold text-gray-400">
            {t("hero.popular")}:
          </span>
          {popular.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-primary-1/40 hover:bg-primary-1/5 hover:text-primary-1"
            >
              {term}
            </button>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-2 text-center">
          <span className="text-xs text-gray-500">
            {t("heroExtras.areYouPro")}{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-primary-1 hover:underline"
            >
              {tNav("joinToday")}
            </Link>
          </span>
        </div>
      </div>
    </form>
  );
}
