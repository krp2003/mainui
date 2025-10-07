import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  constructor(public authService: AuthService) {}
  
  @ViewChild('root', { static: true }) root!: ElementRef<HTMLElement>;
  @ViewChildren('reveal, .reveal') reveals!: QueryList<ElementRef<HTMLElement>>;

  // soft cursor glow on the grid
  parallax(e: MouseEvent) {
    const r = this.root.nativeElement.getBoundingClientRect();
    this.root.nativeElement.style.setProperty('--mx', `${e.clientX - r.left}px`);
    this.root.nativeElement.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  // subtle 3D tilt for tiles
  tilt(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const rx = (+py * -6).toFixed(2);
    const ry = (+px * 10).toFixed(2);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  }
  untilt(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    el.style.transform = `perspective(900px) rotateX(0) rotateY(0) translateY(0)`;
  }

  // ripple for buttons
  ripple(e: MouseEvent) {
    const btn = e.currentTarget as HTMLElement;
    const r = btn.getBoundingClientRect();
    btn.style.setProperty('--rx', `${e.clientX - r.left}px`);
    btn.style.setProperty('--ry', `${e.clientY - r.top}px`);
    btn.classList.remove('rippling'); void btn.offsetWidth; btn.classList.add('rippling');
  }

  // reveal-on-scroll for elements with .reveal
  ngAfterViewInit(): void {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          (en.target as HTMLElement).classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });

    // observe gallery & cards
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
}