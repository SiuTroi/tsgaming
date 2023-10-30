import { child, endAt, get, orderByChild, query, ref, startAt } from "firebase/database";
import { database } from "../firebase";
import { useState, useEffect } from "react";

export const useGetDataRange = (start, end) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const dbRef = ref(database);
            const productDataQuery = query(
                child(dbRef, "product_data"),
                orderByChild("productId"),
                startAt(start),
                endAt(end)
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
    }, [start, end]);

    return { data };
};
