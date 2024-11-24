import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductosService } from '../services/productos.service';
import { CategoriaService } from '../services/categoria.service';
import { ProductoModel } from '../models/producto.model';
import { CategoriaModel } from '../models/categoria.model';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregarproducto',
  templateUrl: './agregarproducto.page.html',
  styleUrls: ['./agregarproducto.page.scss'],
})
export class AgregarproductoPage implements OnInit {

  @Input() producto: ProductoModel | undefined;  // Para editar producto
  @Input() edit: boolean = false;  // Para saber si estamos en modo edición

  categorias: CategoriaModel[] = [];  // Lista de categorías cargadas
  registrarForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private serviceProducto: ProductosService,
    private serviceCategoria: CategoriaService,
    public formBuilder: FormBuilder
  ) {
    this.registrarForm = this.createFormGroup();
  }

  ngOnInit() {
    this.cargarCategorias();  // Cargar las categorías disponibles

    if (this.edit && this.producto) {
      // Si estamos en modo edición, cargamos los datos del producto al formulario
      this.registrarForm.patchValue({
        descripcion: this.producto.descripcion,
        idcategoria: this.producto.idcategoria,
        precio: this.producto.precio,
        cantidad: this.producto.cantidad,
      });
    }
  }

  createFormGroup() {
    return new FormGroup({
      descripcion: new FormControl('', [Validators.required]),
      idcategoria: new FormControl(null, [Validators.required]),
      precio: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required])
    });
  }

  // Cargar categorías desde el servicio
  cargarCategorias() {
    this.serviceCategoria.obtenerTodas().subscribe(
      (response) => {
        this.categorias = response;
      }
    );
  }

  // Cerrar el modal
  cerrarModal() {
    this.modalCtrl.dismiss(null, 'cerrado');
  }

  // Guardar o actualizar el producto
  onSubmit() {
    if (this.edit) {
      // Si estamos en modo edición, actualizar el producto
      const productoActualizado = this.registrarForm.value;
      this.serviceProducto.Actualizar(this.producto?.idproducto!, productoActualizado).subscribe(response => {
        this.modalCtrl.dismiss(response, 'creado');
      });
    } else {
      // Si es un nuevo producto, agregarlo
      const producto = this.registrarForm.value;
      this.serviceProducto.Agregar(producto).subscribe(response => {
        this.modalCtrl.dismiss(response, 'creado');
      });
    }
  }
}