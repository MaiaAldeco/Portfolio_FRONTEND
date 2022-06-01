import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPenToSquare, faTrash, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Education } from '../models/education';
import { Experience } from '../models/experience';
import { ServiceScrollrevealService } from '../service-scrollreveal.service';
import { EducationServiceService } from '../service/education-service.service';
import { ExperienceServiceService } from '../service/experience-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faSearch = faMagnifyingGlass;
  faUser = faUser;
  closeResult: string;
  experiencias: Experience[];
  estudios: Education[];
  editFormStudy: FormGroup;
  editFormExp: FormGroup;
  deleteExpId: number;
  deleteStudyId: number;
  isAdmin = false;
  isLogged = false;

  constructor(private scrollreveal: ServiceScrollrevealService,
    private modalService: NgbModal,
    private expService: ExperienceServiceService,
    private estudioService: EducationServiceService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  config1reveal = this.scrollreveal.config1reveal

  ngOnInit(): void {
    this.expLista();
    this.estudioLista();
    this.editFormStudy = this.formBuilder.group({
      id: [''],
      lugar: [''],
      curso: [''],
      fechaInicio: [''],
      fechaFin: ['']
    });
    this.editFormExp = this.formBuilder.group({
      id: [''],
      nombre: [''],
      puesto: [''],
      descripcion: [''],
      fechaInicio: [''],
      fechaFin: ['']
    });
    //verifica que estemos loggeados
    this.isLogged = this.tokenService.isLogged();
    //obtiene el rol
    this.isAdmin = this.tokenService.isAdmin();
  }

  /*-------------------- EXPERIENCE ---------------------*/

  expLista(): void {
    this.expService.lista().subscribe({
      next: (data) => this.experiencias = data, error: (e) => console.log(e)
    })
  };

  openDetailsExp(targetModal, exp: Experience) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('nameExp').setAttribute('value', exp.nombre);
    document.getElementById('puestoExp').setAttribute('value', exp.puesto);
    if (exp.descripcion != null)
      document.getElementById('descExp').setAttribute('value', exp.descripcion);
    document.getElementById('fechaInicioExp').setAttribute('value', exp.fechaInicio.toString());
    if (exp.fechaFin != null)
      document.getElementById('fechaFinExp').setAttribute('value', exp.fechaFin.toString());
  }


  onSubmitExperiencia(f: NgForm) {
    this.expService.save(f.value).subscribe({
      next: (v) => {
        this.ngOnInit();
        this.toastr.success('Experiencia creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); 
      },
      complete: () => this.modalService.dismissAll(),
      error: (e) => this.toastr.error(e.error.mensaje, 'FAIL', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
    })
  }

  openEditExp(targetModal, exp: Experience) { //vista edit
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editFormExp.patchValue({
      id: exp.id,
      nombre: exp.nombre,
      puesto: exp.puesto,
      descripcion: exp.descripcion,
      fechaInicio: exp.fechaInicio,
      fechaFin: exp.fechaFin
    });
  }

  onSaveExperience() {
    this.expService.update(this.editFormExp.value.id, this.editFormExp.value).subscribe({
      next: (v) => {
        this.ngOnInit();
        this.toastr.success('Experiencia actualizada', 'OK', {
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
  openDeleteExp(targetModal, exp: Experience) {
    this.deleteExpId = exp.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  //delete
  onDeleteExp() {
    this.expService.delete(this.deleteExpId)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  /*-------------------- EDUCATION ---------------------*/

  estudioLista(): void { //lista
    this.estudioService.lista().subscribe({
      next: (data) => this.estudios = data, error: (e) => console.log(e)
    })
  };

  openDetailsEs(targetModal, estudio: Education) { //detalles
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('nameEs').setAttribute('value', estudio.lugar);
    document.getElementById('cursoEs').setAttribute('value', estudio.curso);
    document.getElementById('fechaIniEs').setAttribute('value', estudio.fechaInicio.toString());
    if (estudio.fechaFin != null)
      document.getElementById('fechaFinEs').setAttribute('value', estudio.fechaFin.toString());
  }

  openEditStudy(targetModal, education: Education) { //vista edit
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editFormStudy.patchValue({
      id: education.id,
      lugar: education.lugar,
      curso: education.curso,
      fechaInicio: education.fechaInicio,
      fechaFin: education.fechaFin,
    });
  }

  onSaveEstudio() {
    this.estudioService.update(this.editFormStudy.value.id, this.editFormStudy.value).subscribe({
      next: (v) => {
        this.ngOnInit()
        this.toastr.success('Estudio actualizada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); 
      },
      complete: () => this.modalService.dismissAll(),
      error: (e) => {
        this.toastr.error(e.error.mensaje, 'FAIL', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }), console.log(e.error.error.mensaje)
      }

    })
  }

  onSubmitEstudio(f: NgForm) {
    this.estudioService.save(f.value).subscribe({
      next: (v) => {
        this.ngOnInit();
        this.toastr.success('Estudio creado', 'OK', {
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
  openDeleteStudy(targetModal, study: Education) {
    this.deleteStudyId = study.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  //delete
  onDeleteStudy() {
    this.estudioService.delete(this.deleteStudyId)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }

  /* ------------- MODAL ------------*/
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
