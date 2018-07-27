import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class ToastService {

    public addToast(title: string, msg: string, type: string, timeout = 5000): void {
        const toastOptions: ToastOptions = {
            title: title,
            msg: msg,
            showClose: true,
            timeout: timeout,
            theme: 'bootstrap'
        };
        if (type === 'success') {
            this.toastyService.success(toastOptions);
        }
        if (type === 'info') {
            this.toastyService.info(toastOptions);
        }
        if (type === 'warning') {
            this.toastyService.warning(toastOptions);
        }
        if (type === 'error') {
            this.toastyService.error(toastOptions);
        }
    }

    constructor(private toastyService: ToastyService,
        private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.showClose = true;
        this.toastyConfig.position = 'top-right';
    }
}
