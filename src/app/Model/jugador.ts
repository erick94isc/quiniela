export class Jugador{
	_id:number;
	nombre:string;
	apellido:string;
	fecha_nacimiento:string;
	posicion:string;
	numero:number;
	telefono:number;
	goles:number;
	tarjetas_amarillas:number;
    tarjetas_rojas:number;
  	equipo:string;
	
	constructor(){
		this.nombre='';
		this.apellido = '';
		this.fecha_nacimiento = '';
		this.posicion ='';
		this.goles =0;
		this.tarjetas_amarillas = 0;
		this.tarjetas_rojas =0;
	}
}