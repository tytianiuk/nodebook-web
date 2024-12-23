import { Book } from '@/types/book'

export const catalog: Book[] = [
  {
    id: '1',
    name: 'Дюна',
    author: 'Френк Герберт',
    category: 'Наукова фантастика',
    pageQuantity: 412,
    averageRating: 4.8,
    description:
      'Класика наукової фантастики про політику, релігію та екологію.',
    comments: [
      {
        id: '1',
        userName: 'Reader1',
        comment: 'Абсолютний шедевр!',
      },
      {
        id: '2',
        userName: 'SciFiFan',
        comment: 'Захоплююча та провокуюча до роздумів.',
      },
    ],
    reviews: [
      {
        id: '1',
        userName: 'Reader1',
        rating: 5,
        comment: 'Абсолютний шедевр!',
      },
      {
        id: '2',
        userName: 'SciFiFan',
        rating: 5,
        comment: 'Захоплююча та провокуюча до роздумів.',
      },
    ],
  },
  {
    id: '2',
    name: 'Володар перснів',
    author: 'Дж. Р. Р. Толкін',
    category: 'Фентезі',
    pageQuantity: 1216,
    averageRating: 4.0,
    description: 'Епічна історія про боротьбу між добром і злом.',
    comments: [
      {
        id: '1',
        userName: 'FrodoFan',
        comment: 'Найкраща фентезі-історія, яку коли-небудь розповідали.',
      },
    ],
    reviews: [
      {
        id: '1',
        userName: 'FrodoFan',
        rating: 5,
        comment: 'Найкраща фентезі-історія, яку коли-небудь розповідали.',
      },
    ],
  },
  {
    id: '3',
    name: 'Погані звички',
    author: 'Дженні Ньюелл',
    category: 'Психологічний',
    pageQuantity: 256,
    averageRating: 0,
    comments: [],
    reviews: [],
  },
  {
    id: '4',
    name: 'Пригоди Аліси в Країні чудес',
    author: 'Льюїс Керролл',
    category: 'Фентезі',
    pageQuantity: 192,
    averageRating: 4.2,
    description: 'Чарівна подорож крізь фантастичний світ.',
    comments: [
      {
        id: '1',
        userName: 'WonderlandFan',
        comment: 'Чарівно та поза часом.',
      },
      {
        id: '2',
        userName: 'CuriousReader',
        comment: 'Чудово підходить для всіх вікових категорій!',
      },
    ],
    reviews: [
      {
        id: '1',
        userName: 'WonderlandFan',
        rating: 5,
        comment: 'Чарівно та поза часом.',
      },
      {
        id: '2',
        userName: 'CuriousReader',
        rating: 4,
        comment: 'Чудово підходить для всіх вікових категорій!',
      },
    ],
  },
  {
    id: '5',
    name: 'Ловець у житі',
    author: 'Дж. Д. Селінджер',
    category: 'Класика',
    pageQuantity: 214,
    averageRating: 2.0,
    description: 'Історія підліткової тривоги та бунту.',
    comments: [
      {
        id: '1',
        userName: 'HoldenFan',
        comment: 'Зрозуміло та емоційно.',
      },
    ],
    reviews: [
      {
        id: '1',
        userName: 'HoldenFan',
        rating: 4,
        comment: 'Зрозуміло та емоційно.',
      },
    ],
  },
  {
    id: '6',
    name: '1984',
    author: 'Джордж Орвелл',
    category: 'Наукова фантастика',
    pageQuantity: 328,
    averageRating: 3.6,
    description: 'Дистопічний роман про тоталітаризм.',
    comments: [
      {
        id: '1',
        userName: 'BigBrother',
        comment: 'Жахливо та провокуюче до роздумів. Буду читати далі.',
      },
    ],
    reviews: [],
  },
  {
    id: '7',
    name: 'Убити пересмішника',
    author: 'Гарпер Лі',
    category: 'Класика',
    pageQuantity: 281,
    averageRating: 3.25,
    description: 'Роман про расову несправедливість на півдні США.',
    comments: [],
    reviews: [
      {
        id: '1',
        userName: 'JusticeSeeker',
        rating: 5,
        comment: 'Обов’язково для прочитання кожному.',
      },
    ],
  },
]
