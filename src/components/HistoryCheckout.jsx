import { ref, child, get, set } from "firebase/database";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { database } from "../firebase";
import { arrayRemove, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { getFirestore } from "firebase/firestore";
import { formatCurrency } from "../utils/currencyFormart";

const HistoryCheckout = () => {
  const user = useSelector((state) => state.UserReducer);
  const [isLoading, setIsLoading] = useState(false)
  const [listProductCheckout, setListProductCheckout] = useState([]);

  const dbRef = ref(database);
  useEffect(() => {
    // check user were checkout or not?
    const getHisByUserid = async () => {
      setIsLoading(true)
      await get(child(dbRef, `users/${user.userid}/historycheckout`)).then(
        (snapshot) => {
          if (snapshot.exists()) {
            setListProductCheckout(snapshot.val());
            setIsLoading(false)
          }
        }
      );
      setIsLoading(false)
    } 
    getHisByUserid()
  }, []);

  const handleCancelHis = async (indexRemove) => {
    const db = getFirestore()
    await deleteDoc(doc(db, `users`, `/${user.userid}/historycheckout/${indexRemove}`));
  } 

    return (
    <div className="px-4 max-w-xl mx-auto">
      {isLoading && <div className='overlay z-9999'><div className='absolute-center loading'></div></div>}
      <div className="mt-8">
        <h1 className="text-center font-semibold text-[32px]">History Checkout</h1>
      </div>
      <div className="mt-12">
        {listProductCheckout.length > 0 ? listProductCheckout.map((item, index) => (
          <div key={index} className='flex gap-3 bg-white shadow-xl rounded-xl mb-3 p-4'>
            <div className="w-1/4">
              <img src={item.imageUrl} alt="" />
            </div>
            <div className="w-3/4 flex flex-col">
              <div className="">
                <div className="flex justify-between items-center">
                  <h2 className="font-medium text-lg">{item.productName}</h2>
                </div>
                <p className="text-[14px] font-light line-clamp-2">{item.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Quantity: {item.quantity}</p>
                <h3 className="font-semibold text-lg">{formatCurrency(item.price)}</h3>
              </div>
              <p className="text-[14px]">Day of payment: <span className="font-light text-[12px]">{item.infoPayer.timeOfPayment}</span></p>
            </div>
          </div>
        )) : (
          <div>
            You have no order any product.
          </div>
        )}
      </div>
    </div>
    );
};

export default HistoryCheckout;
