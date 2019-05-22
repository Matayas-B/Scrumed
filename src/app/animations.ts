import { trigger, state, style, transition, animate, animation } from '@angular/animations';

export const enlargeAnimation = animation([
  style({ fontSize: '{{initialpixels}}px' }),
  animate(1000)
  ], {
    params: {
      initialpixels: 150
    }
  });

  export const narrowAnimation = animation([
    style({ fontSize: '{{finalpixels}}px' }),
    animate(2000)
    ], {
      params: {
        finalpixels: 50
      }
    });
