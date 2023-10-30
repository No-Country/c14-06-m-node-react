// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider1 from '../assets/images/slider/Slider1.png';
import Slider2 from '../assets/images/slider/Slider2.png';
import Slider3 from '../assets/images/slider/Slider3.png';
import Slider4 from '../assets/images/slider/Slider4.png';
import Slider5 from '../assets/images/slider/Slider5.png';
import Slider6 from '../assets/images/slider/Slider6.png';
import Slider7 from '../assets/images/slider/Slider7.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SliderMain() {
	return (
		<>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={false}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper disabledClass"
			>
				<SwiperSlide>
					<img src={Slider1} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={Slider2} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={Slider3} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={Slider4} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={Slider5} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={Slider6} alt="" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={Slider7} alt="" />
				</SwiperSlide>
			</Swiper>
		</>
	);
}
