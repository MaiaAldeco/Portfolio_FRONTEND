import { Component, OnInit } from '@angular/core';
import { Skills } from '../models/skills';
import { ServiceScrollrevealService } from '../service-scrollreveal.service';
import { SkillsServiceService } from '../service/skills-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { faPenToSquare, faTrash, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faUser = faUser;
  faSearch = faMagnifyingGlass
  closeResult: string;
  skills: Skills[];
  editForm: FormGroup;
  deleteId: number;
  isAdmin = false;
  isLogged = false;


  barrs(numero: number) {
    return numero + "%";
  }

  constructor(private scrollreveal: ServiceScrollrevealService,
    private modalService: NgbModal,
    private skillService: SkillsServiceService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder) { }

  config1reveal = this.scrollreveal.config1reveal

  ngOnInit(): void {
    this.skillsLista();
    this.editForm = this.formBuilder.group({
      id: [''],
      habilidad: [''],
      porcentaje: ['']
    });
    //verifica que estemos loggeados
    this.isLogged = this.tokenService.isLogged()
    //obtiene el rol
    this.isAdmin = this.tokenService.isAdmin();
  }

  //lista
  skillsLista(): void {
    this.skillService.lista().subscribe({
      next: (data) => this.skills = data, error: (e) => console.log(e)
    })
  };

  //detalle
  openDetails(targetModal, skill: Skills) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('habi').setAttribute('value', skill.habilidad);
    document.getElementById('porce').setAttribute('value', skill.porcentaje.toString());
  }

  //new
  onSubmit(f: NgForm) {
    this.skillService.save(f.value).subscribe({
      next: (v) => {
        this.ngOnInit();
        this.toastr.success('Habilidad creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        }); 
      },
      complete: () => this.modalService.dismissAll(),
      error: (e) => this.toastr.error(e.error.mensaje, 'FAIL', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
    })
  }

  //vista edit
  openEdit(targetModal, skill: Skills) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: skill.id,
      habilidad: skill.habilidad,
      porcentaje: skill.porcentaje
    });
  }

  //update
  onSave() {
    this.skillService.update(this.editForm.value.id, this.editForm.value).subscribe({
      next: (v) => {
        this.ngOnInit();
        this.toastr.success('Habilidad actualizada', 'OK', {
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
  openDelete(targetModal, skill: Skills) {
    this.deleteId = skill.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  //delete
  onDelete() {
    this.skillService.delete(this.deleteId)
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
