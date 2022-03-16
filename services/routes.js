const baseURL = "https://api.twitter.com/2";

export const getUserID = {
	method: "GET",
	url: "/users/by/username/",
	baseURL,
};

export const getUserTimeline = {
	method: "GET",
	url: "/users/",
	baseURL,
};

