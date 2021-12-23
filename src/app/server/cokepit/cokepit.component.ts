import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cokepit',
  templateUrl: './cokepit.component.html',
  styleUrls: ['./cokepit.component.css']
})
export class CokepitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{serverName:string, serverContent:string}>();
  @Output() blueprintCreated = new EventEmitter<{serverName:string, serverContent:string}>();

  // serverName = '';
  // serverContent = '';


  onClickAddServer(inputName:any, inputContent:any){
    console.log(inputName.value)
    this.serverCreated.emit({serverName:inputName.value, serverContent: inputContent.value})
  }

  onClickAddServerBlueprint(inputName:any,inputContent:any){
    this.blueprintCreated.emit({serverName:inputName.value, serverContent: inputContent.value})

  }

  constructor() { }

  ngOnInit(): void {
  }

}
