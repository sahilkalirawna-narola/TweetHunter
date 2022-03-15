import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import TweetCard from "../components/Cards/Card";
import SearchBar from "../components/SearchBar";

import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Tweet Hunter</title>
				<meta name='description' content='Generated by create next app' />
			</Head>

			<main className={styles.main}>
				<SearchBar />
				<TweetCard />
			</main>
		</div>
	);
}
