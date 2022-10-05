import { useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Controller, Autoplay, EffectCards, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Zoom from "smooth-zoom";
import { Content } from './components/content';



export default function Home() {
  const [controlledSwiper, setControlledSwiper] = useState(null);

  useEffect(() => {
    const zoom = Zoom(".zoomable", {
      background: "rgba(0, 0, 0, .3)",
    });
    return () => {

    }
  }, [])



  return (
    <div className='flex-1 flex flex-col'>

      <div className="grid grid-cols-3 flex-1 gap-4 p-4 bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="w-full h-full row-span-2">
          <div className="w-full h-full">
            <div className="w-full h-full overflow-hidden px-4">
              {controlledSwiper &&
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Controller, Autoplay, EffectCards]}
                  effect={'cards'}
                  speed={1000}
                  controller={{ control: controlledSwiper }}
                  scrollbar={{
                    draggable: true,
                  }}
                  autoplay={{
                    delay: 2000,
                  }}
                  spaceBetween={10}
                  slidesPerView={1}
                  onSlideChange={() => console.log('slide change')}
                  className="h-full"
                >
                  <SwiperSlide>
                    <img className="object-cover h-full w-full" src="https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2lkZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"></img>
                  </SwiperSlide>
                  <SwiperSlide>
                    <img className="object-cover h-full w-full" src="https://www.morganstanley.com/content/dam/msdotcom/people/tiles/wided-sghaier.jpg.img.490.medium.jpg/1594912196352.jpg"></img>

                  </SwiperSlide>

                </Swiper>
              }
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center">
          <div className="w-full h-full">
            <Swiper
              modules={[Controller]}
              allowTouchMove={false}
              onSwiper={setControlledSwiper}
              className="w-full h-full">
              <SwiperSlide>
                <div className="flex items-center justify-center flex-col gap-2 w-full h-full bg-opacity-30 text-white bg-black backdrop-blur">
                  <p className="text"> HI THERE ! I'M</p>
                  <div className="text-[40px] font-bold">Harris Munahar</div>
                  <p className="text-lg text-rose-600 font-semibold">SOFTWARE ENGINERING</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex items-center justify-center flex-col gap-2 w-full h-full bg-opacity-30 text-white bg-black backdrop-blur">
                  <p className="text-lg"> HI THERE ! I'M</p>
                  <div className="text-[40px] font-bold">Alya Roida</div>
                  <p className="text-lg text-rose-600 font-semibold">MANAGEMENT</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="zoomable bg-slate-200 dark:bg-slate-800 px-6 py-8 ring-1 ring-slate-900/5 hover:border-rose-500 hover:border-2  hover:shadow-black transition-all z-10 hover:scale-105">
          <div className="h-full w-full flex items-center justify-center flex-col">
            <div className="text-[40px] font-bold ">
              ABOUT <span className="text-rose-600">TEAM</span>
            </div>
          </div>
        </div>
        <div className="zoomable bg-slate-200 dark:bg-slate-800 px-6 py-8 ring-1 ring-slate-900/5 hover:border-rose-500 hover:border-2  hover:shadow-black transition-all z-10 hover:scale-105">
          <div className="h-full w-full flex items-center justify-center flex-col">
            <div className="text-[40px] font-bold ">
              <span className="text-rose-600">GALLERY</span>
            </div>
          </div>
        </div>
        <div className="zoomable bg-slate-200 dark:bg-slate-800 px-6 py-8 ring-1 ring-slate-900/5 hover:border-rose-500 hover:border-2  hover:shadow-black transition-all z-10 hover:scale-105">
          <div className="h-full w-full flex items-center justify-center flex-col">
            <div className="text-[40px] font-bold ">
              <span className="text-rose-600">CONTACT</span>
            </div>
          </div>
        </div>

      </div>
      <Content/>
    </div>
  )

}