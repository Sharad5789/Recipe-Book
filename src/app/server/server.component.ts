import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  // serverElements = [{type: 'server', name: 'test server', content: 'just a test'}];

  // onServerAdded(serverData:any){
  //   this.serverElements.push({type: 'server', 
  //   name: serverData.serverName,
  //   content: serverData.serverContent})
  // }

  // onBlueprintAdded(blueprintData:any){
  //   this.serverElements.push({type: 'blueprint', 
  //   name: blueprintData.serverName,
  //   content: blueprintData.serverContent})
  // }

  genders = ['Male', 'Female'];
  signUpForm:FormGroup;
  forbiddenUsernames = ['srd'];


  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, this.forbiddenUser.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      'gender': new FormControl('Male'),
    })
    
    this.signUpForm.setValue({
      'username': 'srd',
      'email': 'test@test',
      'gender': 'Male'
    });
    this.signUpForm.patchValue({
      'username': 'sharad'
    });
  }

  onSubmit(){
    console.log(this.signUpForm);
  }

  forbiddenUser(control: FormControl): {[s:string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'name is forbidden': true};
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if(control.value === 'test@test'){
            resolve({'emailIsForbidden': true})
          }
          else {resolve(null);}
        }, 1000);
      }
    );
    return promise;
  }

}
