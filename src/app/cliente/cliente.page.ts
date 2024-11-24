import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../models/cliente.model';
import { ClientesService } from '../services/clientes.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarClientePage } from '../agregarcliente/agregarcliente.page';  // Asume que la página para agregar cliente está en esta ruta
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  clientes: ClienteModel[] = [];
  clientesFiltrados: ClienteModel[] = [];  // Para almacenar los clientes filtrados
  terminoBusqueda: string = '';  // Almacena el término de búsqueda

  constructor(
    private clientesService: ClientesService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastService: ToastService 
  ) {}

  ngOnInit() {
    this.cargarClientes();
  }

  // Cargar todos los clientes
  cargarClientes() {
    this.clientesService.obtenerTodos().subscribe(clientes => {
      this.clientes = clientes;
      this.clientesFiltrados = clientes;
    });
  }

  // Agregar un nuevo cliente
  async agregarCliente() {
    const modal = await this.modalCtrl.create({
      component: AgregarClientePage
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'created') {
      this.cargarClientes();
      this.toastService.mostrarToast('Cliente agregado exitosamente.');
    }
  }

  // Filtrar clientes según el término de búsqueda
  buscarCliente() {
    if (this.terminoBusqueda.trim() === '') {
      // Si el término está vacío, mostramos todos los clientes
      this.clientesFiltrados = this.clientes;
    } else {
      // Filtrar clientes por el nombre
      this.clientesFiltrados = this.clientes.filter(cliente =>
        cliente.nombres.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }
  }

  // Editar un cliente existente
  async editarCliente(cliente: ClienteModel) {
    const modal = await this.modalCtrl.create({
      component: AgregarClientePage,
      componentProps: { cliente }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'updated') {
      this.cargarClientes();
      this.toastService.mostrarToast('Cliente actualizado exitosamente.');
    }
  }

  // Eliminar un cliente
  async eliminarCliente(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.clientesService.eliminarCliente(id).subscribe(() => {
              this.cargarClientes();
              this.toastService.mostrarToast('Cliente eliminado exitosamente.');
            });
          }
        }
      ]
    });

    await alert.present();
  }
}