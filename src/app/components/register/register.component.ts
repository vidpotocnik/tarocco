/**
 * Internal
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/**
 * Models
 */
import { Team } from '../../../core/models/team';
import { NewTeam } from '../../../core/models/new-team';
import { Player } from '../../../core/models/player';
import { Step } from '../../../core/models/step';
/**
 * Services
 */
import { HttpService } from '../../../core/services/http.service';
import { TeamService } from '../../../core/services/team.service';
import { StepperService } from '../../../core/services/render/stepper.service';
import { ToastService } from '../../../core/services/render/toast.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public steps: Array<Step>;
  public currentStep: Step;
  public newTeam: NewTeam;
  public newMember: string;
  public registered: boolean;
  public registeredTeam: Team;

  constructor(
    public stepperService: StepperService,
    private httpService: HttpService,
    private teamService: TeamService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.steps = this.stepperService.getSteps();
    this.initFirstStep();
    this.newTeam = NewTeam.init({members: []});
  }

  public register() {
    this.teamService
      .create(this.newTeam)
      .subscribe(
        entity => this.loadTeam(entity),
        error => this.httpService.handleError(error)
      );
  }

  public addUser() {
    this.newTeam.members.push(Player.init({name: this.newMember}));
    this.newMember = '';
  }

  public removePlayer(player: Player) {
    this.newTeam.members = this.newTeam.members.filter(p => p.name !== player.name);
  }

  public initFirstStep(): void {
    if (this.steps.length === 0) {
      return;
    }
    this.currentStep = this.steps[0];
  }

  public nextStep(): void {
    let changed = false;
    this.steps.forEach((s, index) => {
      if (!changed && s.active && index <= this.steps.length - 2) {
        this.steps[index + 1].active = true;
        this.steps[index + 1].passed = true;
        s.active = false;
        this.currentStep = this.steps[index + 1];
        changed = true;
      }
    });
  }

  public lastStep(): void {
    this.steps.forEach((s, index) => {
      if (s.active && index >= 1) {
        this.steps[index - 1].active = true;
        this.currentStep = this.steps[index - 1];
        s.active = false;
        s.passed = false;
      }
    });
  }

  private loadTeam(team: Team) {
    this.registeredTeam = team;
    this.registered = true;
  }

}
