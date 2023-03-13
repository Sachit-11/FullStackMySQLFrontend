export const filters = [
  {
    name: 'minPrice',
    items: [
      { name: 'Min Price', value: '' },
      { name: '1000', value: '1000' },
      { name: '2000', value: '2000' },
      { name: '3000', value: '3000' },
    ]
  },
  {
    name: 'maxPrice',
    items: [
      { name: 'Max Price', value: '' },
      { name: '1000', value: '1000' },
      { name: '2000', value: '2000' },
      { name: '3000', value: '3000' },
    ]
  },
  {
    name: 'sort',
    items: [
      { name: 'Sort', value: '' },
      { name: 'Lowest Price', value: [`price`, 'ASC'] },
      { name: 'Highest Price', value: [`price`, 'DESC'] },
    ]
  },
];

export const getFilterValues = (filterValues) => {
  const {minPrice, maxPrice, sort} = filterValues;

  const values = {
    'minPrice' : minPrice,
    'maxPrice' : maxPrice,
    'sort' : sort,
  }
  return values;
}