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
    phone: '304-428-3097',
    externalId: '304-428-3097'
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
    phone: '712-351-5711',
    externalId: '712-351-5711'
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
    phone: '770-635-2682',
    externalId: '770-635-2682'
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
    phone: '908-691-3242',
    externalId: '908-691-3242'
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
    phone: '972-333-4106',
    externalId: '972-333-4106'
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
    phone: '858-602-3409',
    externalId: '858-602-3409'
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
    phone: '415-907-2647',
    externalId: '415-907-2647'
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
    phone: '702-661-1654',
    externalId: '702-661-1654'
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
    phone: '313-812-8947',
    externalId: '313-812-8947'
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
    phone: '801-301-7894',
    externalId: '801-301-7894'
  }
];
