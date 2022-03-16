import axios from "../../../services/config";
import { getUserID, getUserTimeline } from "../../../services/routes";

export default async function handler(req, res) {
	const {
		query: { username },
		method,
	} = req;

	switch (method) {
		case "GET":
			const userdata = await getuserId(username);
			const userTimeline = await getUserTimelineData(userdata.id);
			res.status(200).json(userTimeline);
			break;
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}

const getuserId = async (username) => {
	let { url, ...rest } = getUserID;
	url = url + username;
	const res = await axios({ url, ...rest })
  return res.data.data
	
};

const getUserTimelineData = async (id) => {
	let { url, ...rest } = getUserTimeline;
	url =
		url +
		`${id}/tweets?max_results=10&expansions=author_id,attachments.media_keys&tweet.fields=id,created_at,text,attachments,entities,public_metrics,possibly_sensitive,source,lang&user.fields=id,name,username,verified,profile_image_url&media.fields=media_key,preview_image_url,type,url,alt_text`;
		const res = await axios({ url, ...rest })
    return res.data;
};
