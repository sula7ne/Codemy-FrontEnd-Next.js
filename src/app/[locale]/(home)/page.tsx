"use client"

import CourseCard from "@/components/Course/CourseCard/CourseCard";
import Image from "next/image";
import Link from "next/link";
import aiScreenImg from "@/assets/images/home/aiScreen.png";
import clsx from "clsx";
import codeEditorScreenImg from "@/assets/images/home/codeEditorScreen.png";
import cover1Img from "@/assets/images/home/cover1.png";
import { redirect } from "next/navigation";
import styles from "./Home.module.scss";
import theoryScreenImg from "@/assets/images/home/theoryScreen.png";
import { useAppSelector } from "@/state/hooks";
import { useState } from "react";
import { useTranslations } from "next-intl";
import webPageScreenImg from "@/assets/images/home/webPageScreen.png";

const Home = () => {
	// return redirect('/courses');
	const t = useTranslations('Home');
	const [feature, setFeature] = useState('theory');
	const courses = useAppSelector((state) => state.courses).slice(0, 3);

	const clickFeature = (key: string) => {
		setFeature(key);
	}

	// const featureKeys = ['theory', 'code-editor', 'web-page', 'ai'];

	const features = [
		{
			id: "theory",
			nav: t('Features.theory.nav'),
			title: t('Features.theory.title'),
			description: t('Features.theory.description'),
			imgs: [theoryScreenImg, theoryScreenImg]
		},
		{
			id: "code-editor",
			nav: t('Features.code-editor.nav'),
			title: t('Features.code-editor.title'),
			description: t('Features.code-editor.description'),
			imgs: [codeEditorScreenImg]
		},
		{
			id: "web-page",
			nav: t('Features.web-page.nav'),
			title: t('Features.web-page.title'),
			description: t('Features.web-page.description'),
			imgs: [webPageScreenImg, webPageScreenImg]
		},
		{
			id: "ai",
			nav: t('Features.ai.nav'),
			title: t('Features.ai.title'),
			description: t('Features.ai.description'),
			imgs: [aiScreenImg, aiScreenImg]
		},
	];

	const currentFeature = features.find(f => f.id === feature);

	return (
		<div className={styles.home}>
			<div className={styles.welcome}>
				<div className={styles.text}>
					<h2 className={styles.title}>{t('Welcome.title')}</h2>
					<p className={styles.description}>{t('Welcome.description')}</p>
					<Link className={styles.start} href={"/courses"}>
						<div className={styles.icon}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" x2="20" y1="19" y2="19"></line></svg>
						</div>
						{t('Welcome.button')}
					</Link>
				</div>

				<div className={styles['img-item']}>
					<Image src={cover1Img} alt="cover" />
				</div>
			</div>
			
			<div className={styles.expectations}>
				<div className={styles.text}>
					<h2 className={styles.title}>{t('Expectations.title')}</h2>
					<p className={styles.description}>{t('Expectations.description')}</p>
				</div>

				<div className={styles.cards}>
					<div className={styles.card}>
						<div className={styles.icon}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
						</div>
						<h4 className={styles.title}>{t('Expectations.cards.variety.title')}</h4>
						<p className={styles.description}>{t('Expectations.cards.variety.description')}</p>
					</div>
					<div className={styles.card}>
						<div className={styles.icon}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
						</div>
						<h4 className={styles.title}>{t('Expectations.cards.practice.title')}</h4>
						<p className={styles.description}>{t('Expectations.cards.variety.description')}</p>
					</div>
					<div className={styles.card}>
						<div className={styles.icon}>
							<svg viewBox="0 0 16 16" fill="currentColor" width="24" height="24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><mask id="SparkleIcon-mask-_r_59_" fill="white"><path clip-rule="evenodd" d="M11.773.762a.5.5 0 01.968 0c.22.841.462 1.358.823 1.74.364.385.896.685 1.803.99a.5.5 0 010 .947c-.906.305-1.44.605-1.803.99-.361.382-.603.898-.823 1.74a.5.5 0 01-.967 0c-.22-.842-.463-1.358-.824-1.74-.363-.385-.896-.685-1.803-.99a.5.5 0 010-.948c.907-.304 1.44-.604 1.803-.988.361-.383.603-.9.823-1.74V.762zM5.368 3.548a.5.5 0 01.967 0c.397 1.522.847 2.516 1.554 3.267.708.752 1.722 1.311 3.354 1.861a.5.5 0 010 .948c-1.632.55-2.646 1.109-3.354 1.861-.707.751-1.157 1.745-1.554 3.267a.5.5 0 01-.967 0c-.397-1.522-.847-2.516-1.553-3.267-.709-.752-1.723-1.312-3.355-1.861a.5.5 0 010-.948c1.632-.55 2.647-1.109 3.355-1.861.706-.751 1.156-1.745 1.553-3.267zm7.9 6.765a.5.5 0 00-.483.37c-.16.6-.332.948-.576 1.2-.246.256-.617.466-1.282.684a.5.5 0 000 .95c.665.218 1.036.428 1.282.684.244.253.416.6.576 1.2a.5.5 0 00.966 0c.16-.6.331-.947.575-1.2.247-.256.617-.466 1.282-.684a.5.5 0 000-.95c-.665-.218-1.035-.428-1.282-.684-.244-.252-.415-.6-.575-1.2a.5.5 0 00-.483-.37z"></path></mask><g mask="url(#SparkleIcon-mask-_r_59_)"><rect width="100%" height="100%" fill="currentColor"></rect></g></svg>
						</div>
						<h4 className={styles.title}>{t('Expectations.cards.ai.title')}</h4>
						<p className={styles.description}>{t('Expectations.cards.ai.description')}</p>
					</div>
				</div>
			</div>

			<div className={styles.quote}>
				<div className={styles.icon}>
					<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
						<path d="M11.375 17.5C10.9848 17.5 10.6103 17.5595 10.2375 17.6138C10.3583 17.2078 10.4825 16.7948 10.682 16.4238C10.8815 15.8848 11.193 15.4175 11.5028 14.9468C11.7618 14.4375 12.2185 14.0928 12.5545 13.657C12.9063 13.2335 13.3858 12.9518 13.7655 12.6C14.1383 12.2325 14.6265 12.0488 15.015 11.7898C15.421 11.557 15.7745 11.2998 16.1525 11.1773L17.0958 10.7888L17.9253 10.444L17.0765 7.05251L16.0318 7.3045C15.6975 7.3885 15.2898 7.4865 14.826 7.60375C14.3518 7.69125 13.846 7.93101 13.2825 8.14976C12.726 8.39826 12.082 8.56626 11.4835 8.96526C10.8815 9.34676 10.1868 9.66526 9.57426 10.1763C8.98101 10.703 8.26526 11.1598 7.73676 11.83C7.15926 12.4565 6.58876 13.1145 6.14601 13.8635C5.63326 14.5775 5.28501 15.3615 4.91751 16.1368C4.58501 16.912 4.31726 17.7048 4.09851 18.4748C3.68376 20.0183 3.49826 21.4848 3.42651 22.7395C3.36701 23.996 3.40201 25.0408 3.47551 25.7968C3.50176 26.1538 3.55076 26.5003 3.58576 26.74L3.62951 27.034L3.67501 27.0235C3.98627 28.4775 4.70279 29.8136 5.7417 30.8773C6.7806 31.9411 8.09943 32.6889 9.54563 33.0345C10.9918 33.38 12.5063 33.309 13.9138 32.8297C15.3214 32.3505 16.5645 31.4825 17.4993 30.3263C18.4342 29.17 19.0226 27.7727 19.1965 26.296C19.3704 24.8193 19.1227 23.3236 18.482 21.9818C17.8413 20.64 16.8339 19.507 15.5762 18.7139C14.3185 17.9208 12.8619 17.4999 11.375 17.5ZM30.625 17.5C30.2348 17.5 29.8603 17.5595 29.4875 17.6138C29.6083 17.2078 29.7325 16.7948 29.932 16.4238C30.1315 15.8848 30.443 15.4175 30.7528 14.9468C31.0118 14.4375 31.4685 14.0928 31.8045 13.657C32.1563 13.2335 32.6358 12.9518 33.0155 12.6C33.3883 12.2325 33.8765 12.0488 34.265 11.7898C34.671 11.557 35.0245 11.2998 35.4025 11.1773L36.3458 10.7888L37.1753 10.444L36.3265 7.05251L35.2818 7.3045C34.9475 7.3885 34.5398 7.4865 34.076 7.60375C33.6018 7.69125 33.096 7.93101 32.5325 8.14976C31.9778 8.40001 31.332 8.56626 30.7335 8.96701C30.1315 9.34851 29.4368 9.66701 28.8243 10.178C28.231 10.7048 27.5153 11.1615 26.9868 11.83C26.4093 12.4565 25.8388 13.1145 25.396 13.8635C24.8833 14.5775 24.535 15.3615 24.1675 16.1368C23.835 16.912 23.5673 17.7048 23.3485 18.4748C22.9338 20.0183 22.7483 21.4848 22.6765 22.7395C22.617 23.996 22.652 25.0408 22.7255 25.7968C22.7518 26.1538 22.8008 26.5003 22.8358 26.74L22.8795 27.034L22.925 27.0235C23.2363 28.4775 23.9528 29.8136 24.9917 30.8773C26.0306 31.9411 27.3494 32.6889 28.7956 33.0345C30.2418 33.38 31.7563 33.309 33.1638 32.8297C34.5714 32.3505 35.8145 31.4825 36.7493 30.3263C37.6842 29.17 38.2726 27.7727 38.4465 26.296C38.6204 24.8193 38.3727 23.3236 37.732 21.9818C37.0913 20.64 36.0839 19.507 34.8262 18.7139C33.5685 17.9208 32.1119 17.4999 30.625 17.5Z" fill="url(#paint0_linear_121_51)"/>
						<defs>
							<linearGradient id="paint0_linear_121_51" x1="20.9485" y1="7.05251" x2="20.9485" y2="33.25" gradientUnits="userSpaceOnUse">
							<stop stop-color="#3D3886"/>
							<stop offset="1" stop-color="#332B46"/>
							</linearGradient>
						</defs>
					</svg>
				</div>

				<h3 className={styles.title}>{t('Quote')}</h3>

				<div className={styles.icon}>
					<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
						<path d="M11.375 17.5C10.9848 17.5 10.6103 17.5595 10.2375 17.6138C10.3583 17.2078 10.4825 16.7948 10.682 16.4238C10.8815 15.8848 11.193 15.4175 11.5028 14.9468C11.7618 14.4375 12.2185 14.0928 12.5545 13.657C12.9063 13.2335 13.3858 12.9518 13.7655 12.6C14.1383 12.2325 14.6265 12.0488 15.015 11.7898C15.421 11.557 15.7745 11.2998 16.1525 11.1773L17.0958 10.7888L17.9253 10.444L17.0765 7.05251L16.0318 7.3045C15.6975 7.3885 15.2898 7.4865 14.826 7.60375C14.3518 7.69125 13.846 7.93101 13.2825 8.14976C12.726 8.39826 12.082 8.56626 11.4835 8.96526C10.8815 9.34676 10.1868 9.66526 9.57426 10.1763C8.98101 10.703 8.26526 11.1598 7.73676 11.83C7.15926 12.4565 6.58876 13.1145 6.14601 13.8635C5.63326 14.5775 5.28501 15.3615 4.91751 16.1368C4.58501 16.912 4.31726 17.7048 4.09851 18.4748C3.68376 20.0183 3.49826 21.4848 3.42651 22.7395C3.36701 23.996 3.40201 25.0408 3.47551 25.7968C3.50176 26.1538 3.55076 26.5003 3.58576 26.74L3.62951 27.034L3.67501 27.0235C3.98627 28.4775 4.70279 29.8136 5.7417 30.8773C6.7806 31.9411 8.09943 32.6889 9.54563 33.0345C10.9918 33.38 12.5063 33.309 13.9138 32.8297C15.3214 32.3505 16.5645 31.4825 17.4993 30.3263C18.4342 29.17 19.0226 27.7727 19.1965 26.296C19.3704 24.8193 19.1227 23.3236 18.482 21.9818C17.8413 20.64 16.8339 19.507 15.5762 18.7139C14.3185 17.9208 12.8619 17.4999 11.375 17.5ZM30.625 17.5C30.2348 17.5 29.8603 17.5595 29.4875 17.6138C29.6083 17.2078 29.7325 16.7948 29.932 16.4238C30.1315 15.8848 30.443 15.4175 30.7528 14.9468C31.0118 14.4375 31.4685 14.0928 31.8045 13.657C32.1563 13.2335 32.6358 12.9518 33.0155 12.6C33.3883 12.2325 33.8765 12.0488 34.265 11.7898C34.671 11.557 35.0245 11.2998 35.4025 11.1773L36.3458 10.7888L37.1753 10.444L36.3265 7.05251L35.2818 7.3045C34.9475 7.3885 34.5398 7.4865 34.076 7.60375C33.6018 7.69125 33.096 7.93101 32.5325 8.14976C31.9778 8.40001 31.332 8.56626 30.7335 8.96701C30.1315 9.34851 29.4368 9.66701 28.8243 10.178C28.231 10.7048 27.5153 11.1615 26.9868 11.83C26.4093 12.4565 25.8388 13.1145 25.396 13.8635C24.8833 14.5775 24.535 15.3615 24.1675 16.1368C23.835 16.912 23.5673 17.7048 23.3485 18.4748C22.9338 20.0183 22.7483 21.4848 22.6765 22.7395C22.617 23.996 22.652 25.0408 22.7255 25.7968C22.7518 26.1538 22.8008 26.5003 22.8358 26.74L22.8795 27.034L22.925 27.0235C23.2363 28.4775 23.9528 29.8136 24.9917 30.8773C26.0306 31.9411 27.3494 32.6889 28.7956 33.0345C30.2418 33.38 31.7563 33.309 33.1638 32.8297C34.5714 32.3505 35.8145 31.4825 36.7493 30.3263C37.6842 29.17 38.2726 27.7727 38.4465 26.296C38.6204 24.8193 38.3727 23.3236 37.732 21.9818C37.0913 20.64 36.0839 19.507 34.8262 18.7139C33.5685 17.9208 32.1119 17.4999 30.625 17.5Z" fill="url(#paint0_linear_121_51)"/>
						<defs>
							<linearGradient id="paint0_linear_121_51" x1="20.9485" y1="7.05251" x2="20.9485" y2="33.25" gradientUnits="userSpaceOnUse">
							<stop stop-color="#3D3886"/>
							<stop offset="1" stop-color="#332B46"/>
							</linearGradient>
						</defs>
					</svg>
				</div>
			</div>

			<div className={styles.features}>		
				{currentFeature && 
					<div key={currentFeature.id} className={clsx(styles.content, styles[currentFeature.id])}>
						<h4 className={styles.title}>{currentFeature.title}</h4>
						<p className={styles.description}>{currentFeature.description}</p>
						<div className={styles['img-container']}>
							{currentFeature.imgs.map((img, id) => (
								<div key={id} className={styles['img-item']}>
									<Image src={img} alt="screen"/>
								</div>
							))}
						</div>
					</div>
				}
				
				<div className={styles.actions}>
					{features.map((el) => (
						<button key={el.id} className={clsx(feature === el.id && styles.active)} onClick={() => clickFeature(el.id)}>
							{el.nav}
						</button>
					))}
				</div>
			</div>

			<div className={styles['popular-courses']}>
				<div className={styles.text}>
					<h2 className={styles.title}>{t('PopularCourses.title')}</h2>
					<p className={styles.description}>{t('PopularCourses.description')}</p>
				</div>

				<div className={styles.courses}>
					{courses.map((el) => (
						<CourseCard key={el.id} course={el} />
					))}
				</div>
			</div>

			<div className={styles['start-today']}>
				<div className={styles.text}>
					<h2 className={styles.title}>{t('StartToday.title')}</h2>
					<p className={styles.description}>{t('StartToday.description')}</p>
				</div>
				<Link className={styles.start} href={"/courses"}>
					<div className={styles.icon}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" x2="20" y1="19" y2="19"></line></svg>
					</div>
					{t('StartToday.button')}
				</Link>
			</div>
		</div>
	);
}

export default Home;