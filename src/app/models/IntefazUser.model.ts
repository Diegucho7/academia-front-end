export interface UserIterfaz {
    ok:       boolean;
    usuarios: Array<UsuarioClass | number>;
}

export interface UsuarioClass {
    nombre:   string;
    apellido: string;
    email:    string;
    role:     string;
    cedula:   string;
    telefono: string;
    academia: string;
    google:   boolean;
    estado:   boolean;
    uid:      string;
}
