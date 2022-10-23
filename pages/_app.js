
import { ToastContainer } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-fade';
import 'antd/dist/antd.css';
import '../styles/globals.css'
import 'react-medium-image-zoom/dist/styles.css'
import 'react-circular-progressbar/dist/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from 'react-cookie';
import ProtectedRoute from '../src/protectRoutes';
import { ContextProvider } from '../middleware/useContext';


function MyApp({ Component, pageProps }) {
  return <div className="flex-1 flex flex-col overflow-hidden">
    <CookiesProvider>
      <ContextProvider>
        <ProtectedRoute>
          <div className="flex flex-col flex-1 overflow-auto">
            <Component  {...pageProps} />
          </div>
        </ProtectedRoute>
        <ToastContainer position="top-center"></ToastContainer>
      </ContextProvider>
    </CookiesProvider>
  </div>
}

export default MyApp
