const API_BASE = "https://api.itashteeb.com/api";

export type FilterOption = {
  id: number;
  slug: string;
  name: string;
};

export type CountryOption = {
  id: number;
  name: string;
  code?: string;
};

export type CityOption = {
  id: number;
  name: string;
  country_id?: number;
};

async function apiGet<T>(
  path: string,
  locale: string,
): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        lang: locale,
        "Accept-Language": locale,
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json?.status) return null;
    return json.data as T;
  } catch {
    return null;
  }
}

function normalizeId(raw: string | number): number {
  if (typeof raw === "number") return raw;
  const n = parseInt(String(raw).replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

export async function getCategories(
  locale: string,
): Promise<FilterOption[]> {
  const data = await apiGet<{
    categories: Array<{ id: number | string; name: string; slug: string }>;
    meta?: { last_page?: number };
  }>(`/web/categories?page=1`, locale);

  if (!data?.categories) return [];

  let all = [...data.categories];
  const last = data.meta?.last_page ?? 1;
  if (last > 1) {
    const pages = await Promise.all(
      Array.from({ length: last - 1 }, (_, i) =>
        apiGet<{
          categories: Array<{ id: number | string; name: string; slug: string }>;
        }>(`/web/categories?page=${i + 2}`, locale),
      ),
    );
    for (const page of pages) {
      if (page?.categories) all = all.concat(page.categories);
    }
  }

  return all
    .map((c) => ({
      id: normalizeId(c.id),
      name: c.name,
      slug: c.slug,
    }))
    .filter((c) => c.id > 0);
}

export async function getSubcategories(
  categoryId: number,
  locale: string,
): Promise<FilterOption[]> {
  const data = await apiGet<{
    subcategories: Array<{ id: number | string; name: string; slug: string }>;
  }>(`/web/categories/${categoryId}/subcategories?page=1`, locale);

  return (data?.subcategories ?? [])
    .map((s) => ({
      id: normalizeId(s.id),
      name: s.name,
      slug: s.slug,
    }))
    .filter((s) => s.id > 0);
}

export async function getCountries(
  locale: string,
): Promise<CountryOption[]> {
  const data = await apiGet<
    CountryOption[] | { countries: CountryOption[] }
  >(`/web/countries`, locale);

  if (!data) return [];
  return Array.isArray(data) ? data : (data.countries ?? []);
}

export async function getCitiesByCountry(
  countryId: string | number,
  locale: string,
): Promise<CityOption[]> {
  if (!countryId) return [];
  const data = await apiGet<CityOption[] | { cities: CityOption[] }>(
    `/web/cities/by-country/${countryId}`,
    locale,
  );
  if (!data) return [];
  return Array.isArray(data) ? data : (data.cities ?? []);
}
