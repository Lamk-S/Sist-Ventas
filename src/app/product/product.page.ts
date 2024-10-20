import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { ProductoModel } from '../models/producto.model';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarproductoPage } from '../agregarproducto/agregarproducto.page';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productos: ProductoModel[] | undefined;

  constructor(
    private service: ProductosService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController  // Añadimos el servicio de AlertController para las notificaciones
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  // Función para cargar los productos desde el servicio
  cargarProductos() {
    this.service.ObtenerTodos().subscribe((response) => {
      this.productos = response;
    });
  }

  // Función para abrir el modal y agregar un nuevo producto
  async Agregar() {
    const modal = await this.modalCtrl.create({
      component: AgregarproductoPage,
      componentProps: {}
    });

    await modal.present();

    // Esperamos hasta que el modal se cierre
    const { data, role } = await modal.onWillDismiss();
    if (role === 'creado') {
      // Si un nuevo producto fue creado, recargamos la lista de productos
      this.cargarProductos();
      this.mostrarAlerta('Producto creado', 'El producto ha sido agregado exitosamente.');
    }
  }

  // Función para editar un producto
  async Editar(producto: ProductoModel) {
    const modal = await this.modalCtrl.create({
      component: AgregarproductoPage,
      componentProps: {
        producto: producto,  // Pasamos el producto que se va a editar al modal
        edit: true
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'creado') {
      this.cargarProductos();
      this.mostrarAlerta('Producto actualizado', 'El producto ha sido actualizado correctamente.');
    }
  }

  // Función para confirmar y eliminar un producto
  async Eliminar(producto: ProductoModel) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar el producto: ${producto.descripcion}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.service.Eliminar(producto.idproducto!).subscribe(() => {
              this.cargarProductos();
              this.mostrarAlerta('Producto eliminado', 'El producto ha sido eliminado exitosamente.');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // Función para mostrar una alerta de confirmación
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}