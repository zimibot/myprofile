import { useRef, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Controller, Autoplay, EffectCards } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AboutUs } from './views/about';
import { Gallery } from './views/gallery';


const onFullScreen = (defaultPage, state, setactive, active, content, name) => {
  setactive(!active)


  if (active) {
    defaultPage = defaultPage.current
    let clientHeight = defaultPage.clientHeight
    let clientWidth = defaultPage.clientWidth

    state({
      about: {
        width: `${clientWidth}px`,
        height: `${clientHeight}px`
      },
      gallery: {
        width: `${clientWidth}px`,
        height: `${clientHeight}px`
      },
      contact: {
        width: `${clientWidth}px`,
        height: `${clientHeight}px`
      },
    })

    setTimeout(() => {
      state({
        about: {
          width: null,
          height: null
        },
        gallery: {
          width: null,
          height: null
        },
        contact: {
          width: null,
          height: null
        },
      })
    }, 100);
  } else {
    content = content.current
    let clientWidth = content.clientWidth
    let clientHeight = content.clientHeight
    setTimeout(() => {
      switch (name) {
        case "about":
          state(d => ({
            ...d,
            about: {
              width: `${clientWidth}px`,
              height: `${clientHeight}px`
            }
          }))
          break;
        case "gallery": {
          state(d => ({
            ...d,
            gallery: {
              width: `${clientWidth}px`,
              height: `${clientHeight}px`
            }
          }))
        }
          break
        case "contact": {
          state(d => ({
            ...d,
            contact: {
              width: `${clientWidth}px`,
              height: `${clientHeight}px`
            }
          }))
        }
      }
    }, 300);



  }

}



export default function Home() {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [active, setactive] = useState(false);
  const [widthPosition, setwidthPosition] = useState(null);


  const defaultPage = useRef(null)
  const content = useRef(null)
  return (
    <div className="grid  lg:grid-cols-3 flex-1 gap-4 p-4 bg-black bg-opacity-30 backdrop-blur-sm">
      {active ? <div className="fixed left-0 top-0 bg-black w-full h-full bg-opacity-40 z-10 backdrop-blur-md"></div> : ""}

      <div className={`w-full h-full row-span-2 hidden lg:block`}>
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
      <div className="grid grid-cols-2 w-full h-full col-span-2 row-span-2 gap-4 relative overflow-hidden" ref={content}>
        <div className=" flex items-center justify-center" ref={defaultPage}>
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
        <div className='relative'>
          <div className={`bg-slate-200 right-0 top-0  w-full h-full dark:bg-slate-800 px-6 py-8 ring-1 ring-slate-900/5  hover:shadow-black  ${widthPosition?.about?.width ? "z-40  fixed mt-4 mr-4" : "absolute"}`} style={{
            width: `${!widthPosition ? `${defaultPage.current?.clientWidth}px` : widthPosition?.about?.width}`,
            height: `${!widthPosition ? `${defaultPage.current?.clientHeight}px` : widthPosition?.about?.height}`,
            transition: "0.3s ease-in-out"
          }}>
            {widthPosition?.about?.width ? <div>
              <button className="absolute right-0 p-3 top-0 hover:bg-red-500 hover:text-white z-10" onClick={() => {
                onFullScreen(defaultPage, setwidthPosition, setactive, active, content, "about")
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <AboutUs />
            </div> :
              <div className="flex items-center justify-center flex-col w-full h-full absolute top-0 left-0 cursor-pointer" onClick={() => {
                onFullScreen(defaultPage, setwidthPosition, setactive, active, content, "about")
              }}>
                <div className="text-[40px] font-bold cursor-pointer">
                  ABOUT <span className="text-rose-600">TEAM</span>
                </div>
              </div>
            }
          </div>
        </div>
        <div className={`transition-all relative py-8`} >
          <div className={`bg-slate-200  w-full h-full dark:bg-slate-800  ring-1 ring-slate-900/5  hover:shadow-black  ${widthPosition?.gallery?.width ? "z-40 fixed mb-4 mr-4 bottom-0 " : "absolute  bottom-0"}`} style={{
            width: `${!widthPosition ? `${defaultPage.current?.clientWidth}px` : widthPosition?.gallery?.width}`,
            height: `${!widthPosition ? `${defaultPage.current?.clientHeight}px` : widthPosition?.gallery?.height}`,
            transition: "0.3s ease-in-out"
          }}>
            {widthPosition?.gallery?.width ?<div>
              <button className="absolute right-0 p-3 top-0 hover:bg-red-500 hover:text-white z-10" onClick={() => {
                onFullScreen(defaultPage, setwidthPosition, setactive, active, content, "gallery")
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <Gallery />
            </div> :
              <div className="flex items-center justify-center flex-col w-full h-full absolute top-0 left-0 cursor-pointer" onClick={() => {
                onFullScreen(defaultPage, setwidthPosition, setactive, active, content, "gallery")
              }}>
                <div className="text-[40px] font-bold cursor-pointer">
                  <span className="text-rose-600">GALLERY</span>
                </div>
              </div>
            }
          </div>
        </div>
        <div className={`transition-all relative  pt-20 pb-14`} >
          <div className={`bg-slate-200  w-full h-full dark:bg-slate-800  ring-1 ring-slate-900/5  hover:shadow-black  ${widthPosition?.contact?.width ? "z-40 fixed mb-4 mr-4 bottom-0 right-0" : "absolute top-0 left-0"}`} style={{
            width: `${!widthPosition ? `${defaultPage.current?.clientWidth}px` : widthPosition?.contact?.width}`,
            height: `${!widthPosition ? `${defaultPage.current?.clientHeight}px` : widthPosition?.contact?.height}`,
            transition: "0.3s ease-in-out"
          }}>
            {widthPosition?.contact?.width ? "" :
              <div className="flex items-center justify-center flex-col w-full h-full absolute top-0 left-0 cursor-pointer" onClick={() => {
                onFullScreen(defaultPage, setwidthPosition, setactive, active, content, "contact")
              }}>
                <div className="text-[40px] font-bold cursor-pointer">
                  <span className="text-rose-600">CONTACT</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )

}