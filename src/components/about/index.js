import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export const AboutUs = () => {
  const frontEnd = 80;
  const backend = 40;
  const managgements = 50;

  return (
    <div className="flex flex-col w-full h-full absolute left-0 top-0 p-6">
      <div className="flex justify-center border-b border-[#111]">
        <div className="text-[40px] font-bold">
          ABOUT <span className="text-rose-600">TEAM</span>
        </div>
      </div>
      <div className="p-4 flex gap-2">
        <a className="bg-white shadow p-2 hover:bg-red-600 hover:text-white rounded cursor-pointer" href="#harris">Harris Munahar</a>
        <a className="bg-white shadow p-2 hover:bg-red-600 hover:text-white rounded cursor-pointer" href="#rosalina">Rosalina</a>
        <a className="bg-white shadow p-2 hover:bg-red-600 hover:text-white rounded cursor-pointer">Rojak</a>
      </div>
      <div className="flex-1 overflow-auto p-4 flex flex-col w-full gap-4 scroll-smooth">
        <div className="flex gap-4 w-full" id="harris">
          <div className=" w-60 h-80">
            <img className="w-full h-full object-cover rounded-md" src="https://www.morganstanley.com/content/dam/msdotcom/people/tiles/wided-sghaier.jpg.img.490.medium.jpg/1594912196352.jpg"></img>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">NAMA LENGKAP</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Harris Munahar</p>
              </div>
            </div>
            <div>
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">STATUS</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Belum Nikah</p>
              </div>
            </div>
            <div className="col-span-2">
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">KEMAMPUAN</h5>
                </a>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
                  <div className="flex justify-center flex-col items-center gap-3 bg-slate-100  rounded-xl shadow">
                    <div className="p-3 border-b ">Front End</div>
                    <div className="px-2 py-1">
                      <CircularProgressbar
                        value={frontEnd}
                        text={`${frontEnd}%`}
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
                          pathColor: `rgba(54, 234, 111, ${frontEnd / 100})`,
                          textColor: '#f88',
                          trailColor: '#d6d6d6',
                          backgroundColor: '#3e98c7',
                        })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center flex-col items-center gap-3 bg-slate-100  rounded-xl shadow">
                    <div className="p-3 border-b ">Backend</div>
                    <div className="px-2 py-1">
                      <CircularProgressbar
                        value={backend}
                        text={`${backend}%`}
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
                          pathColor: `rgba(24, 55, 225, ${backend / 100})`,
                          textColor: '#f88',
                          trailColor: '#d6d6d6',
                          backgroundColor: '#3e98c7',
                        })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center flex-col items-center gap-3 bg-slate-100  rounded-xl shadow">
                    <div className="p-3 border-b ">Managements</div>
                    <div className="px-2 py-1">
                      <CircularProgressbar
                        value={managgements}
                        text={`${managgements}%`}
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
                          pathColor: `rgba(76, 11, 234, ${managgements / 100})`,
                          textColor: '#f88',
                          trailColor: '#d6d6d6',
                          backgroundColor: '#3e98c7',
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 flex flex-col gap-4 justify-between">
                    <div>
                      <div className="flex justify-between">
                        <span>HTML</span>
                        <span>70%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-cyan-400 h-2.5 rounded-full" style={{
                          width: "70%"
                        }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>CSS</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{
                          width: "75%"
                        }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>JAVASCRIPT</span>
                        <span>60%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{
                          width: "60%"
                        }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>PHP</span>
                        <span>35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{
                          width: "35%"
                        }}></div>
                      </div>
                    </div>
                  </div>
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
        <div className="w-full p-1 bg-[#aaa]"></div>
        <div className="flex gap-4 w-full" id="rosalina">
          <div className=" w-60 h-80">
            <img className="w-full h-full object-cover rounded-md" src="https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2lkZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"></img>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">NAMA LENGKAP</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Rosalina</p>

              </div>
            </div>
            <div>
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">EMAIL</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">harris.munahar@raharja.info</p>

              </div>
            </div>
            <div>
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">ALAMAT</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">annisa, Gg. Jawa, RT.001/RW.010, Pabuaran Tumpeng, Kec. Karawaci, Kota Tangerang, Banten 15112</p>
              </div>
            </div>
            <div>
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">STATUS</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Belum Nikah</p>
              </div>
            </div>
            <div className="col-span-2">
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-full h-full">
                <a href="#">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-[#444] dark:text-white">SOSIAL MEDIA</h5>
                </a>
                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex gap-4">
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
      </div>
    </div>
  )
}