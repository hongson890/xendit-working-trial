import { v4 as uuid } from 'uuid';
import moment from 'moment';

export default [
  {
    id: uuid(),
    status: 'settled',
    type: 'payment',
    channel: 'virtualAccount',
    account: '52701292992',
    amount: 9000000,
    reference: 'external-12388923092834908902349902309482384809234092834092384',
    dateUpdated: moment('26 Feb 2019, 5:10 PM'),
    address: {
      country: 'USA',
      state: 'West Virginia',
      city: 'Parkersburg',
      street: '2849 Fulton Street'
    },
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: 1555016400000,
    email: 'ekaterina.tankova@devias.io',
    name: 'Ekaterina Tankova',
    phone: '304-428-3097'
  },
  {
    id: uuid(),
    status: 'paid',
    type: 'payment',
    channel: 'eWallet',
    account: '08129828283939',
    amount: 200000,
    reference: 'external-12388923092834908902349902309482384809234092834092384',
    dateUpdated: moment('26 Feb 2019, 5:10 PM'),
    address: {
      country: 'USA',
      state: 'Bristow',
      city: 'Iowa',
      street: '1865  Pleasant Hill Road'
    },
    avatarUrl: '/static/images/avatars/avatar_4.png',
    createdAt: 1555016400000,
    email: 'cao.yu@devias.io',
    name: 'Cao Yu',
    phone: '712-351-5711'
  },
  {
    id: uuid(),
    status: 'pending',
    type: 'payment',
    channel: 'retailOutlet',
    account: '52701292992',
    amount: 50000,
    reference:
      'invoice-123e8892389343984jr9834hv3nvrvimhv3jhnv8vh4rh47f3ni3gnfhf',
    dateUpdated: moment('26 Feb 2019, 5:10 PM'),
    address: {
      country: 'USA',
      state: 'Georgia',
      city: 'Atlanta',
      street: '4894  Lakeland Park Drive'
    },
    avatarUrl: '/static/images/avatars/avatar_2.png',
    createdAt: 1555016400000,
    email: 'alexa.richardson@devias.io',
    name: 'Alexa Richardson',
    phone: '770-635-2682'
  },
  {
    id: uuid(),
    status: 'failed',
    type: 'payment',
    channel: 'virtualAccount',
    account: '52701292992',
    amount: 120500,
    reference: 'external-12388923092834908902349902309482384809234092834092384',
    dateUpdated: moment('26 Feb 2019, 5:10 PM'),
    address: {
      country: 'USA',
      state: 'Ohio',
      city: 'Dover',
      street: '4158  Hedge Street'
    },
    avatarUrl: '/static/images/avatars/avatar_5.png',
    createdAt: 1554930000000,
    email: 'anje.keizer@devias.io',
    name: 'Anje Keizer',
    phone: '908-691-3242'
  },
  {
    id: uuid(),
    status: 'failed',
    type: 'payment',
    channel: 'virtualAccount',
    account: '52701292992',
    amount: 120500,
    reference: 'external-12388923092834908902349902309482384809234092834092384',
    dateUpdated: moment('26 Feb 2019, 5:10 PM'),
    address: {
      country: 'USA',
      state: 'Texas',
      city: 'Dallas',
      street: '75247'
    },
    avatarUrl: '/static/images/avatars/avatar_6.png',
    createdAt: 1554757200000,
    email: 'clarke.gillebert@devias.io',
    name: 'Clarke Gillebert',
    phone: '972-333-4106'
  },
  {
    id: uuid(),
    status: 'refunded',
    type: 'payment',
    channel: 'cards',
    account: '223199110099****',
    amount: 7000,
    reference:
      'refund-for-invoice-2309euciuom239hmcrunc23hrcn8y23gcnr283hcr282823',
    dateUpdated: moment('26 Feb 2019, 5:10 PM'),
    address: {
      country: 'USA',
      state: 'California',
      city: 'Bakerfield',
      street: '317 Angus Road'
    },
    avatarUrl: '/static/images/avatars/avatar_1.png',
    createdAt: 1554670800000,
    email: 'adam.denisov@devias.io',
    name: 'Adam Denisov',
    phone: '858-602-3409'
  },
  {
    id: uuid(),
    status: 'failed',
    type: 'payment',
    channel: 'virtualAccount',
    account: '52701292992',
    amount: 120500,
    reference: 'external-12388923092834908902349902309482384809234092834092384',
    dateUpdated: moment('26 Feb 2019, 5:10 PM'),
    address: {
      country: 'USA',
      state: 'California',
      city: 'Redondo Beach',
      street: '2188  Armbrester Drive'
    },
    avatarUrl: '/static/images/avatars/avatar_7.png',
    createdAt: 1554325200000,
    email: 'ava.gregoraci@devias.io',
    name: 'Ava Gregoraci',
    phone: '415-907-2647'
  },
  {
    id: uuid(),
    status: 'failed',
    type: 'payment',
    channel: 'virtualAccount',
    account: '52701292992',
    amount: 120500,
    reference: 'external-12388923092834908902349902309482384809234092834092384',
    dateUpdated: moment('26 Feb 2019, 5:10 PM'),
    address: {
      country: 'USA',
      state: 'Nevada',
      city: 'Las Vegas',
      street: '1798  Hickory Ridge Drive'
    },
    avatarUrl: '/static/images/avatars/avatar_8.png',
    createdAt: 1523048400000,
    email: 'emilee.simchenko@devias.io',
    name: 'Emilee Simchenko',
    phone: '702-661-1654'
  },
  {
    id: uuid(),
    status: 'failed',
    type: 'payment',
    channel: 'virtualAccount',
    account: '52701292992',
    amount: 120500,
    reference: 'external-12388923092834908902349902309482384809234092834092384',
    dateUpdated: moment('26 Feb 2019, 5:10 PM'),
    address: {
      country: 'USA',
      state: 'Michigan',
      city: 'Detroit',
      street: '3934  Wildrose Lane'
    },
    avatarUrl: '/static/images/avatars/avatar_9.png',
    createdAt: 1554702800000,
    email: 'kwak.seong.min@devias.io',
    name: 'Kwak Seong-Min',
    phone: '313-812-8947'
  },
  {
    id: uuid(),
    status: 'failed',
    type: 'payment',
    channel: 'virtualAccount',
    account: '52701292992',
    amount: 120500,
    reference: 'external-12388923092834908902349902309482384809234092834092384',
    dateUpdated: moment('26 Feb 2019, 5:10 PM'),
    address: {
      country: 'USA',
      state: 'Utah',
      city: 'Salt Lake City',
      street: '368 Lamberts Branch Road'
    },
    avatarUrl: '/static/images/avatars/avatar_10.png',
    createdAt: 1522702800000,
    email: 'merrile.burgett@devias.io',
    name: 'Merrile Burgett',
    phone: '801-301-7894'
  }
];
