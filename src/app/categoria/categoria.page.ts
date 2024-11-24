import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarCategoriaPage } from '../agregarcategoria/agregarcategoria.page';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  categorias: CategoriaModel[] = [];
  categoriasFiltradas: CategoriaModel[] = [];  // Para almacenar las categorías filtradas
  terminoBusqueda: string = '';  // Almacena el término de búsqueda

  constructor(
    private categoriaService: CategoriaService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  // Cargar todas las categorías
  cargarCategorias() {
    this.categoriaService.obtenerTodas().subscribe(categorias => {
      this.categorias = categorias;
      this.categoriasFiltradas = categorias;
    });
  }

  // Agregar una nueva categoría
  async agregarCategoria() {
    const modal = await this.modalCtrl.create({
      component: AgregarCategoriaPage
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'created') {
      this.cargarCategorias();
      this.toastService.mostrarToast('Categoría agregada exitosamente.');
    }
  }

  // Filtrar categorías según el término de búsqueda
  buscarCategoria() {
    if (this.terminoBusqueda.trim() === '') {
      // Si el término está vacío, mostramos todas las categorías
      this.categoriasFiltradas = this.categorias;
    } else {
      // Filtrar categorías por la descripción
      this.categoriasFiltradas = this.categorias.filter(categoria =>
        categoria.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }
  }

  // Editar una categoría existente
  async editarCategoria(categoria: CategoriaModel) {
    const modal = await this.modalCtrl.create({
      component: AgregarCategoriaPage,
      componentProps: { categoria }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'updated') {
      this.cargarCategorias();
      this.toastService.mostrarToast('Categoría actualizada exitosamente.');
    }
  }

  // Eliminar una categoría
  async eliminarCategoria(categoria: CategoriaModel) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar la categoria: ${categoria.descripcion}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.categoriaService.eliminarCategoria(categoria.idcategoria!).subscribe(() => {
              this.cargarCategorias();
              this.toastService.mostrarToast('Categoría eliminada exitosamente.');
            })
          }
        }
      ]
    });

    await alert.present();
  }
}