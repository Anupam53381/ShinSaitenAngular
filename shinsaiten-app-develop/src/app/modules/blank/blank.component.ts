import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';

@Component ({
    selector:     'no-answers-available'
    ,templateUrl: './blank.component.html'
})

export class NoAnswerComponent implements OnInit {
    
    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    goToHome(form: any) {
		// Navigate to the address page
		this.router.navigate(['/']);
    }
}