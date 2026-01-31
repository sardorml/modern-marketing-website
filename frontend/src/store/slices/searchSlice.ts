import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface SearchResult {
  id: number;
  documentId: string;
  name: string;
  slug?: string;
  role?: string;
  description?: string;
  type: 'service' | 'team';
}

interface SearchState {
  query: string;
  activeTab: 'services' | 'team';
  currentPage: number;
  pageSize: number;
  results: SearchResult[];
  totalResults: number;
  pageCount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  activeTab: 'services',
  currentPage: 1,
  pageSize: 9,
  results: [],
  totalResults: 0,
  pageCount: 0,
  isLoading: false,
  error: null,
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async ({
    query,
    tab,
    page,
    pageSize,
    locale,
  }: {
    query: string;
    tab: 'services' | 'team';
    page: number;
    pageSize: number;
    locale: string;
  }) => {
    const endpoint = tab === 'services' ? 'services' : 'team-members';
    const filterField = 'name';
    const params = new URLSearchParams({
      'filters[name][$containsi]': query,
      'pagination[page]': String(page),
      'pagination[pageSize]': String(pageSize),
      'locale': locale,
      'populate': '*',
    });

    const res = await fetch(`${STRAPI_URL}/api/${endpoint}?${params}`);
    if (!res.ok) throw new Error('Search failed');
    const json = await res.json();

    const results: SearchResult[] = json.data.map((item: Record<string, unknown>) => ({
      id: item.id,
      documentId: item.documentId,
      name: item.name,
      slug: item.slug || undefined,
      role: item.role || undefined,
      description: item.description || undefined,
      type: tab === 'services' ? 'service' : 'team',
    }));

    return {
      results,
      totalResults: json.meta?.pagination?.total || 0,
      pageCount: json.meta?.pagination?.pageCount || 0,
    };
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setActiveTab(state, action: PayloadAction<'services' | 'team'>) {
      state.activeTab = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    resetSearch(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.results;
        state.totalResults = action.payload.totalResults;
        state.pageCount = action.payload.pageCount;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { setQuery, setActiveTab, setCurrentPage, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
