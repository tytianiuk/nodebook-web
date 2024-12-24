import { categories } from '@/mock/data/categories'
import { Book } from '@/types/book'

export const catalog: Book[] = [
  {
    _id: '1',
    name: 'Дюна',
    pageQuantity: 412,
    description:
      'Класика наукової фантастики про політику, релігію та екологію.',
    author: 'Френк Герберт',
    categoryId: categories[7],
    averageRating: 4.8,
    comments: [
      {
        _id: '201',
        userId: {
          _id: '101',
          email: 'reader_1@gmail.com',
          username: 'Reader1',
        },
        comment: 'Абсолютний шедевр!',
      },
      {
        _id: '202',
        userId: {
          _id: '102',
          email: 'scifi_fan@gmail.com',
          username: 'SciFiFan',
        },
        comment: 'Захоплююча та провокуюча до роздумів.',
      },
    ],
    reviews: [
      {
        _id: '301',
        userId: {
          _id: '101',
          email: 'reader_1@gmail.com',
          username: 'Reader1',
        },
        rating: 5,
        comment: 'Абсолютний шедевр!',
      },
      {
        _id: '302',
        userId: {
          _id: '102',
          email: 'scifi_fan@gmail.com',
          username: 'SciFiFan',
        },
        rating: 5,
        comment: 'Захоплююча та провокуюча до роздумів.',
      },
    ],
  },
]
