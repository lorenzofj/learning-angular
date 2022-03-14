import { Respuesta } from "./Respuesta";

export class Pregunta{
    titulo: string;
    puntos: number;
    segundos: number;
    listaRespuestas: Respuesta[];

    constructor(titulo: string, puntos: number, segundos: number, listaRes: Respuesta[]){
        this.titulo = titulo;
        this.puntos = puntos;
        this.segundos = segundos;
        this.listaRespuestas = listaRes;
    }
}