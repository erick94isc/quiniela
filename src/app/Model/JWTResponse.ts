export interface JWTResponse{
	dataUser:{
		id:number,
		name:string,
		email:string,
		accessToken:string,
		expiresIn:string
	}
}