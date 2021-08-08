export interface Componente{
    icon:string,
    name:string,
    redirectTo:string
  }

  export interface Usuario{

    idPropietario?:number,
    nombre?:string,
    apellido?:string,
    dni?:string,
    telefono?:string,
    email?:string,
    clave?:string

  }

  export interface Inmueble{
    id?:number,
    direccion?:string,
    ambientes?:number,
    superficie?:number,
    foto?:string
  }