import { useState } from "react";
import { useEffect } from "react";
import { apiRequest } from "../../services/api";

const useGetSubscriptions = () => {
	const [subscriptionData, setSubscriptionData] = useState(null);
	const [subscriptionError, setSubscriptionError] = useState(null);
	const [subscriptionLoading, setSubscriptionLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const {data} = await apiRequest("/subscriptions");
				setSubscriptionData(data);
			} catch (error) {
				setSubscriptionError(error);
                console.log("Error while fetch all subscriptions : ",error)
			} finally {
				setSubscriptionLoading(false);
			}
		};
		fetchData();
	}, []);
	return { subscriptionData, subscriptionError, subscriptionLoading };
};

export default useGetSubscriptions;
