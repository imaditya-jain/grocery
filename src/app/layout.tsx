import { StoreProvider } from '@/providers';
import { ToastContainer } from 'react-toastify'
import { AuthCheckMiddleware } from '@/middleware';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/globals.css'
import Document from './document';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider><AuthCheckMiddleware><ToastContainer /><Document>{children}</Document></AuthCheckMiddleware></StoreProvider>
      </body>
    </html>
  );
}
