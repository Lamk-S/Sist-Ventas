import { CategoriaModel } from '../models/categoria.model';
export interface ProductoModel {
    idproducto?: number;
    idcategoria: number;
    descripcion: string;
    precio:number;
    cantidad:number;
    foto:any;
    categoria: CategoriaModel;
}