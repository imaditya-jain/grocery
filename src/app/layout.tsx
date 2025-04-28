import { StoreProvider } from '@/providers';
import { ToastContainer } from 'react-toastify'
import { AuthCheckMiddleware } from '@/middleware';
import Document from './document';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import '@/styles/globals.css'


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider><AuthCheckMiddleware><ToastContainer /><Document>{children}</Document></AuthCheckMiddleware></StoreProvider>
      </body>
    </html>
  );
}
