import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TestSetListComponent } from "./test-set-list/test-set-list.component";
import { TestSetStructureComponent } from "./test-set-structure/test-set-structure.component";

const routes: Routes = [

    { path: 'user-administration/testSetList/:ratingProjectId', component: TestSetListComponent },
    { path: 'test-set/test-set-structure/:testSetId/:testSetName/:ratingProjectId', component: TestSetStructureComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class TestSetRoutingModule { }
