export class Partido {
	_id:number;
	equipo1:string;
	equipo2:string;
	fecha:Date;
	hora:string;
	torneo:number;

	constructor(){
		this.equipo1 ="";
		this.equipo2="";
	}
}