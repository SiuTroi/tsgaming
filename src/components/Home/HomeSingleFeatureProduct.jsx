import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";


const HomeSingleFeatureProduct = () => {

  return (
    <div className="category-page mb-3">
      <h2 className="text-blue-500 text-[32px] font-bold">Nhiều người mua</h2>
          <div
            className="pt-12 bg-transparent lg:flex "
          >
            <div className="py-2 mx-auto lg:bg-white lg:w-1/2 lg:flex lg:justify-center lg:items-center lg:rounded-2xl lg:shadow-xl">
              <img
                src="https://down-vn.img.susercontent.com/file/sg-11134201-22110-yi8lrcb1j8jv03"
                alt="Ốp Điện Thoại Họa Tiết Anime Zoldyck Killua Cho iPhone 5 5s SE 2016 6 6s 6Plus 6sPlus 7 8 SE 2020 7 8Plus X XS XR XS Max"
                className="w-[250px] mx-auto rounded-md"
              />
            </div>
            <div className="px-4 flex flex-col bg-transparent lg:w-1/2">
              <div className="mt-12">
                <p className="text-gray-400">Sell off 0%</p>
                <h3 className="text-lg">Ốp Điện Thoại Họa Tiết Anime Zoldyck Killua Cho iPhone 5 5s SE 2016 6 6s 6Plus 6sPlus 7 8 SE 2020 7 8Plus X XS XR XS Max</h3>
              </div>
              <div className="bg-[#dbd9d9] my-6 rounded-xl">
                <h2 className="font-bold text-blue-500 text-center py-2">
                  22.966 VND
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1 items-center">
                  <AiFillStar color="#fd7f28" />
                  <AiFillStar color="#fd7f28" />
                  <AiFillStar color="#fd7f28" />
                  <AiFillStar color="#fd7f28" />
                  <BsStarHalf color="#fd7f28" />
                </div>
                <p className="underline font-light text-[14px]">124 Evaluate</p>
              </div>
              <div className="my-4 pt-4">
                <p className="font-normal text-[14px] text-justify text-[#0000008f]">
                <p class="truncate">Chào mừng bạn đến với cửa hàng của chúng tôi
                    Sau đây là phần giới thiệu cửa hàng của chúng tôi

                    Chất liệu: Vỏ mềm silicone chất lượng cao.
                    1. 100% thương hiệu mới, chất lượng cao, giá thấp.
                    2. Dễ dàng lắp vào và tháo ra.
                    3. Bảo vệ bạn khỏi bụi, trầy xước và va đập.
                    4. Kỹ thuật thủ công tinh tế và thiết kế thời trang.
                    5. Bảo vệ món đồ quý giá của bạn khỏi bị trầy xước và hư hỏng.
                    6. Hoàn hảo như một món quà cho bạn bè và gia đình.

                    Kính thưa khách hàng. Đây là một số thông tin bạn cần biết, vui lòng đọc kỹ và cảm ơn bạn đã thông cảm.
                    Nếu bạn có bất kỳ câu hỏi nào về đơn hàng của mình, vui lòng liên hệ với chúng tôi và chúng tôi sẽ liên hệ lại với bạn trong giờ hành chính. Đội ngũ dịch vụ khách hàng của chúng tôi luôn sẵn sàng trợ giúp!
                    Chúng tôi sẽ đảm bảo khách hàng hài lòng 100%!
                    Xin lưu ý rằng chúng tôi đang bắt đầu gửi các gói hàng từ Trung Quốc. Thời gian hậu cần chung là 7-14 ngày.
                    Nhưng sẽ nhanh hơn nếu đến nơi.
                    Cuối cùng, tôi muốn bạn mua sắm vui vẻ! Nếu bạn hài lòng với sản phẩm và dịch vụ của chúng tôi, vui lòng cho chúng tôi năm sao và hình ảnh của bạn.
                    Cảm ơn bạn đã ủng hộ, cho chúng tôi cung cấp cho bạn những sản phẩm và dịch vụ tốt hơn.
                    Lưu ý: Hình ảnh chỉ để hiển thị, vui lòng chọn đúng mẫu điện thoại di động trước khi mua hàng</p>
                </p>
                <div className="flex flex-col w-full my-16">
                  <a
                    href="https://shorten.asia/xtYa3exa"
                    className="w-full flex justify-center items-center py-4 text-white bg-[#fe7c22] hover:bg-[#fb700d] gap-2 rounded-xl
                     transition-all duration-500"
                  >
                    <MdProductionQuantityLimits color="white" size={18} />
                      Đặt hàng ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default HomeSingleFeatureProduct;
