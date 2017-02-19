import { Component, OnInit }                     from '@angular/core';
import { FormBuilder, FormGroup, Validators }    from '@angular/forms';
import { Router, ActivatedRoute }                from '@angular/router';

import { BasicValidators }                       from '../shared/basicValidators';
import { UserService }                           from './user.service';
import { User }                                  from './user';

@Component({
    templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
	form: FormGroup;
    title: string;
    user = new User();
	userDetailsLoading;

	constructor(
        fb: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _userService: UserService
    ) {
		this.form = fb.group({
			name: ['', Validators.required],
			email: ['', BasicValidators.email],
			phone: [],
			address: fb.group({
				street: [],
				suite: [],
				city: [],
				zipcode: []
			})
		});
	}
    
    ngOnInit(){
        var id = this._route.params.subscribe(params => {
            var id = +params["id"];

              this.title = id ? "Edit User" : "New User";
        
        if (!id)
			return;
        this.userDetailsLoading=true;    
        this._userService.getUser(id)
			.subscribe(
                user => {
					this.user = user;
					this.userDetailsLoading=false;
				},
                response => {
                    if (response.status == 404) {
                        this._router.navigate(['NotFound']);
                    }
                });
        });
    }
    
    save(){
        var result;
        
        if (this.user.id) 
            result = this._userService.updateUser(this.user);
        else
            result = this._userService.addUser(this.user)
            
		result.subscribe(x => {
            this.form.markAsPristine();
            this._router.navigate(['users']);
        });
	}
}