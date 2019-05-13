import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';

@Component ({
    selector:     'rater-header'
    ,templateUrl: './raterheader.component.html'
})

export class RaterHeaderComponent implements OnInit {
    
    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    goToHome(form: any) {
		// Navigate to the address page
		this.router.navigate(['/']);
    }
}