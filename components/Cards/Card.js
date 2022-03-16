import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardSubtitle,
	CardText,
	CardTitle,
} from "reactstrap";
import useSWR from "swr";
import Image from "next/image";
import _ from "lodash";
import { BsChat, BsArrowRepeat, BsHeart } from "react-icons/bs";

const fetcher = (url) => fetch(url).then((res) => res.json());

const TweetCard = () => {
	const router = useRouter();
	const { userName } = router.query;
	const [userData, setUserData] = useState();
	const [tweetsData, setTweetsData] = useState();


	const { data, error } = useSWR( userName ? `/api/search/${userName}` : null, fetcher);

	useEffect(() => {
      let tweetsData = data?.data;
      tweetsData = _.map(tweetsData, (tweet) =>{
         tweet.likes = tweet.public_metrics.like_count
         return tweet
      })
      let sortedData = _.sortBy(tweetsData, ["likes"]).reverse()
      setTweetsData(sortedData)
		setUserData(data?.includes?.users[0]);
	}, [data]);

	if (error) return <div>failed to load</div>;
	if (!data && userName) return <div >loading...</div>;

	return (
		<div className='mt-3'>
			{data && userData && (
           _.map(tweetsData, (tweet)=>{
              return <Card key={tweet.id} className='mt-3' style={{ maxWidth: "500px" }}>
              	<CardHeader>
              		<div className='d-flex'>
              			<Image
              				src={userData?.profile_image_url}
              				alt={`Profile Picture of ${userData.name}`}
              				width={60}
              				height={30}
                          className="rounded-circle"
                          />
              			<div className='ms-3'>
              				<CardTitle tag='h5'>{userData.name}</CardTitle>
              				<CardSubtitle tag='h6' className='mb-2 text-muted'>
              					@{userData.username}
              				</CardSubtitle>
              			</div>
              		</div>
              	</CardHeader>
              	<CardBody>
              		<CardText>
              			{tweet.text}
              		</CardText>
              	</CardBody>
              	<CardFooter>
                    <div className="d-flex justify-content-evenly">
                       <p className="d-flex align-items-center mb-0"><BsChat className="me-1"/> {tweet.public_metrics.reply_count}</p>
                       <p className="d-flex align-items-center mb-0"><BsArrowRepeat className="me-1"/> {tweet.public_metrics.retweet_count}</p>
                       <p className="d-flex align-items-center mb-0"><BsHeart className="me-1"/> {tweet.public_metrics.like_count}</p>
                     </div>
                 </CardFooter>
              </Card>
           })
			)}
		</div>
	);
};

export default TweetCard;
