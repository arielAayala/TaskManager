import Image from "next/image";
import author0 from "../../../public/author_0.png";
import author1 from "../../../public/author_2.png";
import author2 from "../../../public/author_1.png";
import author3 from "../../../public/author_3.png";
import styles from "./testimonials.module.css";

interface IClient {
	text: string;
	author_image: any;
	author: string;
	ranking: string;
	ranking_repeat: number;
	company: string;
}
const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
};
const clients: IClient[] = [
	{
		text: "Hay que destacar la buena atención de srita/sra Mónica ,excelente atención no es la primera vez que vengo. Tiene vocación ante todo. Gente así se necesita",
		author_image: author0,
		author: 'Veronica Villegas "Aradia"',
		ranking: "⭐",
		ranking_repeat: 5,
		company: "Google",
	},
	{
		text: "Entidad reguladora de la actividad docente",
		author_image: author1,
		author: 'Miguel Angel Gonzalez "Mick"',
		ranking: "⭐",
		ranking_repeat: 4,
		company: "Google",
	},
	{
		text: "Excelente Atencion",
		author_image: author2,
		author: "Adriana Calmus",
		ranking: "⭐",
		ranking_repeat: 5,
		company: "Google",
	},
	{
		text: "Muy buena atencion",
		author_image: author3,
		author: "Graciela Paloma Chamorro",
		ranking: "⭐",
		ranking_repeat: 4,
		company: "Google",
	},
];

const Testimonials = () => {
	return (
		<>
			<h2 className={styles.testimonial_title}> Clientes</h2>
			<div>
				{clients.map((client, index) => {
					return (
						<div
							key={index}
							className={styles.testimonial}
						>
							<h3> {client.text} </h3>
							<div className={styles.author}>
								<div>
									<Image
										src={client.author_image}
										width="50"
										height="50"
										alt="imageAuthor"
									></Image>
									<p>
										{client.ranking.repeat(client.ranking_repeat)}
										{client.author}, <br></br>
										{client.company}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};
export default Testimonials;
