function AppDownLoad() {
  return (
    <section className="app-download bg-[#f8f6f4] py-8 md:py-16 px-4 flex justify-center items-center overflow-hidden">
      <div className="app-download__content max-w-[1200px] w-full flex flex-col md:flex-row items-center justify-center md:justify-between">
        <div className="app-download__graphic w-full flex justify-center md:justify-end md:flex-grow-[1.5] md:pr-8">
          <img
            className="w-full h-auto object-contain max-w-[400px] md:max-w-full"
            src="https://static.kfcvietnam.com.vn/images/content/home/mobileappbanner/lg/banner.jpg?v=LK5w2g"
            alt="KFC App Promo"
          />
        </div>

        <div className="app-download__stores mt-6 md:mt-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center md:flex-grow-0">
          <a href="#" className="app-download__store-button block">
            <img
              className="w-[180px] h-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
              alt="Google Play"
            />
          </a>
          <a href="#" className="app-download__store-button block">
            <img
              className="w-[180px] h-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
              alt="App Store"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default AppDownLoad;
