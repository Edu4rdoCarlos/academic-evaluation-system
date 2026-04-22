export const paginationSchema = {
  type: 'object' as const,
  properties: {
    page: { type: 'number', example: 1 },
    perPage: { type: 'number', example: 20 },
    totalPage: { type: 'number', example: 5 },
    totalItems: { type: 'number', example: 100 },
  },
};
