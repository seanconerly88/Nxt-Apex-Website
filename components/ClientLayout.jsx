'use client';

import { BookingProvider } from '@/contexts/BookingContext';
import BookingModal from '@/components/BookingModal';

export default function ClientLayout({ children }) {
  return (
    <BookingProvider>
      {children}
      <BookingModal />
    </BookingProvider>
  );
}
