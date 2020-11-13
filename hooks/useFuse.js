import { useMemo } from 'react';
import Fuse from  'fuse.js';
import { isEmpty } from 'lodash';

const useFuse = (items = [], query, options) => {
  const index = useMemo(() => (
    new Fuse(items, options)
  ), [items, options]);

  const results = useMemo(() => {
    if (isEmpty(query) && options.matchIfEmpty) {
      return (
        items.map((item) => ({ item, matches: [], score: 1 }))
      )
    }

    return (index.search(query));
  }, [index, query])

  return (results);
};

export default useFuse;
