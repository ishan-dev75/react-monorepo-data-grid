import { User } from '../types/user';

export const users: User[] = [
  { id: 1, name: 'Alex Johnson', imgURL: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'Sarah Miller', imgURL: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 3, name: 'David Chen', imgURL: 'https://randomuser.me/api/portraits/men/59.jpg' },
  { id: 4, name: 'Emily Wilson', imgURL: 'https://randomuser.me/api/portraits/women/17.jpg' },
  { id: 5, name: 'Michael Brown', imgURL: 'https://randomuser.me/api/portraits/men/81.jpg' },
  { id: 6, name: 'Jessica Lee' }, // No image URL to test fallback to initials
  { id: 7, name: 'Robert Taylor', imgURL: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { id: 8, name: 'Lisa Garcia', imgURL: 'https://randomuser.me/api/portraits/women/28.jpg' },
];
