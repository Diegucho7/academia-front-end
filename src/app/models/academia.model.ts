
interface _AcademiaUser{
    _id: string,
    nombre: string,
    img: string
}



export class Academia{
        constructor(
            public nombre: string,
            public _id: string,
            public img?: string,
            public usuario?: _AcademiaUser,

        ){}
        
}