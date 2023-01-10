import Carousel from "react-material-ui-carousel";
import { Typography, Button } from "@mui/material";
import ShopIcon from "@mui/icons-material/Shop";

function Item(props: any) {
	const paperContainer = {
		height: 600,
		backgroundImage: `url(${props.item.image})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		width: `calc(100vw + 48px)`,
		padding: 24,
	};

	return (
		<>
			<div className='flex flex-col-reverse' style={paperContainer}>
				<div className='shrink'>
					<Typography variant='button' display='block' gutterBottom>
						<Button
							variant='contained'
							size='large'
							href={props.item.link}
							startIcon={<ShopIcon />}
						>
							<Typography variant='button' className='text-white'>
								Shop Keyboards
							</Typography>
						</Button>
					</Typography>
				</div>
				<div className='flex-shrink'>
					<Typography variant='h3' className='text-white'>
						{props.item.name}
					</Typography>
				</div>
			</div>
		</>
	);
}

export default function imageCarousel() {
	var items = [
		{
			name: "Custom Mechnical Keyboards!",
			image: "/board1.jpg",
			link: "/products",
		},
		{
			name: "Custom Mechnical Keyboards!",
			image: "/board2.jpeg",
			link: "/products",
		},
		{
			name: "Custom Mechnical Keyboards!",
			image: "/board3.jpg",
			link: "/products",
		},
	];

	return (
		<>
			<div className='w-full h-min'>
				<Carousel navButtonsAlwaysVisible={true}>
					{items.map((item, i) => (
						<Item key={i} item={item} />
					))}
				</Carousel>
			</div>
		</>
	);
}
