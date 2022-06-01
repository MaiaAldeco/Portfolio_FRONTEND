import { Component, OnInit } from '@angular/core';
import { Projects } from '../models/projects';
import { ServiceScrollrevealService } from '../service-scrollreveal.service';
import { ProjectsServiceService } from '../service/projects-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { faPenToSquare, faTrash, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faUser = faUser;
  faSearch = faMagnifyingGlass;
  trabajos: Projects[];
  closeResult: string;
  editForm: FormGroup;
  deleteId: number;
  isLogged = false;
  isAdmin = false;

  constructor(private scrollreveal: ServiceScrollrevealService,
    private modalService: NgbModal,
    private projectService: ProjectsServiceService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder) { }

  config1reveal = this.scrollreveal.config1reveal

  ngOnInit(): void {
    this.projectLista();
    this.editForm = this.formBuilder.group({
      id: [''],
      titulo: [''],
      descripcion: [''],
      linkTrabajo: [''],
      imagen: ['']
    });
    //verifica que estemos loggeados
    this.isLogged = this.tokenService.isLogged();
    //obtiene el rol
    this.isAdmin = this.tokenService.isAdmin();
  }

  //lista
  projectLista(): void {
    this.projectService.lista().subscribe({
      next: (data) => this.trabajos = data, error: (e) => console.log(e)
    })
  };

  //new
  onSubmit(f: NgForm) {
    this.projectService.save(f.value).subscribe({
      next: (v) => {
        this.ngOnInit();
        this.toastr.success('Proyecto creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); 
      },
      complete: () => this.modalService.dismissAll(),
      error: (e) => this.toastr.error(e.error.mensaje, 'FAIL', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
    })
  }

  //detail
  openDetails(targetModal, proyect: Projects) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('nameProyect').setAttribute('value', proyect.titulo);
    document.getElementById('descProyect').setAttribute('value', proyect.descripcion);
    document.getElementById('linkTrabajo').setAttribute('value', proyect.linkTrabajo);
    document.getElementById('imagen').setAttribute('value', proyect.imagen);
  }

  //vista edit
  openEdit(targetModal, project: Projects) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: project.id,
      titulo: project.titulo,
      descripcion: project.descripcion,
      linkTrabajo: project.linkTrabajo,
      imagen:project.imagen
    });
  }

  //update
  onSave() {
    this.projectService.update(this.editForm.value.id, this.editForm.value).subscribe({
      next: (v) => {
        this.ngOnInit();
        this.toastr.success('Proyecto actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); 
      },
      complete: () => this.modalService.dismissAll(),
      error: (e) => this.toastr.error(e.error.mensaje, 'FAIL', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })

    })
  }
  //vista delete
  openDelete(targetModal, project: Projects) {
    this.deleteId = project.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  //delete
  onDelete() {
    this.projectService.delete(this.deleteId)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  //modal
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

