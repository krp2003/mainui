
// import { Component, OnInit } from '@angular/core';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-view-events',
//   templateUrl: './view-events.component.html',
//   styleUrls: ['./view-events.component.scss']
// })
// export class ViewEventsComponent implements OnInit {

//   events: any[] = [];

//   statusResults: { [key: string]: string } = {};

//   errorMessage = '';

//   constructor(private httpService: HttpService, public authService: AuthService, private router: Router) {}

//   ngOnInit(): void {
//     if(localStorage.getItem('role') === 'professional') {
//       this.httpService.getEventByProfessional(localStorage.getItem('userId')).subscribe({
//         next: (res: any) => (this.events = res || []),
//         error: () => (this.errorMessage = 'Failed to load events')
//       });
//     } else {
//       this.httpService.GetAllevents().subscribe({
//         next: (res: any) => (this.events = res || []),
//         error: () => (this.errorMessage = 'Failed to load events')
//       });
//     }
//   }

//   checkStatus(eventId: any): void {
//     this.httpService.viewEventStatus(eventId).subscribe({
//       next: (res: any) => {
//         const status = res && res.status ? res.status : res;
//         this.statusResults[eventId] = status || 'Unknown';
//       },
//       error: () => {
//         this.statusResults[eventId] = 'Error fetching status';
//       }
//     });
//   }

//   viewDetails(eventId: any): void {
//     this.router.navigateByUrl(`/events/${eventId}`);
//   }

//   enroll(eventId: any): void {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       this.statusResults[eventId] = 'User not logged in';
//       return;
//     }
//     this.httpService.EnrollParticipant(eventId, userId).subscribe({
//       next: () => {
//         this.statusResults[eventId] = 'Enrolled successfully';
//       },
//       error: () => {
//         this.statusResults[eventId] = 'Enrollment failed';
//       }
//     });
//   }
// }





import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})
export class ViewEventsComponent implements OnInit {

  events: any[] = [];

  statusResults: { [key: string]: string } = {};

  errorMessage = '';

  constructor(
    private httpService: HttpService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('role') === 'professional') {
      this.httpService.getEventByProfessional(localStorage.getItem('userId')).subscribe({
        next: (res: any) => (this.events = res || []),
        error: () => (this.errorMessage = 'Failed to load events')
      });
    } else {
      this.httpService.GetAllevents().subscribe({
        next: (res: any) => (this.events = res || []),
        error: () => (this.errorMessage = 'Failed to load events')
      });
    }
  }

  checkStatus(eventId: any): void {
    this.httpService.viewEventStatus(eventId).subscribe({
      next: (res: any) => {
        const status = res && res.status ? res.status : res;
        this.statusResults[eventId] = status || 'Unknown';
      },
      error: () => {
        this.statusResults[eventId] = 'Error fetching status';
      }
    });
  }

  viewDetails(eventId: any): void {
    this.router.navigateByUrl(`/events/${eventId}`);
  }

  enroll(eventId: any): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.statusResults[eventId] = 'User not logged in';
      return;
    }
    this.httpService.EnrollParticipant(eventId, userId).subscribe({
      next: () => {
        this.statusResults[eventId] = 'Enrolled successfully';
      },
      error: () => {
        this.statusResults[eventId] = 'Enrollment failed';
      }
    });
  }

  // ✅ Added methods for top-right buttons
  updateEventStatus(id: number): void {
    console.log('Update event status clicked for ID:', id);
    // Add logic to open a status update dialog or call an API if needed
  }

  deleteEvent(id: number): void {
    console.log('Delete event clicked for ID:', id);
    // Add logic to delete the event from backend and update the local list if needed
    // Example:
    // this.httpService.deleteEvent(id).subscribe({
    //   next: () => this.events = this.events.filter(e => e.id !== id),
    //   error: () => console.error('Failed to delete event')
    // });
  }
}