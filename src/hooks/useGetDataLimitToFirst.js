import { child, get, limitToFirst, query, ref } from "firebase/database";
import { database } from "../firebase";
import { useState, useEffect } from "react";

export const useGetDataLimitToFirst = (number) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const dbRef = ref(database);
            const productDataQuery = query(
                child(dbRef, "product_data"),
                limitToFirst(number)
            );

            try {
                const snapshot = await get(productDataQuery);
                const retrievedData = [];
                snapshot.forEach((childSnapshot) => {
                    const s = childSnapshot.val();
                    // Xử lý dữ liệu ở đây
                    retrievedData.push(s);
                });
                setData(retrievedData);
            } catch (error) {
                console.error("Error retrieving product data:", error);
            }
        };

        fetchData();
    }, [number]);

    return { data };
};
