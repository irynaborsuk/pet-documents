import React from 'react';
import { Button, Paper } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';

// for now, this items will be hardcoded
// in the future, if it will be necessary - may replace for dynamic cards which the admin of the site can update and delete
const items = [
	{
		name: "Cat info",
		description: "Some ifo about cat's food",
		color: "#64ACC8"
	},
	{
		name: "Cat 2 info",
		description: "Some information about cats treatments",
		color: "#7D85B1"
	},
	{
		name: "Dog info",
		description: "Some advertising for dog's food",
		color: "#CE7E78"
	}
]

{/* TODO: change the way how the props works */}
function HorizontalScroll(props: any) {
	return (
		<Paper
			style={{
				backgroundColor: props.item.color,
			}}
			elevation={10}
		>
			<h2>{props.item.name}</h2>
			<p>{props.item.description}</p>

			<Button className="CheckButton">
				Check it out!
			</Button>
		</Paper>
	)
}

const CarouselInfo = () => {
	const autoPlay = true;
	const indicators = true;

	return (
		<Carousel
			autoPlay={autoPlay}
			indicators={indicators}
			interval={12000}
		>
			{
				items.map((item, index) => {
					return <HorizontalScroll item={item} key={index} />
				})
			}
		</Carousel>
	);
};

export default CarouselInfo;
