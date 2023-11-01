import { child, onValue, off, ref } from "firebase/database";
import { database } from "../firebase";
import { useState, useEffect } from "react";

export const useGetCountDatabase = () => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(database, "product_data");

      try {
        onValue(dbRef, (snapshot) => {
          const totalCount = snapshot.val();
          setItemCount(totalCount.length);
        });
      } catch (error) {
        console.error("Error retrieving product data:", error);
      }
    };

    fetchData();

    // Clean up the listener when the component unmounts
    return () => {
      const dbRef = ref(database, "product_data");
      off(dbRef);
    };
  }, []);

  return itemCount;
};
