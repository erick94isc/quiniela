export class Jugador{
	id:number;
	nombre:string;
	apellido:string;
	fecha_nacimiento:string;
	posicion:string;
	numero:number;
	telefono:number;
	goles:number;
	tarjetas:[{
         amarillas:number,
         rojas:number
  }];

	constructor(){
		this.nombre='';
		this.apellido = '';
		this.fecha_nacimiento = '';
		this.posicion ='';
		this.goles =0;
		this.tarjetas['amarillas']= 0;
		
	}
}