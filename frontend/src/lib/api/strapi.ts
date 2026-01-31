const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_URL = `${STRAPI_URL}/api`;

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: StrapiPagination;
  };
}

interface StrapiRequestOptions {
  locale?: string;
  populate?: string | string[];
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  fields?: string[];
}

function buildParams(options: StrapiRequestOptions): URLSearchParams {
  const params = new URLSearchParams();

  if (options.locale) {
    params.append('locale', options.locale);
  }

  if (options.populate) {
    if (typeof options.populate === 'string') {
      params.append('populate', options.populate);
    } else if (Array.isArray(options.populate)) {
      options.populate.forEach((p) => params.append('populate', p));
    }
  }

  if (options.filters) {
    const flattenFilters = (obj: Record<string, unknown>, prefix = 'filters') => {
      for (const [key, value] of Object.entries(obj)) {
        const newKey = `${prefix}[${key}]`;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          flattenFilters(value as Record<string, unknown>, newKey);
        } else {
          params.append(newKey, String(value));
        }
      }
    };
    flattenFilters(options.filters);
  }

  if (options.sort) {
    if (typeof options.sort === 'string') {
      params.append('sort', options.sort);
    } else {
      options.sort.forEach((s) => params.append('sort', s));
    }
  }

  if (options.pagination) {
    if (options.pagination.page) {
      params.append('pagination[page]', String(options.pagination.page));
    }
    if (options.pagination.pageSize) {
      params.append('pagination[pageSize]', String(options.pagination.pageSize));
    }
  }

  if (options.fields) {
    options.fields.forEach((f) => params.append('fields', f));
  }

  return params;
}

export async function strapiGet<T>(
  endpoint: string,
  options: StrapiRequestOptions = {}
): Promise<StrapiResponse<T>> {
  const params = buildParams(options);
  const url = `${STRAPI_API_URL}/${endpoint}?${params.toString()}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function strapiPost<T>(
  endpoint: string,
  data: unknown
): Promise<T> {
  const url = `${STRAPI_API_URL}/${endpoint}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(
      errorBody?.error?.message || `Strapi API error: ${res.status}`
    );
  }

  return res.json();
}

export function getStrapiMediaUrl(media: { url?: string } | null | undefined): string {
  if (!media?.url) return '/images/placeholder.jpg';
  if (media.url.startsWith('http')) return media.url;
  return `${STRAPI_URL}${media.url}`;
}
