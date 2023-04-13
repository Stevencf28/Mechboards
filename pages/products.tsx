import { Grid } from "@mui/material";

export default function products() {
	return (
		<>
			<div className='container mt-6'>
				<Grid gridRow={2} container spacing={2}>
					<Grid item xs={4}>
						<p>asd</p>
					</Grid>
					<Grid item xs={8}>
						<p>asd</p>
					</Grid>
				</Grid>
			</div>
		</>
	);
}
