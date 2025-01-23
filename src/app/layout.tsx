import { StoreProvider } from '@/providers';
import { ToastContainer } from 'react-toastify'
import { AuthCheckMiddleware } from '@/middleware';
import '@/styles/globals.css'

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider><AuthCheckMiddleware><ToastContainer />{children}</AuthCheckMiddleware></StoreProvider>
      </body>
    </html>
  );
}
