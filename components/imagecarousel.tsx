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
	};

	return (
		<>
			<div className='flex flex-col-reverse' style={paperContainer}>
				<div className='min-w-screen flex flex-col items-center'>
					<div className='flex mx-auto'>
						<Typography
							variant='h2'
							className='text-white capitalize font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'
						>
							{props.item.name}
						</Typography>
					</div>
					<div className='shrink'>
						<Typography
							variant='button'
							display='block'
							gutterBottom
							className='mx-auto justify-center'
						>
							<Button
								variant='contained'
								size='large'
								href={props.item.link}
								className='mb-2'
								startIcon={<ShopIcon />}
							>
								<Typography variant='button' className='text-white py-1` px-2'>
									{props.item.button}
								</Typography>
							</Button>
						</Typography>
					</div>
				</div>
			</div>
		</>
	);
}

export default function imageCarousel() {
	var items = [
		{
			name: "Welcome to my Website!",
			image: "/board1.jpg",
			link: "/products",
			button: "Products Page",
		},
		{
			name: "This is an e-commerce concept",
			image: "/board2.jpeg",
			link: "/products",
			button: "Products Page",
		},
		{
			name: "Hope you enjoy!",
			image: "/board3.jpg",
			link: "/products",
			button: "Products Page",
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
