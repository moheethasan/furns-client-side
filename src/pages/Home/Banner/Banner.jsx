import banner from "../../../assets/banner.jpg";

const Banner = () => {
  return (
    <header className="relative">
      <img
        className="w-full object-cover h-[370px] sm:h-[430px] md:h-[490px] lg:h-[560px] xl:h-[650px] 2xl:h-[750px]"
        src={banner}
        alt="banner"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h3 className="text-xl md:text-2xl lg:text-3xl mb-2 text-white font-bold">
          New Products
        </h3>
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2 md:mb-5 font-bold text-white">
          Flexible Chair
        </h1>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2 md:mb-5 text-white font-medium">
          Discover premium furniture that combines style and functionality at
          Furns. Explore limitless possibilities and elevate your home&#39;s
          elegance.
        </p>
        <button className="btn-primary">
          <span className="flex items-center gap-1">Shop Now</span>
        </button>
      </div>
    </header>
  );
};

export default Banner;
