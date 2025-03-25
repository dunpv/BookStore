import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/components/auth/login/login.component';
import { RegisterComponent } from './app/components/auth/register/register.component';
import { AdminComponent } from './app/components/admin/admin/admin.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent }, // Thêm đường dẫn cho trang Admin
  { path: '', redirectTo: '/admin', pathMatch: 'full' }, // Chuyển hướng mặc định nếu cần
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // ✅ Kiểm tra có đúng không
];

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

bootstrapApplication(LoginComponent, {
  providers: [provideRouter(routes)],
});
