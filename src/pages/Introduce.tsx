import goormthon from '@/../public/svgs/goormthon.svg';
import footerLine from '@/../public/images/introduce/footerLine.png';
import p1 from '@/../public/images/introduce/image.png';
import p2 from '@/../public/images/introduce/image1.png';
import p3 from '@/../public/images/introduce/image2.png';
import p4 from '@/../public/images/introduce/image3.png';
import p5 from '@/../public/images/introduce/image4.png';
import p6 from '@/../public/images/introduce/image5.png';
import p7 from '@/../public/images/introduce/image6.png';
import p8 from '@/../public/images/introduce/image7.png';
import p9 from '@/../public/images/introduce/image8.png';
import Footer from '@/components/Home/Footer';

export default function Introduce() {
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-center font-cafe24 text-main text-4xl mb-3">
          JeonOn
        </h1>
        <h4 className="text-white text-sm text-center font-pretendard">
          팀 소개
        </h4>
      </div>
      <div className="flex justify-center items-center mb-12">
        <img src={goormthon} alt="goormthon" />
      </div>
      <div className="text-white px-16 mb-4">
        <div className="mb-7">
          <h6 className="text-center font-bold mb-4">PM/DE</h6>
          <div className="flex justify-center items-center gap-8">
            <div className="bg-intro-box border border-main h-40 w-[60%] rounded-md flex flex-col justify-start items-center gap-3">
              <div className="w-16 mt-4">
                <img src={p1} alt="p1" />
              </div>
              <div className="text-[10px] flex flex-col justify-center items-center">
                <span className="bg-intro-span">nulo</span>
                <span>경영학부</span>
              </div>
            </div>
            <div className="bg-intro-box border border-main h-40 w-[60%] rounded-md flex flex-col justify-start items-center gap-3">
              <div className="w-16 mt-4">
                <img src={p2} alt="p1" />
              </div>
              <div className="text-[10px] flex flex-col justify-center items-center">
                <span className="bg-intro-span">702</span>
                <span>지구환경과학부</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-7">
          <h6 className="text-center font-bold mb-4">FE</h6>

          <div className="flex justify-center items-center mb-4">
            <div className="bg-intro-box border border-main rounded-md h-40 w-[45%] flex flex-col justify-start items-center gap-3">
              <div className="w-20 mt-4">
                <img src={p3} alt="p3" />
              </div>
              <div className="text-[10px] flex flex-col justify-center items-center">
                <span className="bg-intro-span">식식</span>
                <span>일어일문학과</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-8">
            <div className="bg-intro-box border border-main h-40 w-[60%] rounded-md flex flex-col justify-start items-center gap-3">
              <div className="w-20 mt-4">
                <img src={p4} alt="p4" />
              </div>
              <div className="text-[10px] flex flex-col justify-center items-center">
                <span className="bg-intro-span">BB</span>
                <span>자율전공학부</span>
              </div>
            </div>
            <div className="bg-intro-box border border-main h-40 w-[60%] rounded-md flex flex-col justify-start items-center gap-3">
              <div className="w-20 mt-5">
                <img src={p5} alt="p5" />
              </div>
              <div className="text-[10px] flex flex-col justify-center items-center">
                <span className="bg-intro-span">2km</span>
                <span>소프트웨어공학과</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-7">
          <h6 className="text-center font-bold mb-4">BE</h6>
          <div className="flex justify-center items-center gap-8 mb-4">
            <div className="bg-intro-box border border-main h-40 w-[60%] rounded-md flex flex-col justify-start items-center gap-3">
              <div className="w-16 mt-6">
                <img src={p6} alt="p6" />
              </div>
              <div className="text-[10px] flex flex-col justify-center items-center">
                <span className="bg-intro-span">Como</span>
                <span>소프트웨어공학과</span>
              </div>
            </div>
            <div className="bg-intro-box border border-main h-40 w-[60%] rounded-md flex flex-col justify-start items-center gap-3">
              <div className="w-20 mt-5">
                <img src={p7} alt="p7" />
              </div>
              <div className="text-[10px] flex flex-col justify-center items-center">
                <span className="bg-intro-span">Jedo</span>
                <span>지구환경과학부</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-8">
            <div className="bg-intro-box border border-main h-40 w-[60%] rounded-md flex flex-col justify-start items-center gap-3">
              <div className="w-20 mt-5">
                <img src={p8} alt="p8" />
              </div>
              <div className="text-[10px] flex flex-col justify-center items-center">
                <span className="bg-intro-span">진미나</span>
                <span>지구환경과학부</span>
              </div>
            </div>
            <div className="bg-intro-box border border-main h-40 w-[60%] rounded-md flex flex-col justify-start items-center">
              <div className="w-20 mr-3 mb-5 mt-7">
                <img src={p9} alt="p9" />
              </div>
              <div className="text-[10px] flex flex-col justify-center items-center">
                <span className="bg-intro-span">웆</span>
                <span>소프트웨어공학과</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 mb-3 flex justify-center items-center">
        <img src={footerLine} alt="footerLine" />
      </div>
      <Footer />
    </div>
  );
}
