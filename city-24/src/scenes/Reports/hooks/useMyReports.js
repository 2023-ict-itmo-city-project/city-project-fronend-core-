import { useEffect, useState } from "react";
import { useUuid } from "../../../hooks";
import { mapReports } from "../../../utility/mapReport";

export const useMyReports = () => {
    const uuid = useUuid();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        // @ts-ignore
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v0/issues/my`;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "X-User-UUID": uuid,
                    },
                });
                const data = await response.json();

                const reports = mapReports(data);
                setReports(reports);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, [uuid]);

    return reports;
};
