import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestSetService } from '../../services/test-set.service';
import { TestSet } from '../../models/testset.model';
import { TestSetValidator } from './validate/testset.validator';

@Component({
  selector: 'app-add-test-set',
  templateUrl: './add-test-set.component.html',
  styleUrls: ['./add-test-set.component.css']
})
export class AddTestSetComponent implements OnInit {

  addTestSetForm: FormGroup;
  submitted = false;
  testSet: TestSet = new TestSet();
  ratingProjectId = '';
  isTestSetAvailable = true;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @Output() onSuccess = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder, private testSetService:TestSetService) { }

  ngOnInit() {
    
    this.addTestSetForm = this.formBuilder.group({
      
      testSetName: ['', [Validators.required, TestSetValidator.testSetNameValidator]]
  });
  }

  formReset(ratingProjectId : string){
    this.submitted=false;
    this.addTestSetForm.controls['testSetName'].setValue('');
    this.ratingProjectId = ratingProjectId;
    this.isTestSetAvailable = true;
  }

  addTestSet(){
    this.submitted=true;
    console.log(this.addTestSetForm.get('testSetName').value);
    this.testSet.testSetName = this.addTestSetForm.get('testSetName').value;
    this.testSet.ratingProjectId = this.ratingProjectId;
    this.testSetService.isTestSetNameAvailable(this.testSet.testSetName,this.testSet.ratingProjectId)
    .subscribe( data => {
      if(data == true){
        this.testSetService.addTestSet(this.testSet)
        .subscribe( data => {
            console.log("TestSet Added successfully.");
            this.closeBtn.nativeElement.click();
            this.onSuccess.emit({testSetName:this.testSet.testSetName});
        },
        error => {
            console.error("Error occurred while adding testset.");
        });
      }else{
        console.log("Same TestSet Name already exist.");
        this.isTestSetAvailable = false;
        this.addTestSetForm.controls['testSetName'].setErrors({'incorrect': true})
      }
    },
    error => {
        console.error("Error occurred while checking testset name availability.");
    });


  }

  isTestSetNameAvailable(testSetName: string, ratingProjectId: string):any{
    return this.testSetService.isTestSetNameAvailable(testSetName,ratingProjectId)
    .subscribe( data => {
          return data;
    },
    error => {
        console.error("Error occurred while checking testset name availability.");
    });
  }
}
