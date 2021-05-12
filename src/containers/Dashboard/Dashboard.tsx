import React from 'react';
import CarouselInfo from '../CaruselInfo/CarouselInfo';
import LeftDrawerMenu from '../../components/LeftDrawerMenu';

const Dashboard = () => {
	return (
		<div>
			<CarouselInfo/>

			<p>This is a welcome page with some common information about app/site, with header, footer, main, side part, some photo, fact</p>
			<p>Maybe here will be the page number 2 - Pet Care  and 3 - Feeding</p>
			<p>Or feeding like notification in header</p>
			<p>Also here may be a calendar</p>
		</div>
	);
};

export default Dashboard;
