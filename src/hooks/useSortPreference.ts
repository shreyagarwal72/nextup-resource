import { useState, useEffect } from 'react';

export type SortPreference = 'alphabetical' | 'category' | 'newest';

const SORT_PREF_KEY = 'nextup-sort-preference';

export const useSortPreference = () => {
  const [sortPreference, setSortPreferenceState] = useState<SortPreference>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(SORT_PREF_KEY) as SortPreference) || 'alphabetical';
    }
    return 'alphabetical';
  });

  const setSortPreference = (pref: SortPreference) => {
    setSortPreferenceState(pref);
    localStorage.setItem(SORT_PREF_KEY, pref);
  };

  return { sortPreference, setSortPreference };
};
