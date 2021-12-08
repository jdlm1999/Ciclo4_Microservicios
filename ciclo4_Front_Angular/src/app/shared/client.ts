export class Client {
  _id!: string
  _v!: string
  cedula_cliente!: number;
  nombre_cliente!: string;
  correo_cliente!: string;
  telefono_cliente!: string;
  direccion_cliente!: string;
}

export class ClientPost {
  cedula_cliente!: number;
  nombre_cliente!: string;
  correo_cliente!: string;
  telefono_cliente!: string;
  direccion_cliente!: string;
}