import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import ggpay from "../assets/google-pay.png";
import americanExpress from "../assets/american-express.png";
import masterCard from "../assets/master-card.png";
import meta from "../assets/meta.png";
import paypal from "../assets/paypal.png";

import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";

const pays = [
  ggpay,
  americanExpress,
  masterCard,
  meta,
  paypal,
];

const media = [
  { icon: <FaFacebook size={18} color="white" />, bgColor: "blue" },
  { icon: <FaTwitter size={18} color="white" />, bgColor: "#37b2ae"},
  { icon: <FaInstagram  size={18} color="white"/>, bgColor: "black"},
  { icon: <FaYoutube size={18} color="white" />, bgColor: "red"}
];

const Footer = () => {
  return (
    <footer className="bg-[#105b59] px-4 mt-20 pb-16">
      <div className="flex flex-col lg:mx-[4%] xl:mx-[10%] 2xl:mx-[16%]">
        <div className="flex flex-wrap flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h3 className="mb-6 text-white text-[28px] font-bold my-4 relative inline-block">
              Company
              <div className="absolute -bottom-2 left-0 bg-[#37b2ae] w-[50%] h-[1px]"></div>
            </h3>
            <p className="text-white">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book
            </p>
          </div>
          <div className="flex-1">
            <h3 className="mb-6 text-white text-[28px] font-bold my-4 relative inline-block">
              Resource
              <div className="absolute -bottom-2 left-0 bg-[#37b2ae] w-[50%] h-[1px]"></div>
            </h3>
            <ul>
              <li className="text-white py-[2px]">
              Terms and conditions
              </li>
              <li className="text-white py-[2px]">Privacy Policy</li>
              <li className="text-white py-[2px]">Contact us</li>
              <li className="text-white py-[2px]">Order tracking</li>
              <li className="text-white py-[2px]">Terms of Service</li>
              <li className="text-white py-[2px]">Refund Policy</li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="mb-6 text-white text-[28px] font-bold my-4 relative inline-block">
            News letter
              <div className="absolute -bottom-2 left-0 bg-[#37b2ae] w-[50%] h-[1px]"></div>
            </h3>
            <p className="text-white">
              Sign up to be the first to know about our exclusive offers and latest products.
            </p>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={Yup.object({
                email: Yup.string().email("E-mail không hợp lệ."),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  if (values.email) {
                    toast.success("Sent successfully!!");
                  }
                }, 200);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="flex justify-between flex-wrap w-[68%] md:w-full gap-4 my-3 bg-white rounded-full relative"
                >
                  <div className="flex-1">
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-4  rounded-tl-full rounded-bl-full flex-1 outline-none"
                      value={values.email}
                      placeholder="E-mail"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-4 px-8 rounded-full h-[56px] w-[110px] xl:w-[130px] translate-x-4 bg-[#fe7c22] text-white hover:bg-[#fb700d]"
                  >
                    Send
                  </button>
                </form>
              )}
            </Formik>
            <div className="flex gap-2">
              {media.map((item, index) => (
                <div key={index}>
                  <div className="p-3 rounded-full" style={{backgroundColor: item.bgColor }}>{item.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center ga-4 sm:gap-6 mt-6 w-full flex-col sm:flex-row">
          <h3 className="text-white text-[28px] font-bold my-4">
          Accept payment:{" "}
          </h3>
          <div className="flex-1 flex flex-wrap justify-center sm:justify-start gap-2">
            {pays.map((item, index) => (
              <div
                key={index}
                className="h-[28px] flex items-center justify-center bg-white p-1 w-[60px] rounded-md"
              >
                <img src={item} alt={item} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
