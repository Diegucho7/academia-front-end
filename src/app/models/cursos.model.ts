export interface Curso {
    ok:    boolean;
    curso: CursoElement[];
}

export interface CursoElement {
    _id:     string;
    usuario: string;
    curso:   PurpleCurso;
}

export interface PurpleCurso {
    _id:      string;
    anio:     string;
    mes:      string;
    usuario:  string;
    academia: Academia;
    curso:    Academia;
    profesor: string;
    modulos:  number;
    valor:    number;
    __v:      number;
}

export interface Academia {
    _id:    string;
    nombre: string;
}
