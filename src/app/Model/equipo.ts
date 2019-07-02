export class Equipo {
	_id:number;
	nombre:string;
	torneo:string;
	color:string;
	posicion:number;
	puntos:number;
	partidos_jugados:number;
	juegos_ganados:number;
	juegos_empatados:number;
	juegos_perdidos:number;
	goles_favor:number;
	goles_contra:number;
	diferencia_goles:number;

	constructor(){
		this.partidos_jugados = 0;
		this.juegos_ganados = 0;
		this.juegos_empatados = 0;
		this.juegos_perdidos = 0;
		this.goles_favor = 0;
		this.goles_contra = 0;
		this.diferencia_goles = 0;
		this.torneo ="";
	}
}
