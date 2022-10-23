import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Divider, Empty, Skeleton, Segmented } from 'antd';
export const AboutUs = ({data}) => {



  if (!data) return <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
    <Skeleton active />
  </div>;



 let attr =  data.attributes ?  data.attributes.map(d => {
    return {
      label: d.fullname,
      value: d.nim
    }
  }) : []
  return (
    <div className="flex flex-col w-full h-full absolute left-0 top-0 p-6">
      <div className="flex justify-center border-b border-[#111]">
        <div className="text-[40px] font-bold">
          ABOUT <span className="text-rose-600">TEAM</span>
        </div>
      </div>
      <div className="p-4 flex gap-2">
        <Segmented onChange={d => {
          document.getElementById(d).scrollIntoView({
            behavior: 'smooth'
          });
        }} options={attr} />
      </div>
      <div className="flex-1 overflow-auto p-4 flex flex-col w-full gap-4 scroll-smooth">
        {!data.results ? <Empty></Empty> : data.results.rows.map(d => {
          return (<div key={d.id} id={d.nim}>
            <div className="flex gap-4 w-full" >
              <div className="w-60 h-80 sticky top-0">
                <img className="w-full h-full object-cover rounded-md" src={d.foto}></img>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">NAMA LENGKAP</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{d.fullname}</p>
                  </div>
                </div>
                <div>
                  <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">STATUS</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{d.status ? d.status : "-"}</p>
                  </div>
                </div>
                <div>
                  <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">NOMOR PONSEL</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{d.nohp ? d.nohp : "-"}</p>
                  </div>
                </div>
                <div>
                  <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">EMAIL</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{d.email ? d.email : "-"}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">KEMAMPUAN</h5>
                    </a>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3">

                      {d.users_skills.length === 0 ? <div className="flex justify-center col-span-4">
                        <Empty></Empty>
                      </div> : d.users_skills.map(d => {
                        return (
                          <div className="flex justify-center flex-col items-center gap-3 bg-slate-100  rounded-xl shadow" key={d.id}>
                            <div className="p-3 border-b w-full text-center">{d.nama}</div>
                            <div className="px-2 py-1">
                              <CircularProgressbar
                                value={d.nilai}
                                text={`${d.nilai}%`}
                                strokeWidth={6}
                                styles={buildStyles({
                                  // Rotation of path and trail, in number of turns (0-1)
                                  rotation: 0.25,

                                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'


                                  // Text size
                                  textSize: '16px',

                                  // How long animation takes to go from one percentage to another, in seconds
                                  pathTransitionDuration: 0.5,

                                  // Can specify path transition in more detail, or remove it entirely
                                  // pathTransition: 'none',

                                  // Colors
                                  pathColor: `rgb(${parseInt(d.nilai / 1.2)}  ${parseInt(d.nilai / 1.8)} ${parseInt(d.nilai * 1.5)} )`,
                                  textColor: `rgb(${parseInt(d.nilai / 1.2)}  ${parseInt(d.nilai / 1.8)} ${parseInt(d.nilai * 1.5)} )`,
                                  trailColor: '#d6d6d6',
                                  backgroundColor: '#3e98c7',
                                })}
                              />
                            </div>
                          </div>
                        )
                      })}

                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">Alamat</h5>
                    </a>
                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex gap-4 flex-wrap">
                      {d.alamat}
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                    <a href="#">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">SOSIAL MEDIA</h5>
                    </a>
                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex gap-4 flex-wrap">
                      <a className="text-blue-600 font-semibold" href="">
                        FACEBOOK
                      </a>
                      <a className="text-pink-600 font-semibold" href="">
                        INSTAGRAM
                      </a>
                      <a className="text-red-500 font-semibold" href="">
                        YOUTUBE
                      </a>
                      <a className="text-cyan-500 font-semibold" href="">
                        TELEGRAM
                      </a>
                      <a className="text-green-500 font-semibold" href="">
                        WHATSAPP
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <Divider />

          </div>
          )
        })}

      </div>
    </div>
  )
}